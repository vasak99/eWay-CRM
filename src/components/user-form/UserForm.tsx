import { PrimaryButton, TextField } from "@fluentui/react";
import './userform.css';
import { FormEvent, useCallback, useState } from "react";
import UserLoaderDialog from "../user-loader-dialog/UserLoaderDialog";

export interface UserFormProps {
  callback: (value: string) => void;
}

function validateEmail(value: string) {
  const validator = /^[\w\d\.]+@\w+\.\w+$/;
  return validator.test(value) ? '' : 'Wrong email format';
}

export default function UserForm() {
  const [email, setEmail] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState('');

  const onDismiss = useCallback(() => {
    setDialogOpen(false);
    setEmail('');
  }, []);

  const formSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    if (!error)
      setDialogOpen(true);
  }, [error]);

  return (<>
    <form onSubmit={event => formSubmit(event)}>
      <TextField value={email} onChange={(_, val) => { setEmail(val!); setError(validateEmail(val!)); }} errorMessage={error} label="Enter email:" />

      <PrimaryButton type="submit">Submit</PrimaryButton>
    </form >
    <UserLoaderDialog isOpen={dialogOpen} onDismiss={onDismiss} email={email} />
  </>
  );
}
