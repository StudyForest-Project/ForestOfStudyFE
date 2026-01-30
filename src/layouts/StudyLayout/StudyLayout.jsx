import { Link, Outlet } from 'react-router';
import styles from './StudyLayout.module.css';
import logo from '@/assets/logo.png';

export const StudyLayout = () => {
  return (
    <div className={styles.page}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="공부의 숲 로고" />
      </Link>
      <main className={styles.container}>
        <Outlet />
      </main>
    </div>
  );
};
