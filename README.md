# vilicando-core

## Theme

Vilicando verwendet [fela](http://fela.js.org) für das theming und [antd](https://ant.design/) für die Standard-UI-Komponenten. Die Standard-Theming-Variablen richten sich daher auch nach den Antd-Variablen, welche [hier](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less) zu finden sind.

### Usage

Folgendes Beispiel zeigt das Einbinden der Theming-Funktionalitäten. Zuerst muss eine _theme.json_-Datei angelegt werden in der die Variablen definiert werden.

```json
// ./theme.json
{
  "primary-color": "#009688"
}
```

Diese Datei muss nun in Next importiert werden, damit das Styling der Antd-Komponenten angepasst werden kann:

```javascript
// ./next.config.js
const { withTheme } = require('vilicando-core/server');
const theme = require('./theme');

module.exports = withTheme(theme);
```

Des weiteren muss nun dem FelaProvider das _theme_ übergeben werden, damit die darunter liegenden Komponente auf das _theme_ zugreifen können.

```javascript
// ./pages/index.ts
import * as React from 'react';
import { FelaProvider } from 'vilicando-core/theme';
import theme from '../theme.json';
import Content from './content';

const renderer = createRenderer({});

function App() {
  return (
    <FelaProvider theme={theme} renderer={renderer}>
      <Content />
    </FelaProvider>
  );
}
export default App;
```

Sowohl _renderer_ als auch _theme_ sind vordefiniert und brauchen nur bei Bedarf, wie hier angegeben, überschrieben zu werden.

Auf die theming-Variablen können nun über das Hilfskonstrukt _useFela_ ([hook](https://reactjs.org/docs/hooks-intro.html)) zugegriffen werden.

```javascript
// ./pages/content.ts
import * as React from 'react';
import { useFela } from 'vilicando-core/theme';

function Content() {
  const [css, theme] = useFela();

  return <div className={css({ color: theme['red-6'] })}>red text</div>;
}
export default Content;
```

Um innerhalb der App für alle darunter liegende Komponenten das Theme zu ändern, kann auch der ThemeProvider verwendet werden:

```javascript
// ./pages/component.ts
import * as React from 'react';
import { ThemeProvider, useFela } from 'vilicando-core/theme';
import DeeperComponentsWithGreenColorAndBlueBorders from './deeper-components';

function Component() {
  const [css, theme] = useFela();
  const theme = {
    color: theme['green-6'],
    borderColor: 'blue'
  };

  return (
    <ThemeProvider value={theme}>
      <DeeperComponentsWithGreenColorAndBlueBorders />
    </ThemeProvider>
  );
}
export default Component;
```
