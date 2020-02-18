import * as React from 'react';
import Spinner from './Spinner';
import { Drawer as AntdDrawer } from 'antd';
import { DrawerProps } from 'antd/lib/drawer';
import useFela from '../useFela';

interface IDrawer extends DrawerProps {
  children?: React.ReactNode;
  loading?: boolean;
  footer?: React.ReactNode | Array<React.ReactNode>;
}
interface IDrawerContent {
  children?: React.ReactNode;
  loading?: boolean;
}
interface IDrawerFooter {
  children?: React.ReactNode;
}

function Drawer({ children, className, visible, loading, ...rest }: IDrawer) {
  const { css, theme } = useFela();

  return (
    <AntdDrawer
      placement="right"
      width={400}
      {...rest}
      visible={visible}
      className={css(
        {
          '> .ant-drawer-content-wrapper': {
            maxWidth: '100%',
            '& .ant-drawer-header': {
              border: 0,
              boxShadow: theme.shadow[2],
              height: theme.layout.header.height,
              '> .ant-drawer-title': {
                color: theme.primary.base,
                textTransform: 'uppercase',
                fontFamily: 'Comfortaa, cursive'
              }
            },
            '& .ant-drawer-body': {
              display: 'flex',
              flexDirection: 'column',
              padding: 0
            }
          }
        },
        className
      )}
    >
      {visible &&
        children /* sorgt für unmount damit autoFocus immer funktioniert! */}
    </AntdDrawer>
  );
}

function DrawerContent({ children, loading }: IDrawerContent) {
  const { css, theme } = useFela();

  return (
    <Spinner
      loading={loading}
      className={css({ flexGrow: 1, padding: theme.spacing.md })}
    >
      {children}
    </Spinner>
  );
}

function DrawerFooter({ children }: IDrawerFooter) {
  const { css, theme } = useFela();

  return (
    <div
      className={css({
        boxShadow: theme.shadow[1].up,
        width: '100%',
        paddingX: theme.spacing.md,
        paddingY: theme.spacing.sm,
        textAlign: 'right',
        '> button': {
          marginLeft: theme.spacing.xs
        }
      })}
    >
      {children}
    </div>
  );
}

Drawer.Content = DrawerContent;
Drawer.Footer = DrawerFooter;
export default Drawer;
