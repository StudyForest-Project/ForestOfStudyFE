import { useParams } from 'react-router';
import { getStudyDetail } from '../seed/studyDetail';
import { HabitSection } from '../components/Habit/HabitSection';

export const StudyPage = () => {
  const { id } = useParams();
  const detail = getStudyDetail(id);

  if (!detail) return <div>해당 스터디가 없습니다.</div>;

  return (
    <>
      <HabitSection studyId={id} />
    </>
  );
};
