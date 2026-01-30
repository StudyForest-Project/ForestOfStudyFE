import { useEffect, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import ic_emoji_add from '@/assets/icons/ic_emoji_add.svg';
import { addEmojis } from '@/services/studyService';
import styles from './EmojiPickerButton.module.css';

export const EmojiPickerButton = ({ studyId, onAddEmoji }) => {
  /* 이모지 피커 열림/닫힘 상태 */
  const [isOpen, setIsOpen] = useState(false);
  /* 이모지 연타를 모아두는 큐 (배치 전송용)*/
  const [emojiQueue, setEmojiQueue] = useState([]);

  /* 이모지 클릭 핸들러 */
  const handleEmojiClick = async (emojiObject) => {
    const { emoji } = emojiObject;

    onAddEmoji(emoji); // UI (즉시 화면 반영)
    setEmojiQueue((prev) => [...prev, emoji]); // 큐에 추가
  };

  /* 이모지 배치 전송 useEffect (500ms동안 추가 클릭이 없으면 서버로 전송) */
  useEffect(() => {
    if (emojiQueue.length === 0) return;

    const debounce = setTimeout(async () => {
      /* 서버에 전송할 스냅샷 */
      const tempQueue = [...emojiQueue];
      /* 전송 중에도 새 입력을 받기 위해 입력 버퍼 초기화 */
      setEmojiQueue([]);
      try {
        /* 스냅샷으로 API 호출 */
        await addEmojis(studyId, tempQueue);
      } catch (error) {
        console.error(error);
        alert('이모지 추가 실패');
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [emojiQueue, studyId]);

  return (
    <div className={styles.wrapper}>
      {/* 이모지 추가 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.addButton}
      >
        <img src={ic_emoji_add} />
        추가
      </button>

      {/* emoji-picker */}
      {isOpen && (
        <div className={styles.emojiPicker}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};
