import React from 'react';
import { Title } from '../next';
import { useConfig } from '../AppProvider';

interface IPage {
  children?: React.ReactNode | Array<React.ReactNode>;
  className?: string;
  title?: string;
  meta?: React.ReactNode;
}

function Page({ children, className, title, meta }: IPage) {
  const { name } = useConfig();

  return (
    <>
      {(!!title || !!meta) && (
        <Title meta={meta}>{name ? `${name} - ${title}` : title}</Title>
      )}
      {className ? <div className={className}>{children}</div> : children}
    </>
  );
}

export default Page;
