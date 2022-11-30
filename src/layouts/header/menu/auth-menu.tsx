import React from 'react';
import { Button } from 'components/button/button';
import { FormattedMessage } from 'react-intl';
import Popover from 'components/popover/popover';
import { AuthorizedMenu } from './authorized-menu';

interface Props {
  isAuthenticated: boolean;
  onJoin: () => void;
  onLogout: () => void;
  onChangePassword: () => void;
  avatar: string;
}

const AuthMenu = ({ isAuthenticated, onJoin, onLogout, onChangePassword, avatar }: Props) => {
  return !isAuthenticated ? (
    <Button variant="primary" onClick={onJoin}>
      <FormattedMessage id="Sign in / Register" defaultMessage="Sign in / Register" />
    </Button>
  ) : (
    <Popover
      direction="right"
      className="user-pages-dropdown"
      handler={<img src={avatar} alt="user" />}
      content={<AuthorizedMenu onChangePassword={onChangePassword} onLogout={onLogout} />}
    />
  );
};
export default AuthMenu;
