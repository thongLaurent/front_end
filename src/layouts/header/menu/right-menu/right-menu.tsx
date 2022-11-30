import React from 'react';
import dynamic from 'next/dynamic';
import NavLink from 'components/nav-link/nav-link';
import { HELP_MENU_ITEM, PRODUCTS_MENU_ITEM, HOME_MENU_ITEM } from 'site-settings/site-navigation';
// import { HelpIcon } from 'assets/icons/HelpIcon';
import { RightMenuBox } from './right-menu.style';
import { HelpIcon } from 'assets/icons/HelpIcon';
const AuthMenu = dynamic(() => import('../auth-menu'), { ssr: false });

type Props = {
  onLogout: () => void;
  onJoin: () => void;
  onChangePassword: () => void;
  avatar: string;
  isAuthenticated: boolean;
};

export const RightMenu: React.FC<Props> = ({
  onLogout,
  avatar,
  isAuthenticated,
  onJoin,
  onChangePassword
}) => {
  return (
    <RightMenuBox>
       <NavLink
        className="menu-item"
        href={HOME_MENU_ITEM.href}
        label={HOME_MENU_ITEM.defaultMessage}
        intlId={HOME_MENU_ITEM.id}
        iconClass="menu-icon"
      />

       <NavLink
        className="menu-item"
        href={PRODUCTS_MENU_ITEM.href}
        label={PRODUCTS_MENU_ITEM.defaultMessage}
        intlId={PRODUCTS_MENU_ITEM.id}
        iconClass="menu-icon"
      />
      <NavLink
        className="menu-item"
        href={HELP_MENU_ITEM.href}
        label={HELP_MENU_ITEM.defaultMessage}
        intlId={HELP_MENU_ITEM.id}
        iconClass="menu-icon"
        icon={<HelpIcon />}
      />
         
     
      {/* <LanguageSwitcher /> */}

      <AuthMenu
        avatar={avatar}
        onJoin={onJoin}
        onChangePassword={onChangePassword}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
      />
    </RightMenuBox>
  );
};
