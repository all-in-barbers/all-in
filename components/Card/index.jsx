import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

// styles
import styles from './style.module.css';

const propTypes = {
  title: PropTypes.string,
  extraTitle: PropTypes.string,
  time: PropTypes.string,
  price: PropTypes.string,
  withTopGap: PropTypes.bool,
  active: PropTypes.bool.isRequired,
  id: PropTypes.number,
  onClick: PropTypes.func,
  titlePos: PropTypes.string,
  titleWeight: PropTypes.string,
  titleSize: PropTypes.string,
  titleMaxWidth: PropTypes.number,
  titleAlign: PropTypes.string,
  titleInvert: PropTypes.bool,
  withFullWidth: PropTypes.bool,
  content: PropTypes.string,
  className: PropTypes.string,
  isSmall: PropTypes.bool,
};

const defaultProps = {
  title: '',
  extraTitle: '',
  time: '',
  price: '',
  withTopGap: false,
  id: null,
  onClick: () => {},
  titlePos: '',
  titleWeight: '',
  titleSize: '',
  titleMaxWidth: null,
  titleAlign: '',
  titleInvert: false,
  withFullWidth: false,
  content: '',
  className: '',
  isSmall: false,
};

const Card = ({
  title,
  extraTitle,
  time,
  price,
  withTopGap,
  active,
  id,
  onClick,
  titlePos,
  titleWeight,
  titleSize,
  titleMaxWidth,
  titleAlign,
  titleInvert,
  withFullWidth,
  content,
  className,
  isSmall,
}) => (
  <div
    className={cn(styles.cardWrapper, {
      [styles.withTopGap]: withTopGap,
      [styles.active]: active,
      [styles.withFullWidth]: withFullWidth,
      [styles.small]: isSmall,
      [className]: true,
    })}
    onClick={(e) => onClick(id, e)}
  >
    <div className={cn(styles.titleBlock, {
      [styles.center]: Boolean(titlePos === 'center'),
    })}
    >
      <h2
        className={cn(styles.cardTitle, {
          [styles.active]: active,
          [styles.invert]: titleInvert,
          [styles[titlePos]]: Boolean(titlePos),
          [styles[titleWeight]]: Boolean(titleWeight),
          [styles[titleSize]]: Boolean(titleSize),
          [styles[titleAlign]]: Boolean(titleAlign),
        })}
        style={{ maxWidth: `${titleMaxWidth}px` }}
      >
        {title}
        {extraTitle ? (
          <p className={styles.extraTitle}>{extraTitle}</p>
        ) : null}
      </h2>
    </div>

    {active ? (
      <div className={cn(styles.cardInfo, {
        [styles.withWhiteBg]: Boolean(content),
      })}
      >
        {time && price ? (
          <>
            <div className={styles.infoBlock}>
              <p className={styles.infoName}>Длительность</p>
              <p className={styles.value}>
                {time}
                мин
              </p>
            </div>
            <div className={styles.infoBlock}>
              <p className={styles.infoName}>Стоимость</p>
              <p className={styles.value}>
                {price}
                ₽
              </p>
            </div>
          </>
        ) : (
          <div className={styles.infoBlock}>
            {content}
          </div>
        )}
      </div>
    ) : null}
  </div>
);

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
