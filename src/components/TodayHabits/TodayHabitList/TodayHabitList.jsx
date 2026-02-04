import { useState } from 'react';
import { HabitEditModal } from '../HabitEditModal';
import styles from './TodayHabitList.module.css';

export const TodayHabitList = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [habits, setHabits] = useState([]);

  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionTop}>
        <h2 className={styles.title}>오늘의 습관</h2>
        <button
          type="button"
          className={styles.button}
          onClick={() => setIsEditOpen(true)}
        >
          목록 수정
        </button>

        {isEditOpen && (
          <HabitEditModal
            initialHabits={habits}
            onClose={() => setIsEditOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
