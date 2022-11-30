import { Modal } from '@redq/reuse-modal';
import { Input } from 'components/forms/input';
import { Label } from 'components/forms/label';
import { withAuth } from 'components/protect-route';
import { SEO } from 'components/seo';
import { ProfileContext } from 'contexts/profile/profile.context';
import Referrals from 'features/user-profile/referrals/referrals';
import Sidebar from 'features/user-profile/sidebar/sidebar';
import {
  ContentBox, PageWrapper,
  SidebarSection
} from 'features/user-profile/user-profile.style';
import Wallet from 'features/user-profile/wallet/wallet';
import Footer from 'layouts/footer';
import { NextPage } from 'next';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'react-styled-flexboxgrid';


type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const ProfilePage: NextPage<Props> = ({ deviceType }) => {
  const { profileState } = useContext(ProfileContext);

  return (
    <>
     
      
        {/* <Modal>
          <PageWrapper>
            <SidebarSection>
              <Sidebar />
            </SidebarSection>
            <ContentBox>
            <Row style={{ alignItems: 'flex-end', marginBottom: '50px' }}>
              <Col xs={12} sm={5} md={5} lg={5}>
                <Wallet walletBalance={profileState.walletBalance} />
              </Col>
              <Col xs={12} sm={5} md={5} lg={5}>
                <Referrals referedPilotsCount={profileState.referedPilotsCount} />
              </Col>
            </Row>
            <Row style={{ alignItems: 'flex-end', marginBottom: '50px' }}>
              <Col xs={12} sm={5} md={5} lg={5}>
                <Label>
                  <FormattedMessage
                    id='profileFirstNameField'
                    defaultMessage='First Name'
                  />
                </Label>
                <Input
                  type='text'
                  label='First name'
                  name='firstName'
                  value={profileState.firstName}
                  backgroundColor='#F7F7F7'
                  height='48px'
                />
              </Col>
              <Col xs={12} sm={5} md={5} lg={5}>
                <Label>
                  <FormattedMessage
                    id='profileLastNameField'
                    defaultMessage='First Name'
                  />
                </Label>
                <Input
                  type='text'
                  label='First name'
                  name='firstName'
                  value={profileState.lastName}
                  backgroundColor='#F7F7F7'
                  height='48px'
                />
              </Col>
              </Row>
              <Row style={{ alignItems: 'flex-end', marginBottom: '50px' }}>
              <Col xs={12} sm={5} md={5} lg={5}>
                <Label>
                  <FormattedMessage
                    id='profileEmailField'
                    defaultMessage='Your Email'
                  />
                </Label>
                <Input
                  type='email'
                  name='email'
                  label='Email Address'
                  value={profileState.email}
                  backgroundColor='#F7F7F7'
                  disabled
                />
              </Col>
              <Col xs={12} sm={5} md={5} lg={5}>
                <Label>
                  <FormattedMessage
                    id='contactNumberTItle'
                    defaultMessage='Contact Number'
                  />
                </Label>
                <Input
                  type='text'
                  name='contactNumber'
                  label='Contact Number'
                  value={profileState.mobileNumber}
                  backgroundColor='#F7F7F7'
                />
              </Col>
              </Row>
              <Row style={{ alignItems: 'flex-end', marginBottom: '50px' }}>
              
              </Row>
            </ContentBox>

            <Footer />
          </PageWrapper>
        </Modal> */}
    </>
  );
};

export default withAuth(ProfilePage);
