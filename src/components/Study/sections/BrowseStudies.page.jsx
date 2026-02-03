import styles from './StudyPage.module.css';
import { BrowseStudy } from '../BrowseStudy';

export const BrowseStudiesPage = () => {
  return (
    <section className={`${styles.container} ${styles.browseSection}`}>
      <BrowseStudy />
    </section>
  );
};
