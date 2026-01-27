import styles from './SectionCard.module.css';

export const SectionCard = ({ title, children }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </section>
  );
};
