import type { Schema, Struct } from '@strapi/strapi';

export interface SharedBirthdayBurst extends Struct.ComponentSchema {
  collectionName: 'components_shared_birthday_bursts';
  info: {
    description: '';
    displayName: 'bursts';
  };
  attributes: {
    description: Schema.Attribute.Text;
    isBirthBurst: Schema.Attribute.Boolean;
    sliderImage: Schema.Attribute.Component<'shared.image-slider', true>;
    title: Schema.Attribute.String;
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
    types: Schema.Attribute.Enumeration<['quickLinks', 'footerLinks']>;
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
      'shared.birthday-burst': SharedBirthdayBurst;
      'shared.image-slider': SharedImageSlider;
      'shared.links': SharedLinks;
      'shared.seo': SharedSeo;
      'shared.text-editor': SharedTextEditor;
    }
  }
}
