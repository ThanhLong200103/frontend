import api from '@/lib/api';
import { mutate } from 'swr';

export const fetcher = (url: string) =>
  api.get(url).then(res => res.data );