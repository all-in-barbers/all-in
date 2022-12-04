import React, { useState } from 'react';
import cn from 'classnames';

// components
import { useSelector } from 'react-redux';
import PhoneIconSVG from '../Icons/PhoneIconSVG';

// customHooks
import useScreen from '../../customHooks/useScreen';

// styles
import styles from './style.module.css';

const Footer = () => {
  const [isPhoneActive, setPhoneActive] = useState(false);
  const screen = useScreen();
  const isMobile = screen.width <= 690;
  const { logoPosition } = useSelector((s) => ({
    logoPosition: s.app.logoPosition,
  }));

  const marginForFooterWrapper = !isMobile ? `${logoPosition + 108}px` : null;
  return (
    <footer className={styles.footerWrapper} style={{ marginLeft: marginForFooterWrapper }}>
      <div className={styles.footerContent}>
        {!isMobile ? (
          <div className={cn(styles.info, {
            [styles.active]: isPhoneActive && !isMobile,
          })}
          >
            <div className={styles.infoValue}>
              <span>Итальянская ул., 16, 19 A</span>
            </div>
            <div className={styles.infoValue}>
              <span>Пн-Вс, 10:00-22:00</span>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.comingSoon}>
              <p className={styles.comingItem}>Блог</p>
              <p className={styles.comingItem}>Магазин</p>
              <p className={cn(styles.comingItem, styles.white)}>coming soon</p>
            </div>

          </>
        )}
        <div className={styles.social}>
          <div className={styles.socialItem}>
            <div className={styles.phoneSvgBlock} onClick={() => setPhoneActive(!isPhoneActive)}>
              <a href="tel:89112871777" className={styles.link}>
                <PhoneIconSVG color={isPhoneActive && !isMobile ? '#000000' : '#898989'} />
                {!isMobile && (
                  <div
                    className={cn(styles.phone, {
                      [styles.active]: isPhoneActive && !isMobile,
                    })}
                  >
                    +7 (911) 287-17-77
                  </div>
                )}
              </a>
            </div>
          </div>
          <div className={styles.socialItem}>
            <a className={styles.link} href="https://instagram.com/allinstudio.hair/">
              <img src="/footer/instagram.svg" alt="phone" />
            </a>
          </div>
          {/*<div className={styles.socialItem}>*/}
          {/*  <a className={styles.link} href="https://facebook.com">*/}
          {/*    <img src="/footer/facebook.svg" alt="phone" />*/}
          {/*  </a>*/}
          {/*</div>*/}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
