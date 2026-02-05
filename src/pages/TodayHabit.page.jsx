import { PageHeader } from '@/components/TodayHabits/PageHeader/PagetHeader';
import { TodayHabitList } from '@/components/TodayHabits/TodayHabitList/TodayHabitList';
import { getTodayHabits, toggleHabitCheck } from '@/services';
import { showWarningToast } from '@/utils/toast';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export const TodayHabitPage = () => {
  const { studyId } = useParams();

  const [studyTitle, setStudyTitle] = useState('');
  const [now, setNow] = useState(null);
  const [habits, setHabits] = useState([]);

  // 습관 체크 토글
  const handleToggleHabit = async (habitId, checked) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.habitId === habitId ? { ...habit, checked: !checked } : habit,
      ),
    );
    try {
      await toggleHabitCheck(studyId, habitId, !checked);
    } catch {
      showWarningToast('습관 체크에 실패했습니다.');
    }
  };

  const fetchHabits = async () => {
    const { habits } = await getTodayHabits(studyId);

    setHabits(habits);
  };

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
      <PageHeader title={studyTitle} studyId={studyId} now={now} />
      <TodayHabitList
        studyId={studyId}
        habits={habits}
        onToggle={handleToggleHabit}
        onSuccess={fetchHabits}
      />
    </div>
  );
};
