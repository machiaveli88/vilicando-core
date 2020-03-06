import React from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import { CheckboxProps } from 'antd/lib/checkbox';
// import 'antd/lib/checkbox/style/index.less';

interface ICheckbox extends Omit<CheckboxProps, 'onChange'> {
  value?: boolean;
  onChange?: (bool: boolean) => void;
}

function Checkbox({ value, onChange, ...props }: ICheckbox) {
  return (
    <AntdCheckbox
      checked={!!value}
      onChange={e => onChange(e.target.checked)}
      {...props}
    />
  );
}

export default Checkbox;
