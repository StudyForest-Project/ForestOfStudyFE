import { useEffect, useState } from 'react';
import { EmojiList } from '../EmojiList';
import { EmojiPickerButton } from '../EmojiPickerButton';
import styles from './EmojiSection.module.css';

export const EmojiSection = ({ studyId, initialEmojis }) => {
  const [emojis, setEmojis] = useState(initialEmojis);

  useEffect(() => {
    setEmojis(initialEmojis);
  }, [initialEmojis]);

  /* 이모지 UI 상태 업데이트 */
  const handleAddEmoji = (emoji) => {
    setEmojis((prev) => {
      const found = prev.find((e) => e.emoji === emoji);

      if (found) {
        return prev.map((e) =>
          e.emoji === emoji ? { ...e, count: e.count + 1 } : e,
        );
      }

      return [{ emoji, count: 1 }, ...prev];
    });
  };

  return (
    <div className={styles.container}>
      {/* 이모지 필 (이모지 보기) */}
      <EmojiList emojis={emojis} />

      {/* 이모지피커 (이모지 추가) */}
      <EmojiPickerButton studyId={studyId} onAddEmoji={handleAddEmoji} />
    </div>
  );
};
