import React from 'react';
import styles from './Button.module.scss';

const Button = ({
  id = '',
  buttonClass = 'btnPrimaryLarge',
  buttonText = 'Más programas',
  ariaLabel,
  href = 'none',
  target = '_self',
  icon = null,
  iconPosition = 'right',
  dark = false,
  full = false,
  onClick,
  disabled = false, 
  style = {},       
}) => {
  const hasIcon = icon !== null;

  const classes = [
    styles[buttonClass] || styles.btnPrimaryLarge,
    dark && styles.dark,
    hasIcon && iconPosition === 'right' && styles.iconRight,
    hasIcon && iconPosition === 'left'  && styles.iconLeft,
    full && styles.full
  ].filter(Boolean).join(' ');

  const finalAriaLabel = ariaLabel || buttonText;

  const size = buttonClass.match(/(Large|Medium|Small)$/)?.[1] || 'Large';
  const textClass = styles[`ss3Button${size}600`];

  const renderIcon = () => (
    <span className={styles.icon} role="img" aria-hidden="true">
      {icon}
    </span>
  );

  const buttonContent = (
    <>
      {hasIcon && iconPosition === 'left'  && renderIcon()}
      <span className={textClass}>{buttonText}</span>
      {hasIcon && iconPosition === 'right' && renderIcon()}
    </>
  );

  if (href !== 'none') {
    const linkProps = {
      className: classes,
      'aria-label': finalAriaLabel,
      href,
      target,
      id
    };

    if (target === '_blank') {
      linkProps.rel = 'noopener noreferrer';
    }

    return <a {...linkProps}>{buttonContent}</a>;
  }

  return (
    <button
      className={classes}
      aria-label={finalAriaLabel}
      id={id}
      onClick={onClick}
      type="button"
      disabled={disabled} 
      style={style}        
    >
      {buttonContent}
    </button>
  );
};

export default Button;