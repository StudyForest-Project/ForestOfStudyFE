import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getStudyDetail } from '@/services/studyService';
import { HabitSection } from '../../components/StudyDetail/HabitSection';
import { EmojiSection } from '../../components/StudyDetail/EmojiSection';
import { StudyOverviewSection } from '../../components/StudyDetail/StudyOverviewSection';
import { ActionMenu } from '@/components/StudyDetail/ActionMenu/ActionMenu';
import styles from './study.page.module.css';

export const StudyPage = () => {
  const { studyId } = useParams();

  const [study, setStudy] = useState(null);
  const [emojis, setEmojis] = useState([]);
  const [habitWeek, setHabitWeek] = useState(null);

  /* 스터디 상세 조회 */
  useEffect(() => {
    if (!studyId) return;

    const fetchStudy = async () => {
      const { study, emojis, habitWeek } = await getStudyDetail(studyId);

      setStudy(study);
      setEmojis(emojis || []);
      setHabitWeek(habitWeek || null);
    };

    fetchStudy();
  }, [studyId]);

  return (
    <div>
      <div className={styles.topBar}>
        <EmojiSection studyId={studyId} initialEmojis={emojis} />
        <ActionMenu studyId={studyId} study={study} />
      </div>

      <StudyOverviewSection study={study} />
      <HabitSection habitWeek={habitWeek} />
    </div>
  );
};
