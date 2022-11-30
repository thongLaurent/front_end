import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
// import { useQuery } from '@apollo/react-hooks';
import Sticky from 'react-stickynode';
import { Scrollbars } from 'react-custom-scrollbars';
import Popover from 'components/popover/popover';
import { ArrowDropDown } from 'assets/icons/ArrowDropDown';
import { CategoryIcon } from 'assets/icons/CategoryIcon';
import { useLocale } from 'contexts/language/language.provider';
import { useAppState } from 'contexts/app/app.provider';
import {
  SidebarMobileLoader,
  SidebarLoader,
} from 'components/placeholder/placeholder';
import {
  CategoryWrapper,
  TreeWrapper,
  PopoverHandler,
  PopoverWrapper,
  SidebarWrapper,
  RequestMedicine,
} from './sidebar.style';

import { TreeMenu } from 'components/tree-menu/tree-menu';

// import { GET_CATEGORIES } from 'graphql/query/category.query';

type SidebarCategoryProps = {
  deviceType: {
    mobile: string;
    tablet: string;
    desktop: boolean;
  };
  type: string;
};

const SidebarCategory: React.FC<SidebarCategoryProps> = ({
  deviceType: { mobile, tablet, desktop },
  type,
}) => {
  const router = useRouter();
  // const { data, loading } = useQuery(GET_CATEGORIES, {
  //   variables: { type },
  // });

  const { data, loading } = {
    data: {
      categories: [
        'beauty',
        'makeup'
      ]
    }, 
    loading: false
  }
  const { pathname, query } = router;
  const selectedQueries = query.category;

  const { isRtl } = useLocale();

  const onCategoryClick = (slug: string) => {
    const { type, ...rest } = query;
    if (type) {
      router.push(
        {
          pathname,
          query: { ...rest, category: slug },
        },
        {
          pathname: `/${type}`,
          query: { ...rest, category: slug },
        }
      );
    } else {
      router.push({
        pathname,
        query: { ...rest, category: slug },
      });
    }
  };
  const isSidebarSticky = useAppState('isSidebarSticky');

  if (!data || loading) {
    if (mobile || tablet) {
      return <SidebarMobileLoader />;
    }
    return <SidebarLoader />;
  }
  return (
    <CategoryWrapper>
      <PopoverWrapper>
        <Popover
          handler={
            <PopoverHandler>
              <div>
                <CategoryIcon />
                Select your Category
              </div>
              <div>
                <ArrowDropDown />
              </div>
            </PopoverHandler>
          }
          className="category-popover"
          content={
            <>
              <TreeMenu
                data={data.categories}
                onClick={onCategoryClick}
                active={selectedQueries}
              />
            </>
          }
        />
      </PopoverWrapper>

      {/* <SidebarWrapper style={{ paddingTop: type === 'medicine' ? 0 : 45 }}>
        <Sticky enabled={isSidebarSticky} top={type === 'medicine' ? 89 : 110}>
         
          <Scrollbars
            universal
            autoHide
            autoHeight
            autoHeightMax={688}
            renderView={(props) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  marginLeft: isRtl ? props.style.marginRight : 0,
                  marginRight: isRtl ? 0 : props.style.marginRight,
                }}
              />
            )}
          >
            <TreeWrapper>
              <TreeMenu
                data={data.categories}
                onClick={onCategoryClick}
                active={selectedQueries}
              />
            </TreeWrapper>
          </Scrollbars>
        </Sticky>
      </SidebarWrapper> */}
    </CategoryWrapper>
  );
};

export default SidebarCategory;
