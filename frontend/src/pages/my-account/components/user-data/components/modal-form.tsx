import formatLabel from '@helpers/format-label';
import { CreateUserFieldNames } from '@pages/login/components/flip-card/components/sign-up-card/components/sign-up-form';
import { RxCross2 } from 'react-icons/rx';
import { FieldKeys } from '..';
import DeleteUserForm from './components/delete-user-form';
import UpdateUserForm from './components/update-user-form';
import { MouseEvent } from 'react';

interface ModalFormProps {
  isOpen: boolean;
  fieldKey: FieldKeys | null;
  onClose: () => void;
}

export type UpdateUserFieldNames = CreateUserFieldNames | 'confirmationPassword';

const ModalForm = ({ isOpen, fieldKey, onClose }: ModalFormProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-75"
    >
      <div
        className="relative z-20 z-50 flex w-96 flex-col gap-12 bg-white p-10 shadow-lg"
        onClick={e => e.stopPropagation()} // Evita el cierre al hacer clic dentro del modal
      >
        <button
          onClick={onClose}
          className="text-gray-500 absolute right-3.5 top-3.5 hover:text-black"
        >
          <RxCross2 size={24} className="text-black" />
        </button>
        {fieldKey ? (
          <h2 className="text-xl font-bold">
            Enter the new{' '}
            {<span className="text-lilac">{formatLabel(fieldKey)}</span>} you
            want to change:
          </h2>
        ) : (
          <h2 className="text-xl font-bold">
            Are you sure you want to delete your user?
          </h2>
        )}
        {!fieldKey && (
          <p className="text-md">
            You will not be able to recover your user name and task records
            saved in your account once you delete your{' '}
            <span className="font-semibold text-lilac">SaveMyTask</span>{' '}
            account. <br />
            <br />
            If you want to continue with the deletion, proceed by completing the
            following entry with your password and click the{' '}
            <span className="bg-red px-1.5 py-1 text-sm font-semibold text-white">
              Delete User
            </span>{' '}
            button.
          </p>
        )}
        <div className="flex flex-col gap-3">
          {fieldKey ? (
            <UpdateUserForm {...{ fieldKey, onClose }} />
          ) : (
            <DeleteUserForm onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
