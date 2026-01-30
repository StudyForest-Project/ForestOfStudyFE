import { Link } from 'react-router-dom';
import styles from '@StudyPage.module.css'; //! alias로 변경
import { useRecentStudies } from '@hooks/useRecentStudies'; //! alias로 변경
import { StudyCard } from './StudyCard'; //! 추가
// import { recentStudySeedData } from '../seed/seedStudyData'; // 향후 수정하여 반영
// import  sections from './Recent.page..module.css'; //향후 수정하여 반영

export const RecentPage = () => {
  const { recentStudies, setRecentStudiesData } = useRecentStudies();

  const hasRecent = recentStudies.length > 0;
  const visibleStudies = recentStudies.slice(0, 3); // 화면에는 최대 3개만

  const handleSetSeedData = () => {
    setRecentStudiesData(recentStudySeedData);
    alert('시드 데이터가 저장되었습니다.'); // 경고알림 텍스트 뜸
  };

  const handleClearData = () => {
    setRecentStudiesData([]);
    alert('최근 조회 데이터가 초기화되었습니다.'); // 경고알림 텍스트 뜸
  };

  const handleShowLocalStorage = () => {
    const stored = localStorage.getItem('recentStudies');
    console.log('[recentStudies raw]', stored);
    console.log('[recentStudies parsed]', JSON.parse(stored || '[]'));
  };

  return (
    <section className={styles.container}>
      <h1>최근 조회한 스터디</h1>

      {!hasRecent && <p>아직 조회한 스터디가 없습니다.</p>}
      {hasRecent && (
        <div className={styles.recentList}>
          {visibleStudies.map((item) => (
            <StudyCard
              key={item.studyId}
              studyId={item.studyId}
              // 언제 조회했는지 확인하는 옵션 ==> viewedAt
              viewedAt={item.viewedAt}
            />
          ))}
        </div>
      )}

      {/* 온클릭 부분 */}
      {/* {process.env.NODE_ENV === 'development' && (
        <div className={styles.devButtonGroup}>
          <button onClick={handleSetSeedData}>시드 데이터 SET</button>
          <button onClick={handleClearData}>초기화</button>
          <button onClick={handleShowLocalStorage}>콘솔 출력</button>
        </div>
      )} */}

      {/* 테스트용 링크 */}
      <Link to="/study/1">상세페이지 예시로 이동</Link>
    </section>
  );
};
