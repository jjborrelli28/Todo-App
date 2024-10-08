import { type FieldKeys } from '@/pages/my-account/components/user-data';
import { type DeleteUserField } from '@/pages/my-account/components/user-data/components/forms/delete-user';
import { type UpdateUserFieldNames } from '@/pages/my-account/components/user-data/components/modal-form';
import { type LoginFieldNames } from '@/pages/sing-in/components/sign-in-form';
import { type CreateUserFieldNames } from '@/pages/sing-up/components/sign-up-form';
import { type FieldApi, type Validator } from '@tanstack/react-form';
import clsx from 'clsx';
import { type HTMLInputTypeAttribute, useState } from 'react';
import { type ZodType, type ZodTypeDef } from 'zod';
import ErrorMessage from './components/error-message';
import EyeButton from './components/eye-button';
import Label from './components/label';
import { colors } from './constants';

export type InputStates =
  | 'initialState'
  | 'isHighlighted'
  | 'notValid'
  | 'isValid';

export type Fields<T extends string> = {
  name: T;
  type?: HTMLInputTypeAttribute;
}[];

type CreateUserFields = {
  username: string;
  password: string;
  email: string;
  full_name: string;
};

type LoginFields = {
  username: string;
  password: string;
};

type UpdateUserFields = Record<FieldKeys, string> & {
  confirmationPassword: string;
};

type FieldProps = {
  type?: HTMLInputTypeAttribute;
  data:
    | FieldApi<
        CreateUserFields,
        CreateUserFieldNames,
        Validator<unknown, ZodType<any, ZodTypeDef, any>>,
        Validator<CreateUserFields>,
        string
      >
    | FieldApi<
        LoginFields,
        LoginFieldNames,
        Validator<unknown, ZodType<any, ZodTypeDef, any>>,
        Validator<LoginFields>,
        string
      >
    | FieldApi<
        UpdateUserFields,
        UpdateUserFieldNames,
        Validator<unknown, ZodType<any, ZodTypeDef, any>>,
        Validator<UpdateUserFields>,
        string
      >
    | FieldApi<
        DeleteUserField,
        'password',
        Validator<unknown, ZodType<any, ZodTypeDef, any>>,
        Validator<DeleteUserField>,
        string
      >;
  requerid?: boolean;
  hasLabel?: boolean;
};

const Field = ({
  type = 'text',
  data,
  requerid,
  hasLabel = true
}: FieldProps) => {
  const [onFocus, setOnFocus] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const name = data.name;
  const { value } = data.state;
  const { isDirty, isTouched, errors } = data.state.meta;
  const isValid = isTouched && !errors.length;
  const inputState =
    onFocus && !isTouched
      ? 'isHighlighted'
      : !isValid && isDirty
        ? 'notValid'
        : isValid
          ? 'isValid'
          : 'initialState';

  const handleFocus = () => {
    setOnFocus(!onFocus);
  };

  const handleBlur = () => {
    data.handleBlur();
    setOnFocus(!onFocus);
  };

  return (
    <fieldset className="relative flex flex-col">
      {hasLabel && (
        <Label {...{ onFocus, value, isValid, inputState }}>{name}</Label>
      )}
      <div className="relative flex">
        <input
          id={name}
          type={
            type === 'password' ? (passwordIsVisible ? 'text' : type) : type
          }
          name={name}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={e => data.handleChange(e.target.value)}
          className={clsx(
            'z-10 flex-1 border-b bg-transparent pb-0.5 text-lg outline-none focus:ring-0',
            colors.borders[inputState]
          )}
          required={requerid}
        />
        {type === 'password' && (
          <EyeButton
            {...{ inputState, passwordIsVisible, setPasswordIsVisible }}
          />
        )}
      </div>
      <ErrorMessage {...{ name, errors }} />
    </fieldset>
  );
};

export default Field;
