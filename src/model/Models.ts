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
