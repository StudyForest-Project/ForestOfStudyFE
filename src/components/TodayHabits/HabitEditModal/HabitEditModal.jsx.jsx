import { useState } from 'react';
import deleteButton from '@/assets/icons/ic_delete.svg';
import plusButton from '@/assets/icons/ic_plus.svg';

export const HabitEditModal = ({ initialHabits = [], onClose }) => {
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
        inNew: true,
      },
    ]);
  };

  /* 습관 수정 */
  const handleUpdateHabit = (tempId, value) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.tempId === tempId ? { ...habit, title: value } : habit,
      ),
    );
  };

  /* 습관 삭제 */
  const handleDeleteHaibt = (tempId) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.tempId === tempId ? { ...habit, isDeleted: true } : habit,
      ),
    );
  };

  return (
    <div>
      <h1>습관 목록</h1>

      <ul>
        {habits
          .filter((habit) => !habit.isDeleted)
          .map((habit) => (
            <li key={habit.tempId}>
              <input
                type="text"
                value={habit.title}
                onChange={(e) =>
                  handleUpdateHabit(habit.tempId, e.target.value)
                }
              />
              <button onClick={() => handleDeleteHaibt()}>
                <img src={deleteButton} alt="습관 삭제하기" />
              </button>
            </li>
          ))}
      </ul>

      <button onClick={() => handleAddHabit()}>
        <img src={plusButton} alt="습관 추가하기" />
      </button>

      <button onClick={onClose}>취소</button>

      <button onClick={onClose}>수정 완료</button>
    </div>
  );
};
