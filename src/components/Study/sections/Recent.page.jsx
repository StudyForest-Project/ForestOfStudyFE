<<<<<<< HEAD
import { Link } from 'react-router-dom';
import styles from '@StudyPage.module.css'; //! alias로 변경
import { useRecentStudies } from '@hooks/useRecentStudies'; //! alias로 변경
import { StudyCard } from '@StudyCard'; //! 추가
import { recentStudySeedData } from '@seed/seedStudyData'; //! 추가
=======
import styles from './StudyPage.module.css';
import { useRecentStudies } from '../../../hooks/useRecentStudies';
import { Link } from 'react-router';

>>>>>>> main

export const RecentPage = () => {
  const { recentStudies } = useRecentStudies();

  const hasRecent = recentStudies.length > 0;
  const visibleStudies = recentStudies.slice(0, 3); // 화면에는 최대 3개만

<<<<<<< HEAD
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
    console.log('=== [recentStudies raw] ===');
    console.log(stored);
    console.log('=== [recentStudies parsed] ===');
    console.log(JSON.parse(stored || '[]'));
    // alert('콘솔을 확인하세요! (F12)');
  };

=======
>>>>>>> main
  return (
    <section className={styles.container}>
      <h1>최근 조회한 스터디</h1>

<<<<<<< HEAD
      {/* TODO: 온클릭 부분 */}
      {process.env.NODE_ENV === 'development' && (
        <div className={styles.devButtonGroup}>
          <button onClick={handleSetSeedData}>시드 데이터 SET</button>
          {/* <button onClick={handleClearData}>초기화</button> */}
          <button onClick={handleShowLocalStorage}>콘솔 출력</button>
        </div>
      )}
      {!hasRecent && <p>아직 조회한 스터디가 없습니다.</p>}
=======
      {!hasRecent && <p>아직 조회한 스터디가 없어요</p>}

>>>>>>> main
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
