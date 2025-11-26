import styles from './AnimatedButton.module.css';
import {Link} from 'react-router';
import {useState} from 'react';

export const AnimatedButton = ({
  children,
  to,
  bgColor,
  textColor,
  as: Component = Link,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isUnhovered, setIsUnhovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsUnhovered(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsUnhovered(true);
  };

  return (
    <Component
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={styles.AnimatedButton}
      to={to}
      style={{
        color: isHovered ? bgColor : textColor,
        border: `2px solid ${bgColor}`,
        transition: 'color 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86)',
      }}
    >
      <span
        className={`
            ${styles.spanOne}
            ${isHovered ? styles.animateButton : ''}
            ${isUnhovered ? styles.teleportLeft : ''}
            ${isUnhovered ? styles.animateUnhover : ''}
            `}
        style={{backgroundColor: bgColor}}
      ></span>

      {children}
    </Component>
  );
};
