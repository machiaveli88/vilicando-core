import React from 'react';

type IError = { message: string };

export default function useForm<T>(
  initalValue: T,
  onSubmit: (value: T) => Promise<void> | void,
  onValidate?: {
    [key in keyof T]?: (errors: IError[], value: T[key], values: T) => void;
  }
) {
  const loading = React.useRef(false);
  const values = React.useRef(initalValue);
  const touched = React.useRef<{ [key in keyof T]?: boolean }>(undefined);
  const errors = React.useRef<{ [key in keyof T]?: IError[] }>(undefined);

  if (!errors.current) {
    errors.current = {};
    for (let k in initalValue) errors.current[k] = [];
  }

  if (!touched.current) {
    touched.current = {};
    for (let k in initalValue) touched.current[k] = false;
  }

  const [, setInputs] = React.useState<number>(0);
  const { handleSubmit, handleChange, handleBlur } = React.useMemo(() => {
    const changeHandlers: { [key in keyof T]?: (event: any) => void } = {};
    const blurHandlers: { [key in keyof T]?: (event: any) => void } = {};

    return {
      handleSubmit: (event?: any) => {
        if (event) event.preventDefault();

        const result = onSubmit(values.current);
        if (result && result.then) {
          result
            .then(() => {
              loading.current = false;
              setInputs(+new Date());
            })
            .catch(() => {
              loading.current = false;
              setInputs(+new Date());
            });
          loading.current = true;
          setInputs(+new Date());
        }
      },
      handleChange: function<T2>(
        field: keyof T,
        selector?: (event: T2) => any
      ): (e: T2) => void {
        if (!changeHandlers[field])
          changeHandlers[field] = function(event) {
            let value;
            if (selector) {
              value = selector(event);
            } else if (event && event.target) {
              value = event.target.value;
            } else {
              value = event;
            }
            values.current = { ...values.current, [field]: value };
            touched.current[field] = true;
            setInputs(+new Date());
          };

        return changeHandlers[field];
      },
      handleBlur: (field: keyof T) => {
        if (!blurHandlers[field])
          blurHandlers[field] = function() {
            const validator = onValidate && onValidate[field];
            if (validator) {
              const err: IError[] = [];
              validator(err, values.current[field], values.current);
              if (err.length) {
                errors.current = { ...errors.current, [field]: err };
                setInputs(+new Date());
              } else {
                errors.current = { ...errors.current, [field]: err };
                setInputs(+new Date());
              }
            }
          };

        return blurHandlers[field];
      }
    };
  }, [values]);

  return {
    handleSubmit,
    handleBlur,
    handleChange,
    values: values.current,
    errors: errors.current,
    touched: touched.current
  };
}
