import { Modal } from '@redq/reuse-modal';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';

import {
  ContentSection, MainContentArea, OfferSection, SidebarSection
} from 'assets/styles/pages.style';

// Static Data Import Here
import { SEO } from 'components/seo';
import { sitePages } from 'site-settings/site-pages';
import { useRefScroll } from 'utils/use-ref-scroll';
import { Input } from 'components/forms/input';
import { Grid } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
const Sidebar = dynamic(() => import('layouts/sidebar/sidebar'));
const Products = dynamic(() =>
  import('components/product-grid/product-list/product-list')
);

const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
  ssr: false, 
});

const CategoryPage: React.FC<any> = ({ deviceType }) => {
  const { query } = useRouter();
  const { elRef: targetRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -110,
  });
  React.useEffect(() => {
    if (query.text || query.category) {
      scroll();
    }
  }, [query.text, query.category]);

  const PAGE_TYPE: any = query.type;
  const page = sitePages[PAGE_TYPE];
   
  return (
    <>      

      <Modal>
        {/* <Banner
          intlTitleId={page?.banner_title_id}
          intlDescriptionId={page?.banner_description_id}
          imageUrl={page?.banner_image_url}
        />
        <MobileCarouselDropdown>
          <StoreNav items={CATEGORY_MENU_ITEMS} />
          <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
        </MobileCarouselDropdown> */}
        {/* <OfferSection>
          <div style={{ margin: '0 -10px' }}>
            <Carousel deviceType={deviceType} data={siteOffers} />
          </div>
        </OfferSection> */}
        <br/>
        <br/>
        <OfferSection >
       
          <div style={{display: 'flex',flexDirection: 'row'}}>
           
              <LocationOnIcon />
              <Input
              placeholder="Washington D.C"
              type="text"
              name="text"
              value={query.text}
              />

            <Grid item xs={12} sm={12} md={12} style={{ marginLeft: '50px'}}>    

            <Input
              placeholder="Search products"
              type="text"
              name="text"
              value={query.text}
            />
            </Grid>
            </div>

       
          {/* <div
              style={{
                position: `relative`,
              }}
            >
            <Input
              type="text"
              placeholder={"Search string."}
              // value={values.username}
              name="username"
              // onChange={handleOnChanges}
              // onBlur={handleOnChanges}
              // onFocus={handleOnFocus}
              height="48px"
              backgroundColor="#F7F7F7"
              mb="10px"
            />
            
          </div> */}

        </OfferSection>
        <MainContentArea>
          <SidebarSection>
            <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
          </SidebarSection>
          <ContentSection>
            <div ref={targetRef}>
              <Products
                type={PAGE_TYPE}
                deviceType={deviceType}
                fetchLimit={20}
              />
            </div>
          </ContentSection>
        </MainContentArea>
        <CartPopUp deviceType={deviceType} />
      </Modal>
    </>
  );
};

export default CategoryPage;
