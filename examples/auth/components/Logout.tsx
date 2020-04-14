import React from "react";
import { useAuth } from "vilicando-hasura";
import Button from "./Button";
import { useRouter } from "vilicando-core";

export default function Logout() {
  const { logout } = useAuth();
  const { push } = useRouter();

  const onClick = React.useCallback((e: React.FormEvent) => {
    e.preventDefault();

    logout().then(() => {
      console.log("Successfully logged out!");
      push("/");
    });
  }, []);

  return <Button onClick={onClick}>Logout</Button>;
}
