import * as React from 'react';

function StartPage() {
  console.log('App runs on port ' + process.env.PORT);
  return <h1>Hello World</h1>;
}

export default StartPage;
