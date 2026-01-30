import { useParams } from 'react-router';
// import { HabitSection } from '../components/Habit/HabitSection/HabitSection';

export const StudyPage = () => {
  const { id } = useParams();

  if (!id) return <div>잘못된 접근입니다.</div>;

 // return <HabitSection studyId={id} />;
};
