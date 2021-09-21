export interface Apod {
  concepts: Concepts;
  date: Date;
  explanation: string;
  hdurl: string;
  media_type: MediaType;
  service_version: ServiceVersion;
  title: string;
  url: string;
  copyright?: string;
  thumbnail_url: string;
}

export interface thumbnailURL {
  height: number;
  provider_url: string;
  type: string;
  html: string;
  author_name: string;
  author_url: string;
  thumbnail_url: string;
  title: string;
  width: number;
  thumbnail_width: number;
  provider_name: string;
  thumbnail_height: number;
  version: string;
  url: string;
}

export interface rawThumbnailURL {
  data: thumbnailURL;
}

export enum Concepts {
  ConceptTagsFunctionalityTurnedOffInCurrentService = 'concept_tags functionality turned off in current service',
}

export enum MediaType {
  Image = 'image',
  Video = 'video',
}

export enum ServiceVersion {
  V1 = 'v1',
}

export interface ApodData {
  data: Apod[];
}

export enum displayOption {
  Recent = 'Most Recent',
  Oldest = 'Oldest',
  Random = 'Random',
}
