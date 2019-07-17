import * as React from 'react';
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Select,
  Slider,
  Switch
  } from 'antd';
import { useFela } from 'vilicando-core';
import { useLanguage } from 'vilicando-core';
// import Logo from '@assets/virtual-reality.svg'; todo: @asset geht aber @asset/... nicht!

const FormItem = Form.Item;
const Option = Select.Option;

function StartPage() {
  const { css, theme } = useFela();
  const translate = useLanguage();

  return (
    <Form layout="horizontal">
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
          className={css({ color: theme['primary-color'] })}
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
    </Form>
  );
}

export default StartPage;
