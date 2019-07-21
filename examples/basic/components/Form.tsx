import * as React from 'react';
import {
  Button,
  DatePicker,
  Form as AntdForm,
  InputNumber,
  Select,
  Slider,
  Switch
} from 'antd';
import { useFela } from 'vilicando-core';
import { useLanguage } from 'vilicando-core';

const FormItem = AntdForm.Item;
const Option = Select.Option;

function Form() {
  const { css, theme } = useFela();
  const translate = useLanguage();

  return (
    <AntdForm layout="horizontal">
      <FormItem
        label="Input Number"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
      >
        <InputNumber
          size="large"
          min={1}
          max={10}
          style={{ width: 100 }}
          defaultValue={3}
          name="inputNumber"
          className={css({ color: theme.primaryColor })}
        />
        <a href="#">Link</a>
      </FormItem>

      <FormItem
        label={translate('DUPLICATE')}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
      >
        <Switch defaultChecked />
      </FormItem>

      <FormItem label="Slider" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <Slider defaultValue={70} />
      </FormItem>

      <FormItem label="Select" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <Select size="large" defaultValue="lucy" style={{ width: 192 }}>
          <Option value="jack">jack</Option>
          <Option value="lucy">lucy</Option>
          <Option value="disabled" disabled>
            disabled
          </Option>
          <Option value="yiminghe">yiminghe</Option>
        </Select>
      </FormItem>

      <FormItem
        label="DatePicker"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
      >
        <DatePicker name="startDate" />
      </FormItem>
      <FormItem style={{ marginTop: 48 }} wrapperCol={{ span: 8, offset: 8 }}>
        <Button size="large" type="primary" htmlType="submit">
          OK
        </Button>
        <Button size="large" style={{ marginLeft: 8 }}>
          Cancel
        </Button>
      </FormItem>
    </AntdForm>
  );
}

export default Form;
