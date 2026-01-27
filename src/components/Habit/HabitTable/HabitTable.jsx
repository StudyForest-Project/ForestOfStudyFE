import {
  pawVariants,
  pawDisabled,
} from '../../../assets/icons/habitCheckIcons';
import styles from './HabitTable.module.css';

export const HabitTable = ({ habitWeek }) => {
  const { columns, rows } = habitWeek;

  return (
    <>
      <div className={styles.row}>
        {columns.map((day, index) => (
          <span
            key={day}
            className={styles.day}
            style={{ gridColumn: index + 2 }}
          >
            {day}
          </span>
        ))}
      </div>

      {rows.map((row, rowIndex) => {
        const coloredIcon = pawVariants[rowIndex % pawVariants.length];

        return (
          <div key={row.habitId} className={styles.row}>
            <p className={styles.habitTitle}>{row.title}</p>

            {row.checks.map((checked, checkIndex) => {
              const iconSrc = checked ? coloredIcon : pawDisabled;

              return (
                <div key={checkIndex}>
                  <img
                    src={iconSrc}
                    alt={checked ? '완료' : '미완료'}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};
