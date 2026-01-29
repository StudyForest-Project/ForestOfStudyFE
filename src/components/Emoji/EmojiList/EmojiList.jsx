import { useState } from 'react';
import clsx from 'clsx';
import { EmojiItem } from '../EmojiItem';
import ic_plus from '../../../assets/icons/ic_plus.svg';
import styles from './EmojiList.module.css';

export const EmojiList = ({ emojis = [] }) => {
  const [open, setOpen] = useState(false);

  const preview = emojis.slice(0, 3);
  const restCount = emojis.length - 3;

  return (
    <div className={styles.wrapper}>
      {/* 기본 이모지 미리보기 */}
      <div className={styles.emojiContainer}>
        {preview.map((item) => (
          <EmojiItem key={item.emoji} emoji={item.emoji} count={item.count} />
        ))}

        {/* 이모지 더보기 */}
        {restCount > 0 && (
          <EmojiItem
            onClick={() => setOpen((prev) => !prev)}
            className={styles.moreButton}
            count={`${restCount}..`}
          >
            <img src={ic_plus} alt="이모티콘 더보기" />
          </EmojiItem>
        )}
      </div>

      {/* 이모티콘 전체 목록 */}
      {open && (
        <div className={clsx(styles.emojiContainer, styles.dropDown)}>
          {emojis.slice(3).map((item) => (
            <EmojiItem key={item.emoji} emoji={item.emoji} count={item.count} />
          ))}
        </div>
      )}
    </div>
  );
};
