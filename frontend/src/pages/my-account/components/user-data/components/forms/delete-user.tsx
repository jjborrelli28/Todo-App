import Button from '@/components/button';
import Field from '@/components/field';
import SubmitMessage from '@/components/submit-message';
import { useAuthentication } from '@/context/authentication';
import useMutationUser from '@/hooks/use-mutation-user';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { updateUserSchema } from '@/validations/user';
import clsx from 'clsx';
import { useState } from 'react';

type DeleteUserForm = {
  onClose: () => void;
};

export type DeleteUserField = { password: string };

const DeleteUserForm = ({ onClose }: DeleteUserForm) => {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const { setIsAuthenticated } = useAuthentication();

  const { userDeletion } = useMutationUser({
    deletion: {
      onSuccess: async data => {
        data?.message && setSubmitMessage(data.message);
        setTimeout(() => {
          setIsAuthenticated(false);
          setSubmitMessage(null);
          reset();
          onClose();
        }, 4000);
      },
      onError: error => {
        setSubmitMessage(error.message);
      }
    }
  });

  const { isPending, isSuccess, isError, reset } = userDeletion;

  const defaultValues = {
    password: ''
  };

  const form = useForm({
    defaultValues,
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      userDeletion.mutate(value);
    }
  });

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-6"
      >
        <form.Field
          key="password"
          name="password"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: updateUserSchema.shape.confirmationPassword,
            onChangeAsyncDebounceMs: 300
          }}
          children={data => {
            return (
              <div>
                <label className="text-lg font-semibold">
                  Confirm with your password
                </label>
                <Field type="password" data={data} requerid hasLabel={false} />
              </div>
            );
          }}
        />

        <form.Subscribe
          selector={state => state}
          children={state => {
            const isSendeable = state.isValid && !!state.values.password;

            return (
              <div className="flex flex-col gap-y-2">
                <Button
                  isSendeable={isSendeable}
                  isLoading={isPending}
                  isError={isSuccess}
                  containerClassName={clsx(isSendeable && 'border-red')}
                  className={clsx(isSendeable && 'bg-red')}
                  textClassName={clsx(
                    isSendeable && !isSuccess && 'group-hover:!text-red'
                  )}
                  spinnerClassName={clsx(isSendeable && 'border-red')}
                >
                  {isSuccess ? 'Done' : `Delete User `}
                </Button>
                <SubmitMessage
                  type={isSuccess ? 'Success' : isError ? 'Error' : undefined}
                >
                  {submitMessage}
                </SubmitMessage>
              </div>
            );
          }}
        />
      </form>
    </>
  );
};

export default DeleteUserForm;
