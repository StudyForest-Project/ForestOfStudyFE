import { useOutletContext } from 'react-router';
import { useFetchData } from '@/hooks/useFetchData';
import { getFocusStats } from '@/services/focusService';
import FocusDonutChart from './sections/FocusDonutChart';
import FocusComboChart from './sections/FocusComboChart';
import { formatActiveTime } from '@/utils/timerUtils';
import styles from './FocusStats.module.css';

export default function FocusStats() {
  const { studyId } = useOutletContext();
  const { data, isLoading, error } = useFetchData(getFocusStats, studyId);

  if (isLoading) {
    return <div>정보를 불러오는 중입니다...</div>;
  }
  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }
  if (!data) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  const { summary, today, weekly } = data;

  return (
    <div className={styles.statsContainer}>
      <h3 className={styles.title}>집중 기록</h3>

      <div className={styles.summary}>
        <p className={styles.summaryContent}>
          ⏳️ 오늘의 최장 집중 시간:{' '}
          <strong>{formatActiveTime(today.maxActiveTime)}</strong>
        </p>
        <p className={styles.summaryContent}>
          🎓 지금까지 총 집중 시간:{' '}
          <strong>{formatActiveTime(summary.sessionTotalActiveTime)}</strong>
        </p>
        <p className={styles.summaryContent}>
          🚀 목표 달성 횟수:{' '}
          <strong>
            {summary.targetReachedCount} / {summary.sessionCount}회
          </strong>
        </p>
        <p className={styles.summaryContent}>
          🏅 집중 성공 횟수: {summary.perfectFocusCount} /{' '}
          <strong>{summary.sessionCount}회</strong>
        </p>
      </div>

      <div className={styles.rateDisplay}>
        <div className={styles.donutChart}>
          <span className={styles.donutTitle}>목표 달성률</span>
          <FocusDonutChart
            total={summary.sessionCount}
            value={summary.targetReachedCount}
          />
        </div>
        <div className={styles.donutChart}>
          <span className={styles.donutTitle}>집중 성공률</span>
          <FocusDonutChart
            total={summary.sessionCount}
            value={summary.perfectFocusCount}
          />
        </div>
      </div>

      <div className={styles.focusChart}>
        <span className={styles.chartTitle}>이번 주 기록</span>
        <FocusComboChart data={weekly.weeklyFocusChart} />
      </div>
    </div>
  );
}
