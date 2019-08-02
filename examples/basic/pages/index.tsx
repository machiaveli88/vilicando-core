import * as React from 'react';
import { Form } from '@components';

function StartPage() {
  console.log('Port:', process.env.PORT);

  return (
    <div>
      <h2>Antd-Form</h2>
      <Form />
    </div>
  );
}

export default StartPage;
