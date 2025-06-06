import type { Schema, Struct } from '@strapi/strapi';

export interface HolidayCalendarHolidayCalendar extends Struct.ComponentSchema {
  collectionName: 'components_holiday_calendar_holiday_calendars';
  info: {
    description: '';
    displayName: 'HolidayCalendar';
  };
  attributes: {
    description: Schema.Attribute.String;
    holiday: Schema.Attribute.Component<'shared.holiday', true>;
    holidayPosition: Schema.Attribute.Enumeration<['Right', 'Left']>;
    image: Schema.Attribute.Media<'images'>;
    regionalLocation: Schema.Attribute.Relation<
      'oneToOne',
      'api::workplace-regional-location.workplace-regional-location'
    >;
  };
}

export interface HolidayCalendarHolidayCalendarList
  extends Struct.ComponentSchema {
  collectionName: 'components_holiday_calendar_holiday_calendar_lists';
  info: {
    description: '';
    displayName: 'HolidayCalendarList';
  };
  attributes: {
    items: Schema.Attribute.Component<
      'holiday-calendar.holiday-calendar',
      true
    >;
  };
}

export interface LayoutMenuGroup extends Struct.ComponentSchema {
  collectionName: 'components_layout_menu_groups';
  info: {
    displayName: 'menuGroup';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.links', true>;
    titleField: Schema.Attribute.String;
  };
}

export interface PageBreadcrumb extends Struct.ComponentSchema {
  collectionName: 'components_page_breadcrumbs';
  info: {
    displayName: 'Breadcrumb';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface PageGoogleSheet extends Struct.ComponentSchema {
  collectionName: 'components_page_google_sheets';
  info: {
    description: '';
    displayName: 'googleSheet';
  };
  attributes: {
    googleSheetLink: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PageSortingOptionSelector extends Struct.ComponentSchema {
  collectionName: 'components_page_sorting_option_selectors';
  info: {
    displayName: 'sortingOptionSelector';
    icon: 'arrowUp';
  };
  attributes: {
    componentName: Schema.Attribute.Enumeration<
      ['AccordionList', 'HolidayCalendarList']
    >;
    enableLocationSorting: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    sortingLocationType: Schema.Attribute.Enumeration<
      ['regionalLocation', 'globalLocation']
    >;
  };
}

export interface SharedAccordian extends Struct.ComponentSchema {
  collectionName: 'components_shared_accordians';
  info: {
    description: '';
    displayName: 'Accordion';
    icon: 'bulletList';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    globalLocation: Schema.Attribute.Relation<
      'oneToOne',
      'api::workplace-global-location.workplace-global-location'
    >;
    title: Schema.Attribute.String;
  };
}

export interface SharedAccordionList extends Struct.ComponentSchema {
  collectionName: 'components_shared_accordion_lists';
  info: {
    displayName: 'AccordionList';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.accordian', true>;
  };
}

export interface SharedFooter extends Struct.ComponentSchema {
  collectionName: 'components_shared_footers';
  info: {
    displayName: 'footer';
  };
  attributes: {
    footerLinks: Schema.Attribute.Component<'shared.links', true>;
    footerTitle: Schema.Attribute.String;
  };
}

export interface SharedHeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_headers';
  info: {
    description: '';
    displayName: 'header';
  };
  attributes: {
    businessGuidelines: Schema.Attribute.Component<
      'shared.header-content',
      true
    >;
    employeeResources: Schema.Attribute.Component<
      'shared.header-content',
      true
    >;
    headerTitle: Schema.Attribute.String;
    news: Schema.Attribute.Component<'shared.header-content', true>;
  };
}

export interface SharedHeaderContent extends Struct.ComponentSchema {
  collectionName: 'components_shared_header_contents';
  info: {
    displayName: 'headerContent';
  };
  attributes: {
    content: Schema.Attribute.String;
  };
}

export interface SharedHoliday extends Struct.ComponentSchema {
  collectionName: 'components_shared_holidays';
  info: {
    displayName: 'holiday';
  };
  attributes: {
    date: Schema.Attribute.Date;
    holidayName: Schema.Attribute.String;
  };
}

export interface SharedImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_images';
  info: {
    description: '';
    displayName: 'Image';
    icon: 'cog';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    mobileViewImage: Schema.Attribute.Media<'images'>;
    redirectionUrl: Schema.Attribute.String;
  };
}

export interface SharedImageSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_image_sliders';
  info: {
    description: '';
    displayName: 'ImageSlider';
  };
  attributes: {
    sliderImages: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedLinks extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: '';
    displayName: 'Links';
  };
  attributes: {
    hoverImage: Schema.Attribute.Media<'images'>;
    image: Schema.Attribute.Media<'images', true>;
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
    types: Schema.Attribute.Enumeration<
      ['actionLinks', 'quickLinks', 'portalLinks', 'footerLinks', 'basic']
    >;
  };
}

export interface SharedMainPageOverview extends Struct.ComponentSchema {
  collectionName: 'components_shared_main_page_overviews';
  info: {
    description: '';
    displayName: 'MainPageOverview';
    icon: 'chartBubble';
  };
  attributes: {
    description: Schema.Attribute.Component<'shared.text-editor', false>;
    image: Schema.Attribute.Media<'images', true>;
    subPages: Schema.Attribute.Component<'shared.links', true>;
  };
}

export interface SharedPageBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_page_banners';
  info: {
    description: '';
    displayName: 'PageBanner';
    icon: 'archive';
  };
  attributes: {
    bannerBgImage: Schema.Attribute.Media<'images'>;
    bannerBgImageMobile: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.Component<'shared.text-editor', false>;
    image: Schema.Attribute.Media<'images'>;
    position: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['homePage', 'mainPages', 'subPages']>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedTextEditor extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_editors';
  info: {
    description: '';
    displayName: 'DocumentEditor';
    icon: 'bulletList';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface StreamCompanyPolicy extends Struct.ComponentSchema {
  collectionName: 'components_stream_company_policies';
  info: {
    description: '';
    displayName: 'CompanyPolicy';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String;
  };
}

export interface StreamStreamCard extends Struct.ComponentSchema {
  collectionName: 'components_stream_stream_cards';
  info: {
    description: '';
    displayName: 'StreamCard';
  };
  attributes: {
    background: Schema.Attribute.Boolean;
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface StreamStreamCardGrid extends Struct.ComponentSchema {
  collectionName: 'components_stream_stream_card_grids';
  info: {
    displayName: 'StreamCardGrid';
    icon: 'apps';
  };
  attributes: {
    contents: Schema.Attribute.Component<'stream.stream-card', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'holiday-calendar.holiday-calendar': HolidayCalendarHolidayCalendar;
      'holiday-calendar.holiday-calendar-list': HolidayCalendarHolidayCalendarList;
      'layout.menu-group': LayoutMenuGroup;
      'page.breadcrumb': PageBreadcrumb;
      'page.google-sheet': PageGoogleSheet;
      'page.sorting-option-selector': PageSortingOptionSelector;
      'shared.accordian': SharedAccordian;
      'shared.accordion-list': SharedAccordionList;
      'shared.footer': SharedFooter;
      'shared.header': SharedHeader;
      'shared.header-content': SharedHeaderContent;
      'shared.holiday': SharedHoliday;
      'shared.image': SharedImage;
      'shared.image-slider': SharedImageSlider;
      'shared.links': SharedLinks;
      'shared.main-page-overview': SharedMainPageOverview;
      'shared.page-banner': SharedPageBanner;
      'shared.seo': SharedSeo;
      'shared.text-editor': SharedTextEditor;
      'stream.company-policy': StreamCompanyPolicy;
      'stream.stream-card': StreamStreamCard;
      'stream.stream-card-grid': StreamStreamCardGrid;
    }
  }
}
