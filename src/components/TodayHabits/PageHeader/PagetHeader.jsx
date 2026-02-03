import { NavButton } from '@/components/NavButton';
import styles from './PageHeader.module.css';
import { CurrentTime } from '../CurrentTime/CurrentTime';

export const PageHeader = ({ title, studyId, now }) => {
  return (
    <div>
      <div className={styles.top}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.navButtonWrapper}>
          <NavButton to={`/studies/${studyId}/focus`}>오늘의 집중</NavButton>
          <NavButton to="/">홈</NavButton>
        </div>
      </div>

      <CurrentTime className={styles.currentTime} value={now} />
    </div>
  );
};
