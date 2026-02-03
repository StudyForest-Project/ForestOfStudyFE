import { StudyCard } from '../StudyCard';
import { study } from '../../../seed/study';
import styles from './RecentPage.module.css';
import { useRecentStudies } from '../../../hooks/useRecentStudies';
import { Link } from 'react-router';

export const RecentPage = () => {
  const { recentStudies } = useRecentStudies();

  const hasRecent = recentStudies.length > 0;

  // localStorage의 studyId로 seed 데이터에서 실제 study 찾기
  const visibleStudies = recentStudies
    .slice(0, 3)
    .map((item) => {
      const studyData = study.items.find((s) => s.id === item.studyId);
      return studyData || null;
    })
    .filter(Boolean); // null 제거

  return (
    <section className={styles.container}>
      <h1>최근 조회한 스터디</h1>

      {!hasRecent && <p>아직 조회한 스터디가 없어요</p>}

      {hasRecent && visibleStudies.length > 0 && (
        <div className={styles.recentList}>
          {visibleStudies.map((item) => (
            <StudyCard
              key={item.id}
              studyId={item.id}
              title={item.title}
              nickname={item.nickname}
              description={item.description}
              backgroundImage={item.backgroundImage}
              totalPoint={item.totalPoint}
              emojis={item.emojis}
              createdAt={item.createdAt}
            />
          ))}
        </div>
      )}

      {/* 테스트용: seed 데이터의 studyId로 localStorage에 저장 */}
      <div className={styles.testSection}>
        <p>테스트용 버튼:</p>
        <button
          className={styles.testButton}
          onClick={() => {
            localStorage.setItem(
              'recentStudies',
              JSON.stringify([
                { studyId: '71HFE865V215DE1CTEWH0AVNH9' },
                { studyId: '2X7R5JQC42EJ5E6RHXQAQPDH4A' },
                { studyId: 'M3E2MSH4DMDZSX9G8FGVSQE8Z5' },
              ]),
            );
            window.location.reload();
          }}
        >
          테스트 데이터 추가
        </button>
      </div>
      <Link to="/study/1">상세페이지 예시로 이동</Link>
    </section>
  );
};
