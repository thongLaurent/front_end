import React, { useContext } from 'react';
import Router from 'next/router';
import { AuthContext } from 'contexts/auth/auth.context';
import {
  SidebarWrapper,
  SidebarTop,
  SidebarBottom,
  SidebarMenu,
  LogoutButton,
} from './sidebar.style';
import { FormattedMessage } from 'react-intl';
import { 
  PROFILE_SIDEBAR_BOTTOM_MENU,
} from 'site-settings/site-navigation';
import { ProfileContext } from 'contexts/profile/profile.context';
import { LoginView, UserAvatar, UserDetails } from 'layouts/header/header.style';
import UserImage from 'assets/images/user.jpg'; 


const SidebarCategory: React.FC<{}> = () => {
  const { authDispatch } = useContext<any>(AuthContext);
  const { profileState } = useContext(ProfileContext);


  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      authDispatch({ type: 'SIGN_OUT' });
      Router.push('/');
    }
  };
  return (
    <>
      <SidebarWrapper>
        <SidebarTop>
             <LoginView>
                <UserAvatar>
                  <img src={UserImage} alt="user_avatar" />
                </UserAvatar>
                <UserDetails>
                  <h3>{`${profileState?.firstName} ${profileState?.lastName}`}</h3>
                  <span>{`${profileState?.email}`}</span>
                </UserDetails>
              </LoginView>
          {/* {PROFILE_SIDEBAR_TOP_MENU.map((item, index) => (
            <SidebarMenu href={item.href} key={index} intlId={item.id} />
          ))} */}
        </SidebarTop>

        <SidebarBottom>
          {PROFILE_SIDEBAR_BOTTOM_MENU.map((item, index) => (
            <SidebarMenu href={item.href} key={index} intlId={item.id} />
          ))}
          <LogoutButton type="button" onClick={handleLogout}>
            <FormattedMessage id="nav.logout" defaultMessage="Logout" />
          </LogoutButton>
        </SidebarBottom>
      </SidebarWrapper>
    </>
  );
};

export default SidebarCategory;
