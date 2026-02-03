import { PageHeader } from '@/components/TodayHabits/PageHeader/PagetHeader';
import { TodayHabitList } from '@/components/TodayHabits/TodayHabitList/TodayHabitList';
import { getTodayHabits } from '@/services';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export const TodayHabitPage = () => {
  const { studyId } = useParams();

  const [studyTitle, setStudyTitle] = useState('');
  const [now, setNow] = useState(null);
  const [habits, setHabits] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { studyTitle, now, habits } = await getTodayHabits(studyId);
      setStudyTitle(studyTitle);
      setNow(now);
      setHabits(habits);
    };
    fetchData();
  }, [studyId]);

  return (
    <div>
      <PageHeader title={studyTitle} now={now} />
      <TodayHabitList />
    </div>
  );
};
