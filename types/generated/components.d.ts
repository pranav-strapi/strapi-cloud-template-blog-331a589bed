import type { Schema, Struct } from '@strapi/strapi';

export interface SharedBookASeat extends Struct.ComponentSchema {
  collectionName: 'components_shared_book_a_seats';
  info: {
    description: '';
    displayName: 'homeLayout';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    footer: Schema.Attribute.Component<'shared.footer-link', true>;
    header: Schema.Attribute.String;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface SharedFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_links';
  info: {
    displayName: 'Footer Link';
  };
  attributes: {
    links: Schema.Attribute.String;
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
      'shared.footer-link': SharedFooterLink;
      'shared.seo': SharedSeo;
    }
  }
}
