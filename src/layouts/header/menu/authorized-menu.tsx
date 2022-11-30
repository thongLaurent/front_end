import React from 'react';
import { FormattedMessage } from 'react-intl';
import NavLink from 'components/nav-link/nav-link';
import { AUTHORIZED_MENU_ITEMS } from 'site-settings/site-navigation';

type Props = {
  onLogout: () => void;
  onChangePassword: () => void;
};

export const AuthorizedMenu: React.FC<Props> = ({ onLogout, onChangePassword }) => {
  return (
    <>
      {AUTHORIZED_MENU_ITEMS.map((item, idx) => (
        <NavLink
          key={idx}
          className="menu-item"
          href={item.href}
          label={item.defaultMessage}
          intlId={item.id}
        />
      ))}
       <div className="menu-item" onClick={onChangePassword}>
        <a>
          <span>
            <FormattedMessage id="changePassword" defaultMessage="Change Password" />
          </span>
        </a>
      </div>
      <div className="menu-item" onClick={onLogout}>
        <a>
          <span>
            <FormattedMessage id="navlinkLogout" defaultMessage="Logout" />
          </span>
        </a>
      </div>
    </>
  );
};
