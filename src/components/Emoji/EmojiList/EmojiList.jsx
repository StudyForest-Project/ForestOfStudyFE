import { useState } from 'react';
import clsx from 'clsx';
import { EmojiItem } from '../EmojiItem';
import ic_plus from '@/assets/icons/ic_plus.svg';
import styles from './EmojiList.module.css';

export const EmojiList = ({ emojis = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const preview = emojis.slice(0, 3);
  const restCount = emojis.length - 3;
  const hasMoreEmojis = restCount > 0;

  return (
    <div className={styles.wrapper}>
      {/* 기본 이모지 미리보기 */}
      <div className={styles.emojiContainer}>
        {preview.map((item) => (
          <EmojiItem key={item.emoji} count={item.count}>
            {item.emoji}
          </EmojiItem>
        ))}

        {/* 이모지 더보기 */}
        {hasMoreEmojis && (
          <EmojiItem
            onClick={handleToggle}
            className={styles.moreButton}
            count={restCount}
          >
            <img src={ic_plus} alt="이모지 더보기" />
          </EmojiItem>
        )}
      </div>

      {/* 이모티콘 전체 목록 */}
      {isOpen && (
        <div className={clsx(styles.emojiContainer, styles.dropDown)}>
          {emojis.slice(3).map((item) => (
            <EmojiItem key={item.emoji} count={item.count}>
              {item.emoji}
            </EmojiItem>
          ))}
        </div>
      )}
    </div>
  );
};
