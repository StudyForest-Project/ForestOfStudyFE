import { Link } from 'react-router-dom';
import styles from './StudyPage.module.css';
import { useRecentStudies } from ''



export const RecentPage = () => {
  return (
    <section className={styles.container}>
      <h1>최근 조회한page</h1>
      <Link to="/study/1">상세페이지</Link>
    </section>
  );
};


















// 컴포넌트 규칙 지키기
// 만들때 폴더 생성 해서 만들기
// set 은 온클릭까지 
// get으로 카드 컴포넌트를 어떻게 쓸건지 파악하는 행위 => 로컬스토리지 겟으로 꺼내오는것
// 카드는 규량님 카드를 



