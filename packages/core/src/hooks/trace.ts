import React from 'react';

export default function useTraceChanges<T extends {}>(p: T) {
  const prev = React.useRef<T>(p);

  React.useEffect(() => {
    const changedProps = Object.entries(p).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) ps[k] = [prev.current[k], v];

      return ps;
    }, {});

    if (Object.keys(changedProps).length > 0)
      console.info('Changed props:', changedProps);

    prev.current = p;
  }, [p]);
}
