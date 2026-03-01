import React from 'react';
import styles from './Button.module.scss';

const Button = ({
  id = '',
  buttonClass = 'btnPrimaryLarge',
  buttonText = 'Más programas',
  ariaLabel,
  href = 'none',
  target = '_self',
  icon = null,            // ✅ Excelente: Recibe cualquier ícono de afuera
  iconPosition = 'right', // ✅ Excelente: Define de qué lado va
  dark = false,
  full = false,
  onClick
}) => {
  const hasIcon = icon !== null;

  // Construcción de clases
  const classes = [
    styles[buttonClass] || styles.btnPrimaryLarge,
    dark && styles.dark,
    hasIcon && iconPosition === 'right' && styles.iconRight,
    hasIcon && iconPosition === 'left'  && styles.iconLeft,
    full && styles.full
  ].filter(Boolean).join(' ');

  const finalAriaLabel = ariaLabel || buttonText;

  // Determinar tamaño para la clase de texto
  const size = buttonClass.match(/(Large|Medium|Small)$/)?.[1] || 'Large';
  const textClass = styles[`ss3Button${size}600`];

  // Envoltorio del ícono
  const renderIcon = () => (
    <span className={styles.icon} role="img" aria-hidden="true">
      {icon}
    </span>
  );

  // Contenido interno del botón
  const buttonContent = (
    <>
      {hasIcon && iconPosition === 'left'  && renderIcon()}
      <span className={textClass}>{buttonText}</span>
      {hasIcon && iconPosition === 'right' && renderIcon()}
    </>
  );

  // Renderizar como Enlace <a> (Usando la técnica limpia de la V2)
  if (href !== 'none') {
    const linkProps = {
      className: classes,
      'aria-label': finalAriaLabel,
      href,
      target,
      id
    };
    
    // Solo agrega rel="noopener noreferrer" si es blank por seguridad
    if (target === '_blank') {
      linkProps.rel = 'noopener noreferrer';
    }
    
    return <a {...linkProps}>{buttonContent}</a>;
  }

  // Renderizar como Botón <button>
  return (
    <button
      className={classes}
      aria-label={finalAriaLabel}
      id={id}
      onClick={onClick}
      type="button"
    >
      {buttonContent}
    </button>
  );
};

export default Button;