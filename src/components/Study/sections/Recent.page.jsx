import styles from './StudyPage.module.css';
import { useRecentStudies } from '../../../hooks/useRecentStudies';
import { Link } from 'react-router';


export const RecentPage = () => {
  const { recentStudies } = useRecentStudies();

  const hasRecent = recentStudies.length > 0;
  const visibleStudies = recentStudies.slice(0, 3); // 화면에는 최대 3개만

  return (
    <section className={styles.container}>
      <h1>최근 조회한 스터디</h1>

      {!hasRecent && <p>아직 조회한 스터디가 없어요</p>}

      {hasRecent && (
        <div className={styles.recentList}>
          {visibleStudies.map((item) => (
            <StudyCard
              key={item.studyId}
              studyId={item.studyId}
              // 필요하면 viewedAt도 넘겨서 "언제 봤는지" 표시 가능하게 해놓음
              viewedAt={item.viewedAt}
            />
          ))}
        </div>
      )}

      {/* 테스트용 링크 */}
      <Link to="/study/1">상세페이지 예시로 이동</Link>
    </section>
  );
};

// 컴포넌트 규칙 지키기
// 만들때 폴더 생성 해서 만들기
// set 은 온클릭까지
// get으로 카드 컴포넌트를 어떻게 쓸건지 파악하는 행위 => 로컬스토리지 겟으로 꺼내오는것
// 카드는 규량님 카드를
