import type { Schema, Struct } from '@strapi/strapi';

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

export interface SharedHolidayCalender extends Struct.ComponentSchema {
  collectionName: 'components_shared_holiday_calenders';
  info: {
    description: '';
    displayName: 'holidayCalender';
  };
  attributes: {
    description: Schema.Attribute.String;
    holiday: Schema.Attribute.Component<'shared.holiday', true>;
    holidayPosition: Schema.Attribute.Enumeration<['Right', 'Left']>;
    image: Schema.Attribute.Media<'images'>;
    location: Schema.Attribute.Enumeration<['Kerala', 'Chennai', 'Banglore']>;
  };
}

export interface SharedHomeEvents extends Struct.ComponentSchema {
  collectionName: 'components_shared_home_events';
  info: {
    displayName: 'homeEvents';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    viewAll: Schema.Attribute.String;
  };
}

export interface SharedImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_images';
  info: {
    displayName: 'Image';
    icon: 'cog';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
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
    image: Schema.Attribute.Media<'images', true>;
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
    types: Schema.Attribute.Enumeration<['quickLinks', 'footerLinks', 'basic']>;
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
    description: Schema.Attribute.Text;
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
    description: Schema.Attribute.Component<'shared.text-editor', false>;
    image: Schema.Attribute.Media<'images', true>;
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
          preset: 'default';
        }
      >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.holiday': SharedHoliday;
      'shared.holiday-calender': SharedHolidayCalender;
      'shared.home-events': SharedHomeEvents;
      'shared.image': SharedImage;
      'shared.image-slider': SharedImageSlider;
      'shared.links': SharedLinks;
      'shared.main-page-overview': SharedMainPageOverview;
      'shared.page-banner': SharedPageBanner;
      'shared.seo': SharedSeo;
      'shared.text-editor': SharedTextEditor;
    }
  }
}
