import { Image } from "@fluentui/react";
import { TContact } from "../../eWayAPI/ContactsResponse";
import './usercard.css';

export type DataStatus<T> = { type: 'success'; data: T } | { type: 'error'; message: string } | { type: 'loading' };
interface UserCardProps {
  user: TContact;
}

export default function UserCard({ user }: UserCardProps) {

  return <div className="info-container">
    <Image alt="Couln't load image" src={"data:image/jpeg;base64," + user.ProfilePicture} />
    {getInfo(user).map(([title, value]) => <InfoRow key={title} title={title} value={value} />)}
  </div>;
}

function InfoRow({ title, value }: { title: string; value: string }) {
  return <div className="info-row">
    <span className="info-title">{title}:</span>
    <span>{value}</span>
  </div>;
}

function getInfo(val: TContact): [string, string][] {
  return [
    ["First name", val.FirstName],
    ["Last name", val.LastName],
    ["Email", val.Email1Address],
  ].filter(f => f[1]) as [string, string][];
}
