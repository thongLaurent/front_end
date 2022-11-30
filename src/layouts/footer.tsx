import styled from 'styled-components';
import css from '@styled-system/css';
import { FormattedMessage } from 'react-intl';
const Box = styled.div(
  css({
    fontFamily: 'body',
    fontSize: 'sm',
    fontWeight: 'regular',
    color: 'text.regular',
    px: 20,

    a: {
      color: 'primary.regular',
    },
  }),
  {
    marginTop: 50,
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
);
const Footer = () => {
  return (
    <Box>
      <a href='#' target='_blank'>
        Femen Life.
      </a>
    </Box>
  );
};
export default Footer;
