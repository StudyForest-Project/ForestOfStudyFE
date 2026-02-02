import { Link } from 'react-router';
import styles from './NavButton.module.css';
import ic_arrow from '@/assets/icons/ic_arrow.svg';

export const NavButton = ({ to, children, className = '' }) => {
  return (
    <Link to={to} className={`${styles.button} ${className}`}>
      <span>{children}</span>
      <img src={ic_arrow} alt="" aria-hidden="true" />
    </Link>
  );
};
