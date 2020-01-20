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
  const { title: _title } = useConfig();

  return (
    <>
      {(!!title || !!meta) && (
        <Title meta={meta}>{_title ? `${_title} - ${title}` : title}</Title>
      )}
      {className ? <div className={className}>{children}</div> : children}
    </>
  );
}

export default Page;
