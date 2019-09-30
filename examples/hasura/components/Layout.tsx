import * as React from 'react';
import { useFela } from 'vilicando-core';
import { Row, Col } from 'antd';

interface ILayout {
  children: React.ReactElement;
}

function Layout({ children }: ILayout) {
  const { css, theme } = useFela();

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%'
      })}
    >
      <div
        className={css({
          backgroundColor: theme.primaryColor,
          padding: theme.paddingMd
        })}
      >
        <h2 className={css({ color: theme.white, margin: 0 })}>Example App</h2>
      </div>

      <Row type="flex" justify="center">
        <Col
          span={8}
          className={css({
            padding: theme.paddingMd
          })}
        >
          {children}
        </Col>
      </Row>
    </div>
  );
}

export default Layout;
