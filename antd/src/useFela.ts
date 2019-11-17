import { useFela as defaultUseFela, IUseFela } from 'vilicando-core';
import { IAntdTheme } from './types';

export default function useFela(): IUseFela<IAntdTheme> {
  return defaultUseFela<IAntdTheme>();
}
