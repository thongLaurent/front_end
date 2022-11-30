import React from 'react';

import { sitePages } from 'site-settings/site-pages';
import { useRefScroll } from 'utils/use-ref-scroll';

import { Modal } from '@redq/reuse-modal';

import {
  MainContentArea
} from 'assets/styles/pages.style';
import { Banner } from 'components/banner/banner';
import dynamic from 'next/dynamic';
const Products = dynamic(() =>
  import('components/product-grid/product-list/product-list')
);
const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
  ssr: false,
});
// the redirect will only happen on the client-side. This is by design,
const IndexPage: React.FC<any> = ({ deviceType }) => {
  // useEffect(() => {
  //   Router.replace('/', '/home');
  // });
  const page = sitePages.home;
  const { elRef: targetRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -110,
  });
  
  return (
    <>      

      <Modal>
        <Banner
          intlTitleId={page?.banner_title_id}
          intlDescriptionId={page?.banner_description_id}
          imageUrl={page?.banner_image_url}
        />
        <MainContentArea>
        {/* <MobileCarouselDropdown>
          <StoreNav items={CATEGORY_MENU_ITEMS} />
          <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
        </MobileCarouselDropdown> */} 
        {/* <OfferSection>
          <div style={{ margin: '0 -10px' }}>
            <Carousel deviceType={deviceType} data={siteOffers} />
          </div>
        </OfferSection>
        <MainContentArea>
          {/* <SidebarSection>
            <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
          </SidebarSection> */}
            {/* <div style={
              {
                height: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '24px'
              }
            }>
              Comming Soon
            </div> */}
            
        </MainContentArea>
        <CartPopUp deviceType={deviceType} />
      </Modal>
    </>
  );
};

export default IndexPage;
 