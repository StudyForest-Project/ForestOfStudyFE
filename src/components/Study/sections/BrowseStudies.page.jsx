import { Link } from 'react-router-dom';
import styles from './StudyPage.module.css';

export const BrowseStudiesPage = () => {
  return (
    <section className={styles.container}>
      <h1>스터디 둘러보기</h1>
      <Link to="/study/1">상세페이지</Link>
    </section>
  );
};
