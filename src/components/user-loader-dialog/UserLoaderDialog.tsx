import { Dialog, DialogFooter, DialogType, mergeStyleSets, PrimaryButton, Spinner } from "@fluentui/react";
import UserCard, { DataStatus } from "../user-card/UserCard";
import { TContact, TContactsResopnse } from "../../eWayAPI/ContactsResponse";
import storage from "../storage-service/StorageService";
import { useCallback, useEffect, useState } from "react";
import connection from "../../eWayAPI/Connector";
import ErrorMessage from "../error/ErrorMessage";

export interface UserLoaderDialogProps {
  email: string;
  isOpen: boolean;
  onDismiss: () => void;
}

const dialogContentProps = {
  type: DialogType.normal,
  title: 'Agent Data',
  isDraggable: false
};

const modalProps = {
  isBlocking: true
};

const css = mergeStyleSets({
  loadingDiv: {
    width: '50vw',
    position: 'absolute',
    left: '25vw',
    top: '40vh'
  }
});

export default function UserLoaderDialog({ email, onDismiss, isOpen }: UserLoaderDialogProps) {
  const [contact, setContact] = useState<DataStatus<TContact> | null>(null);
  useEffect(() => {
    setContact({ type: 'loading' });
    connection.callMethod(
      'SearchContacts',
      {
        transmitObject: {
          Email1Address: email // ealbares@gmail.com, oliver@hotmail.com, michael.ostrosky@ostrosky.com, kati.rulapaugh@hotmail.com and many others
        },
        includeProfilePictures: true
      },
      (result: TContactsResopnse) => {
        if (result.Data.length !== 0) {
          setContact({ type: 'success', data: result.Data[0] });
          storage.saveUser(result.Data[0]);
        } else {
          setContact({ type: 'error', message: 'No user found' });
        }
      }
    );
  }, [setContact, email]);

  const onClose = useCallback(() => {
    setContact(null);
    onDismiss?.();
  }, [onDismiss]);

  return (
    <Dialog
      hidden={!isOpen}
      onDismiss={onClose}
      dialogContentProps={{ ...dialogContentProps }}
      modalProps={modalProps}
    >
      {contact?.type === 'success' ?
        <UserCard user={contact.data} /> :
        contact?.type === 'loading' ?
          <div className={css.loadingDiv}>
            <Spinner label="Loading user" />
          </div> : <ErrorMessage message={contact?.message ?? ''} />
      }
      <DialogFooter>
        <PrimaryButton onClick={onClose} text="OK" />
      </DialogFooter>
    </Dialog>
  );
}
