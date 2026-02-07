import { Label } from "@fluentui/react";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <div><Label>{message}</Label></div>;
}
