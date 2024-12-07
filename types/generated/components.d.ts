import type { Schema, Struct } from '@strapi/strapi';

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
      'shared.links': SharedLinks;
      'shared.seo': SharedSeo;
      'shared.text-editor': SharedTextEditor;
    }
  }
}
