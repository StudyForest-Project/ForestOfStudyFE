import { getStudyDetail } from '../../../seed/studyDetail';
import { EmptyState } from '../EmptyState';
import { HabitTable } from '../HabitTable/HabitTable';
import { SectionCard } from '../SectionCard'

export const HabitSection = ({ studyId }) => {
  const detail = getStudyDetail(studyId);
  const habitWeek = detail?.habitWeek;

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
