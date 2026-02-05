import { useOutletContext } from 'react-router';
import { useFetchData } from '@/hooks/useFetchData';
import { getPointStats } from '@/services/focusService';
import PointBarChart from './sections/PointBarChart';
import styles from './PointStats.module.css';

export default function PointStats() {
  const { studyId } = useOutletContext();
  const { data, isLoading, error } = useFetchData(getPointStats, studyId);

  if (isLoading) {
    return <div>정보를 불러오는 중입니다...</div>;
  }
  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }
  if (!data) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className={styles.statsContainer}>
      <h3 className={styles.title}>포인트 기록</h3>

      <div className={styles.summary}>
        <p className={styles.summaryContent}>
          🪙 오늘 획득한 포인트: <strong>{data.todayPoint} Points</strong>
        </p>
        <p className={styles.summaryContent}>
          💰 이번 주 획득 포인트:{' '}
          <strong>{data.weeklyTotalPoint} Points</strong>
        </p>
      </div>

      <div className={styles.pointChart}>
        <PointBarChart data={data.weeklyPointChart} />
      </div>
    </div>
  );
}
