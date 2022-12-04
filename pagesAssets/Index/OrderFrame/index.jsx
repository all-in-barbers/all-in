import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { setPartVisibility, setWidget } from '../../../action/app';

// customHooks
import useScreen from '../../../customHooks/useScreen';

// styles
import styles from './styles.module.css';
import Button from '../../../components/MainButton';

const iframeUrl = 'https://b451950.yclients.com/company/428417/select-master?o=';
const iosAppLink = 'https://apps.apple.com/ru/app/all-in-barbers-and-more/id1557949058';
const googlePlayLink = 'https://play.google.com/store/apps/details?id=com.yclients.mobile.s428417&hl=ru&gl=US';

const OrderFrame = () => {
  const dispatch = useDispatch();
  const [showGallery, setGalleryVisibility] = useState(false);
  const screen = useScreen();
  const isMobile = screen.width <= 690;
  const { logoPosition, firstHeaderItemPos, showParts } = useSelector((s) => ({
    logoPosition: s.app.logoPosition,
    firstHeaderItemPos: s.app.firstHeaderItemPos,
    showParts: s.app.showParts,
  }));

  useEffect(() => {
    setTimeout(() => dispatch(setPartVisibility(true), 50));
  }, []);

  return (
    <div className={styles.frameWrapper}>
      <div
        className={cn(styles.leftPart, {
          [styles.showLeftPart]: showParts,
          [styles.fullWidth]: showGallery,
        })}
        onMouseEnter={!isMobile ? () => setGalleryVisibility(true) : () => {}}
        onMouseLeave={!isMobile ? () => setGalleryVisibility(false) : () => {}}
        onClick={isMobile ? () => setGalleryVisibility(!showGallery) : () => {}}
        style={{ maxWidth: `${logoPosition || firstHeaderItemPos}px` }}
      >
        <img
          src="/winter-gallery.png"
          className={styles.gallery}
          alt="gallery"
          srcSet="/winter-gallery.png 2x"
        />
      </div>
      <div className={cn(styles.rightPart, {
        [styles.showRightPart]: showParts,
      })}
      >
        <div className={styles.slogan}>
          <div className={styles.accent}>ALL IN *winter season</div>
        </div>
        <div className={styles.heading}>
          <h1 className={styles.mainTitle}>ЗА ВАШУ ГОЛОВУ МЫ ОТВЕЧАЕМ СВОЕЙ</h1>
        </div>
        <div className={styles.buttonsBlock}>
          <Button
            className={styles.orderBtn}
            onClick={() => dispatch(setWidget({ widget: true, iframeUrl }))}
          >
            Записаться
          </Button>
          <a href={iosAppLink} target="_blank" rel="noreferrer">
            <Button className={styles.storeLink} isStore>
              <img className={styles.storeImg} src="/store/apple.svg" alt="app-store-svg" />
            </Button>
          </a>
          <a href={googlePlayLink} target="_blank" rel="noreferrer">
            <Button className={styles.storeLink} isStore>
              <img className={styles.storeImg} src="/store/google.svg" alt="app-store-svg" />
            </Button>
          </a>
        </div>
        {isMobile && (
        <div className={styles.bottomPartForMobile}>
          <span className={styles.text}>Пн-Вс, 10:00-22:00</span>
          <span className={styles.text}>Итальянская ул., 16, 19 A</span>
          <div className={styles.logoBox}>
            <img src="/header/all-in-studio.png" alt="main-logo" />
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default OrderFrame;
