import { Link } from 'react-router';
import { Outlet } from 'react-router';
import styles from './RootLayout.module.css';
import logo from '../../assets/logo.png';
import { PrimaryButton } from '../../components/PrimaryButton';
import { RecentStudy } from '../../components/Study/RecentStudy';
import { BrowseStudy } from '../../components/Study/BrowseStudy';

export const RootLayout = () => {
  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <img className={styles.logo} src={logo} alt="공부의 숲 로고" />
        <Link to="/new">
          <PrimaryButton>스터디 만들기</PrimaryButton>
        </Link>
      </header>
      <div>
        <main className={styles.container}>
          <Outlet />
          <RecentStudy />
        </main>
      </div>
      <div>
        <main className={styles.container}>
          <Outlet />
          <BrowseStudy />
        </main>
      </div>
    </div>
  );
};
