import React, { useEffect, useRef, useState, useMemo } from 'react';
import {useDispatch, useSelector} from 'react-redux';

// actions
import {setFirstHeaderItemPosToLeft, setLogoPositionToLeft, setMainTab, setPartVisibility} from '../../action/app';

// customHooks
import useScreen from '../../customHooks/useScreen';

// styles
import styles from './style.module.css';
import cn from "classnames";
import {DISABLED_HEADER_NAV_ITEMS} from "../../constants";
import HeaderContent from "./content";

const Header = () => {
  const logoEl = useRef();
  const firstHeaderEl = useRef();
  const dispatch = useDispatch();
  const screen = useScreen();
  const [activeTab, setActiveTab] = useState('order');
  const [isMobile, setIsMobile] = useState(false);
  const { mainTab } = useSelector(s => ({
    mainTab: s.app.mainTab,
  }))

  useEffect(() => {
    setIsMobile(screen.width <= 690);
    if (!isMobile) {
      const logoPosition = logoEl.current.getBoundingClientRect();
      dispatch(setLogoPositionToLeft(logoPosition.width + logoPosition.x));
      dispatch(setFirstHeaderItemPosToLeft(null));
    } else if (isMobile) {
      const fistItemPos = firstHeaderEl.current.getBoundingClientRect();
      dispatch(setFirstHeaderItemPosToLeft(fistItemPos.width + fistItemPos.x));
      dispatch(setLogoPositionToLeft(null));
    }
  }, [isMobile, screen]);


  const slicedHeaderContent = useMemo(
    () => (!isMobile ? HeaderContent : HeaderContent.slice(0, 4)),
    [isMobile],
  );

  const navigationClick = (itemName) => {
    if (mainTab !== itemName) {
      dispatch(setPartVisibility(false));
      setTimeout(() =>  dispatch(setMainTab(itemName)), 500);
      setActiveTab(itemName);
    }
  }

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        {!isMobile
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        && <img onClick={mainTab !== 'order' ? () => [
          setActiveTab('order'),
          dispatch(setPartVisibility(false)),
          setTimeout(() => dispatch(setMainTab('order')), 300)
        ] : () => {}} ref={logoEl} src="/header/all-in-studio.png" alt="logo" />}

        <div className={styles.headerNavigation}>
          {slicedHeaderContent.map((item, id) => (
            <div
              ref={id === 0 ? firstHeaderEl : null}
              className={cn(styles.menuItem, {
                [styles.active]: activeTab === item.name,
                [styles.disabled]: DISABLED_HEADER_NAV_ITEMS.has(item.name),
              })}
              onClick={() => navigationClick(item.name)}
            >
              {item.content}
            </div>
          ))}
        </div>

      </div>
    </header>
  );
};

export default Header;
