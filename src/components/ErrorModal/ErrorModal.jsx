import useErrorStore from '../../stores/useErrorStore';
import styles from './ErrorModal.module.css';
//예시안 입니다. 추후 삭제 하고 쓰시면 되여
function ErrorModal() {
  const { isOpen, message, closeError } = useErrorStore();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={closeError}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p className={styles.message}>{message}</p>
        <button className={styles.button} onClick={closeError}>
          확인
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;
