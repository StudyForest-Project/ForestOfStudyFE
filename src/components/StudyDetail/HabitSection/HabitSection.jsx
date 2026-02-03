import { SectionCard } from '../../Habit/SectionCard';
import { EmptyState } from '../../Habit/EmptyState';
import { HabitTable } from '../../Habit/HabitTable/HabitTable';

export const HabitSection = ({ habitWeek }) => {
  return (
    <SectionCard title="습관 기록표">
      {!habitWeek || habitWeek.rows.length === 0 ? (
        <EmptyState />
      ) : (
        <HabitTable habitWeek={habitWeek} />
      )}
    </SectionCard>
  );
};
