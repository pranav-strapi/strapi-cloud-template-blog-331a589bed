import type { Schema, Struct } from '@strapi/strapi';

export interface SharedBookASeat extends Struct.ComponentSchema {
  collectionName: 'components_shared_book_a_seats';
  info: {
    description: '';
    displayName: 'links';
  };
  attributes: {
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
    types: Schema.Attribute.Enumeration<
      ['quickLinks', 'footerLinks', 'dropdownLinks', 'centerLinks']
    >;
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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.book-a-seat': SharedBookASeat;
      'shared.seo': SharedSeo;
    }
  }
}
