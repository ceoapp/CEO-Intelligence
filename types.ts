export interface ArticleData {
  markdown: string;
  sources: Array<{
    title: string;
    url: string;
  }>;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}