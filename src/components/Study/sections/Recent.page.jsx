import styles from './StudyPage.module.css';
import {RecentStudy} from '../RecentStudy'
export const RecentPage = () => {
  return (
    <section className={styles.container}>
      <RecentStudy/>
    </section>
  );
};
