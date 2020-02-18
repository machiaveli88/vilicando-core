import * as React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { SpinProps } from 'antd/lib/spin';
import useFela from '../useFela';
import 'antd/lib/spin/style/index.less';

export interface ISpinner extends SpinProps {
  children?: React.ReactNode;
}

function Spinner({ children, className, ...rest }: ISpinner) {
  const { css } = useFela();

  return (
    <Spin
      indicator={<LoadingOutlined />}
      size="large"
      {...rest}
      wrapperClassName={css({ height: '100%' }, className)}
      className={css({ maxHeight: 'inherit !important' })}
    >
      {children}
    </Spin>
  );
}

export default Spinner;
