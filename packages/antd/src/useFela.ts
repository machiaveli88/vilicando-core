import { useFelaBase, ITheme } from 'vilicando-core';
import { IAntdTheme } from './types';

export default () => useFelaBase<IAntdTheme & ITheme>();
