import * as React from 'react';
import Spinner, { ISpinner } from './Spinner';
import { Drawer as AntdDrawer } from 'antd';
import { DrawerProps } from 'antd/lib/drawer';
import useFela from '../useFela';
import 'antd/lib/drawer/style/index.less';

interface IDrawer extends DrawerProps {
  children?: React.ReactNode;
  loading?: boolean;
  footer?: React.ReactNode | Array<React.ReactNode>;
}
interface IDrawerContent extends ISpinner {
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
              paddingLeft: theme.spacing.xl,
              paddingRight: 56,
              paddingY: theme.spacing.lg,
              '> .ant-drawer-title': {
                color: theme.primary.base,
                textTransform: 'uppercase',
                ellipsis: true
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
      {visible /* sorgt für unmount damit autoFocus immer funktioniert! */ &&
        React.Children.map(children, child =>
          React.isValidElement(child)
            ? React.cloneElement(child, { loading })
            : child
        )}
    </AntdDrawer>
  );
}

function DrawerContent({
  className,
  loading,
  spinning,
  ...rest
}: IDrawerContent) {
  const { css, theme } = useFela();

  return (
    <Spinner
      {...rest}
      spinning={loading || spinning || false}
      className={css(
        { flexGrow: 1, paddingX: theme.spacing.xl, paddingY: theme.spacing.lg },
        className
      )}
    />
  );
}

function DrawerFooter({ children }: IDrawerFooter) {
  const { css, theme } = useFela();

  return (
    <div
      className={css({
        boxShadow: theme.shadow[1].up,
        width: '100%',
        paddingX: theme.spacing.xl,
        paddingY: theme.spacing.md,
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
