import { useState } from 'react';
import { createHabit, deleteHabit, updateHabit } from '@/services';
import { PrimaryButton } from '@/components/PrimaryButton';
import { showSuccessToast, showWarningToast } from '@/utils/toast';
import deleteIcon from '@/assets/icons/ic_delete.svg';
import plusIcon from '@/assets/icons/ic_plus_black.svg';
import styles from './HabitEditModal.module.css';

export const HabitEditModal = ({
  studyId,
  initialHabits = [],
  onClose,
  onSuccess,
}) => {
  const [habits, setHabits] = useState(
    initialHabits.map((habit) => ({
      ...habit,
      tempId: crypto.randomUUID(), // UI용
      isDeleted: false,
      isNew: false,
    })),
  );

  /* 습관 생성 */
  const handleAddHabit = () => {
    setHabits((prev) => [
      ...prev,
      {
        tempId: crypto.randomUUID(),
        habitId: null,
        title: '',
        isDeleted: false,
        isNew: true,
      },
    ]);
  };

  /* 습관 수정 */
  const handleUpdateHabit = (tempId, value) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.tempId === tempId
          ? { ...habit, title: value, isUpdated: !habit.isNew }
          : habit,
      ),
    );
  };

  /* 습관 삭제 */
  const handleDeleteHabit = (tempId) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.tempId === tempId ? { ...habit, isDeleted: true } : habit,
      ),
    );
  };

  /* 수정 완료 버튼 클릭 핸들러 (API 연동) */
  const handleSubmit = async () => {
    try {
      // 생성
      const createPromises = habits
        .filter((habit) => habit.isNew && !habit.isDeleted)
        .map((habit) => createHabit(studyId, habit.title));

      // 수정
      const updatePromises = habits
        .filter((habit) => !habit.isNew && habit.isUpdated)
        .map((habit) => updateHabit(studyId, habit.habitId, habit.title));

      // 삭제
      const deletePromises = habits
        .filter((habit) => habit.isDeleted && !habit.isNew)
        .map((habit) => deleteHabit(studyId, habit.habitId));

      await Promise.all([
        ...createPromises,
        ...updatePromises,
        ...deletePromises,
      ]);

      showSuccessToast('습관이 수정되었습니다.');
      onSuccess();
      onClose();
    } catch {
      showWarningToast('습관 수정에 실패했습니다.');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h1 className={styles.title}>습관 목록</h1>

        <ul className={styles.list}>
          {habits
            .filter((habit) => !habit.isDeleted)
            .map((habit) => (
              <li key={habit.tempId} className={styles.listItem}>
                <input
                  type="text"
                  className={styles.habitInput}
                  value={habit.title}
                  onChange={(e) =>
                    handleUpdateHabit(habit.tempId, e.target.value)
                  }
                />

                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteHabit(habit.tempId)}
                >
                  <img src={deleteIcon} alt="습관 삭제하기" />
                </button>
              </li>
            ))}
        </ul>

        <button className={styles.addButton} onClick={() => handleAddHabit()}>
          <img src={plusIcon} alt="습관 추가하기" />
        </button>

        <div className={styles.button}>
          <PrimaryButton className={styles.cancelButton} onClick={onClose}>
            취소
          </PrimaryButton>
          <PrimaryButton className={styles.submitButton} onClick={handleSubmit}>
            수정 완료
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
