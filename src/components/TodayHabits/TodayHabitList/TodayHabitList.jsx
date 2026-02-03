import { SectionCard } from '@/components/Habit/SectionCard';

export const TodayHabitList = () => {
  return (
    <div>
      <SectionCard title={'오늘의 습관'}>
        <button type="button">목록 수정</button>
      </SectionCard>
    </div>
  );
};
