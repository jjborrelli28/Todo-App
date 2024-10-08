import { type ValidationError } from '@tanstack/react-form';
import clsx from 'clsx';

type ErrorMessageProps = {
  name: string;
  errors: ValidationError[];
};

const ErrorMessage = ({ name, errors }: ErrorMessageProps) => {
  return (
    <div
      className={clsx(
        'grid-rows-auto grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity]',
        errors.length && 'grid-rows-[1fr] opacity-100'
      )}
    >
      <div className="flex flex-col gap-2 overflow-hidden">
        <p className="pt-1 text-end text-xs text-red">
          Invalid{' '}
          {name === 'confirmationPassword'
            ? 'confirmation password'
            : name.toLowerCase().replace('_', ' ')}
        </p>
        <ul className="bg-gray-200 flex list-inside list-disc flex-col gap-1 p-2 text-xs italic">
          {errors.map((error, i) => (
            <li key={i}>
              <span className="-m-2">{error}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ErrorMessage;
