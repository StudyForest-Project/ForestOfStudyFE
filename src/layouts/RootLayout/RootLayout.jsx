import { Link } from 'react-router';
import { Outlet } from 'react-router';
import styles from './RootLayout.module.css';
import logo from '../../assets/logo.png';
import { PrimaryButton } from '../../components/PrimaryButton';

export const RootLayout = () => {
  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="공부의 숲 로고" />
        </Link>
        <Link to="/new">
          <PrimaryButton>스터디 만들기</PrimaryButton>
        </Link>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
