import {TId} from 'typescript/types';

export interface IPhoto {
  id: TId;
  date_taken: string;
  ownerName: string;
  title: string;
  description: string;
  getUri: (sizePx: number, extension?: string) => string;
}
