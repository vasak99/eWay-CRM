import { useCallback, useEffect, useState } from "react";
import storage from "../storage-service/StorageService";
import './userlist.css';
import UserLoaderDialog from "../user-loader-dialog/UserLoaderDialog";

export default function UserList() {
  const [users, setUsers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const onSelect = useCallback((value: string) => {
    setSelected(value);
    setDialogOpen(true);
  }, []);

  useEffect(() => {
    setUsers(storage.loadUsers());
  }, []);

  return (
    <>
      <div className="users-container">
        {users.map(user => <div key={user} onClick={() => onSelect(user)} className="user-item">{user}</div>)}
      </div>
      <UserLoaderDialog isOpen={dialogOpen} onDismiss={() => setDialogOpen(false)} email={selected} />
    </>
  );
}
