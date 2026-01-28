import { Link } from 'react-router-dom';
import styles from './StudyPage.module.css';

export const RecentPage = () => {
  return (
    <section className={styles.container}>
      <h1>최근 조회한page</h1>
      <Link to="/study/1">상세페이지</Link>
    </section>
  );
};
