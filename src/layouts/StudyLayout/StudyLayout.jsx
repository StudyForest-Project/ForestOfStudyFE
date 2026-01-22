import { Outlet } from 'react-router';
import styles from './StudyLayout.module.css';
import logo from '../../assets/logo.png';

export const StudyLayout = () => {
  return (
    <div className={styles.page}>
      <img className={styles.logo} src={logo} alt="공부의 숲 로고" />
      <main className={styles.container}>
        <Outlet />
      </main>
    </div>
  );
};
