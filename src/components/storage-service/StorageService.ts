import { TContact } from "../../eWayAPI/ContactsResponse";


class StorageService {

  private usersKey: string = 'searchedUsers';

  public saveUser(val: TContact) {
    const existing = this.loadUsers();
    if (existing.includes(val.Email1Address)) return;

    localStorage.setItem(this.usersKey, JSON.stringify([...existing, val.Email1Address]));
  }

  public loadUsers(): string[] {
    const usersString = localStorage.getItem(this.usersKey);
    if (!usersString)
      return [];
    else {
      const ret = JSON.parse(usersString) as string[];
      return ret ?? [];
    }
  }

}

const storage = new StorageService();
export default storage;
