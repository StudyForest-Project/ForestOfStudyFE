import { getRecentList } from '@/services/studyListService';
import { RECENT_KEY, StudyCard } from '../StudyCard';
import styles from './StudyPage.module.css';
import { useEffect, useState } from 'react';

export const RecentPage = () => {
  const [recent, setRecent] = useState([]);
  useEffect(() => {
    const fetchRecent = async () => {
      const stored = JSON.parse(
        localStorage.getItem(RECENT_KEY) || '{"ids": []}',
      );
      if (stored.ids && stored.ids.length > 0) {
        const res = await getRecentList(stored);
        setRecent(res.studies);

        // 서버에서 받은 실제 존재하는 스터디 ID로 로컬스토리지 동기화
        const validIds = res.studies.map((study) => study.id);
        localStorage.setItem(RECENT_KEY, JSON.stringify({ ids: validIds }));
      }
    };
    fetchRecent();
  }, []);

  console.log(recent, 'zzzzz');

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>최근 조회한 스터디</h1>

      {recent.length === 0 && (
        <p className={styles.empty}>아직 조회한 스터디가 없어요</p>
      )}

      {recent.length > 0 && (
        <div className={styles.recentList}>
          {recent.map((item) => (
            <StudyCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};
