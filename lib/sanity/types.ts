export interface Service {
  _id: string;
  title: string;
  description: string;
}

export interface SanityImage {
  asset: {
    _ref: string;
    url: string;
  };
  alt?: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  tag?: string;
  url?: string;
  previewImage?: SanityImage;
}

export interface ContactSettings {
  whatsappNumber: string;
}
