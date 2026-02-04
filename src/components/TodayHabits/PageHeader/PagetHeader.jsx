import { NavButton } from '@/components/NavButton';
import { CurrentTime } from '../CurrentTime/CurrentTime';
import styles from './PageHeader.module.css';

export const PageHeader = ({ title, studyId, now }) => {
  return (
    <header>
      <div className={styles.top}>
        <h1 className={styles.title}>{title}</h1>

        <nav className={styles.navButtonWrapper}>
          <NavButton to={`/studies/${studyId}/focus`}>오늘의 집중</NavButton>
          <NavButton to={`/studies/${studyId}`}>스터디 상세</NavButton>
        </nav>
      </div>

      <CurrentTime className={styles.currentTime} value={now} />
    </header>
  );
};
