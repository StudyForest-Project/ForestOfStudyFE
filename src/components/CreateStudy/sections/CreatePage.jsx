import styles from './CreatePage.module.css';
import { CreateStudy } from '../CreateStudy';

export const CreatePage = () => {
  return (
    <section className={styles.container}>
      <CreateStudy />
    </section>
  );
};
