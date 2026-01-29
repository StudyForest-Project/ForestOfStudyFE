import styles from './StudyList.module.css';
import { study } from '../../seed/study.js';
import { StudyCard } from './StudyCard.jsx';

export const StudyList = () => {
  const previewItems = study.items.slice(0, 3);

  return (
    <div className={styles.grid}>
      {previewItems.map((item, index) => (
        <StudyCard key={`study-${item.id}-${index}`} y item={item} />
      ))}
    </div>
  );
};
