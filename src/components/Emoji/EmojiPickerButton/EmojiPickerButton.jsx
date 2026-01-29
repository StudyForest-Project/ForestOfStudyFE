import { useEffect, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { addEmoji } from '../../../services/studyService';
import ic_emoji_add from '../../../assets/icons/ic_emoji_add.svg';
import styles from './EmojiPickerButton.module.css';

export const EmojiPickerButton = ({ studyId, onUpdate }) => {
  /* 이모지 피커 열림/닫힘 상태 */
  const [isOpen, setIsOpen] = useState(false);
  /* 이모지 연타를 모아두는 큐 (배치 전송용)*/
  const [emojiQueue, setEmojiQueue] = useState([]);

  /* 이모지 클릭 핸들러 (큐에 쌓아 debounce로 한 번에 전송) */
  const handleEmojiClick = async (emojiObject) => {
    setEmojiQueue((prev) => [...prev, emojiObject.emoji]);
  };

  /* 이모지 배치 전송 useEffect (500ms동안 추가 클릭이 없으면 서버로 전송) */
  useEffect(() => {
    if (emojiQueue.length === 0) return;

    const debounce = setTimeout(async () => {
      try {
        const data = await addEmoji(studyId, emojiQueue);
        onUpdate(data.emojis);
        setEmojiQueue([]);
      } catch (error) {
        console.error(error);
        alert('이모지 추가 실패');
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [emojiQueue, studyId, onUpdate]);

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
