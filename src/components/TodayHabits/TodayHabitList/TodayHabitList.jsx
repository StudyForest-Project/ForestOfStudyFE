import { useState } from 'react';
import { HabitEditModal } from '../HabitEditModal';
import styles from './TodayHabitList.module.css';
import clsx from 'clsx';

export const TodayHabitList = ({ studyId, habits, onToggle }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  /* 습관 수정 모달 열기 */
  const handleOpenEditModal = () => {
    setIsEditOpen(true);
  };

  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionTop}>
        <h2 className={styles.title}>오늘의 습관</h2>
        <button
          type="button"
          className={styles.button}
          onClick={handleOpenEditModal}
        >
          목록 수정
        </button>

        {isEditOpen && (
          <HabitEditModal
            studyId={studyId}
            initialHabits={habits}
            onClose={() => setIsEditOpen(false)}
          />
        )}
      </div>

      <section>
        <ul>
          {habits.map((habit) => (
            <li key={habit.habitId}>
              <button
                className={clsx(
                  styles.habitItem,
                  habit.checked && styles.checkedHabitItem,
                )}
                onClick={() => onToggle(habit.habitId, habit.checked)}
              >
                {habit.title}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
