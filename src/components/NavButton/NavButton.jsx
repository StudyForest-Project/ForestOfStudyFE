import { Link } from 'react-router';
import styles from './NavButton.module.css';
import ic_arrow from '@/assets/icons/ic_arrow.svg';

export const NavButton = ({
  as = 'link',
  to,
  onClick,
  children,
  className = '',
}) => {
  if (as === 'button') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${styles.button} ${className}`}
      >
        <span>{children}</span>
        <img src={ic_arrow} alt="" aria-hidden="true" />
      </button>
    );
  }

  return (
    <Link to={to} className={`${styles.button} ${className}`}>
      <span>{children}</span>
      <img
        src={ic_arrow}
        alt=""
        aria-hidden="true"
      />
    </Link>
  );
};
