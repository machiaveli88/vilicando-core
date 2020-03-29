import React from "react";
import { useForm, notify } from "vilicando-core";
import { Form, Input, Button } from "antd";

function StartPage() {
  const [loading, setLoading] = React.useState(false);

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(
    { email: "", password: "", password2: "" },
    value => {
      setLoading(true);
      notify(
        Object.keys(value)
          .map(key => `${key}: ${value[key]}`)
          .join(", ")
      );
      console.log("results", value);
      setTimeout(() => setLoading(false), 250);
    },
    {
      email: (errors, value) => {
        if (
          !value.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        )
          errors.push({ message: "Not a valid E-Mail" });
      },
      password: (errors, value) => {
        if (value.length < 8)
          errors.push({ message: "Minimum length 8 characters" });
      },
      password2: (errors, value, values) => {
        if (values.password !== value)
          errors.push({ message: "Must be same as password" });
      }
    }
  );

  return (
    <>
      <h1>Registration</h1>
      <Form layout="vertical">
        <Form.Item
          label="Email"
          help={errors.email[0] && errors.email[0].message}
          validateStatus={!!errors.email[0] && "error"}
        >
          <Input
            placeholder="john@doe.com"
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          help={errors.password[0] && errors.password[0].message}
          validateStatus={!!errors.password[0] && "error"}
        >
          <Input
            placeholder="1234"
            type="password"
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
          />
        </Form.Item>
        <Form.Item
          label="Repeat Password"
          help={errors.password2[0] && errors.password2[0].message}
          validateStatus={!!errors.password2[0] && "error"}
        >
          <Input
            placeholder="1234"
            type="password"
            onChange={handleChange("password2")}
            onBlur={handleBlur("password2")}
            value={values.password2}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            disabled={!values.email || !values.password}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default StartPage;
