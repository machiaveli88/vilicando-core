import * as React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import useFela from '../useFela';

interface ISpinner {
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

function Spinner({ children, className, loading }: ISpinner) {
  const { css } = useFela();

  return (
    <Spin
      spinning={loading}
      indicator={<LoadingOutlined spin />}
      tip="Lade Inhalt..."
      size="large"
      wrapperClassName={css({ height: '100%' }, className)}
      className={css({ maxHeight: 'inherit !important' })}
    >
      {children}
    </Spin>
  );
}

export default Spinner;
