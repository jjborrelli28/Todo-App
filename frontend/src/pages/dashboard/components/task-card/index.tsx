import { changeTaskState, getStateTask } from '@helpers/task';
import useMutationTask from '@hooks/use-mutation-task';
import clsx from 'clsx';
import React, { type MouseEvent, useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { MdCircle } from 'react-icons/md';
import { type Task } from '../../../../types';
import Accordion from './components/accordion';

type TaskCardInputStates = {
  value: string;
  isEditing: boolean;
};

export type TaskCardAccordionStates = 'Opened' | 'Closed';

const TaskCard = React.memo(({ data }: { data: Task }) => {
  const [input, setInput] = useState<TaskCardInputStates>({
    value: data.title,
    isEditing: false
  });

  const { taskUpdate, taskDeletion } = useMutationTask();

  const { id, state, created_at, updated_at } = data;
  const { value, isEditing } = input;

  useEffect(() => {
    setInput(prevInput => ({
      ...prevInput,
      value: data.title
    }));
  }, [data.title]);

  const handleUpdate = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    const action = e.currentTarget.getAttribute('data-action');

    if (action === 'update-state') {
      const newState = changeTaskState(state);

      taskUpdate.mutate({
        id,
        taskData: { state: newState }
      });
    } else if (action === 'update-title') {
      setInput(prevInput => ({
        ...prevInput,
        isEditing: !prevInput.isEditing
      }));

      taskUpdate.mutate({
        id,
        taskData: { title: value }
      });
    }
  };

  const handleDelete = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    taskDeletion.mutate(id);
  };

  const [accordionState, setAccordionState] =
    useState<TaskCardAccordionStates>('Closed');

  const toggleAccordion = () =>
    setAccordionState(prevState =>
      prevState === 'Closed' ? 'Opened' : 'Closed'
    );

  return (
    <li
      className={clsx(
        'flex flex-col bg-gray p-3 shadow-md transition-[background,transform] duration-300 hover:scale-[1.01] hover:bg-light-gray',
        isEditing && 'animate-blink-background-gray'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-3">
          <button
            type="button"
            data-action="update-state"
            onClick={handleUpdate}
          >
            <MdCircle
              size={20}
              className={clsx(
                getStateTask(state, created_at, updated_at),
                'rounded-full border-2 shadow-md'
              )}
            />
          </button>
          <form className="text-overflow-ellipsis flex flex-1 gap-3">
            <input
              type="text"
              className={clsx(
                'w-[calc(100%_-_42px)] flex-1 overflow-hidden text-ellipsis bg-transparent text-xl outline-none focus:outline-none',
                state === 'Done' && 'line-through',
                isEditing && 'border-b-2 border-dark-gray'
              )}
              value={value}
              onChange={e =>
                setInput(prevInput => ({
                  ...prevInput,
                  value: e.target.value
                }))
              }
              disabled={!isEditing}
            />
            <button
              type="submit"
              data-action="update-title"
              onClick={handleUpdate}
              className="transition-[transform] duration-300 hover:scale-110"
            >
              <FaEdit
                size={22}
                className={clsx(
                  isEditing ? 'animate-blink-text-black' : 'text-black'
                )}
              />
            </button>
          </form>
        </div>
        <button
          type="button"
          onClick={toggleAccordion}
          className="transition-[transform] duration-300 hover:scale-110"
        >
          <IoIosArrowDropdownCircle
            type="button"
            size={22}
            className={clsx(
              'text-black',
              accordionState === 'Opened' && 'rotate-180'
            )}
          />
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="transition-[transform] duration-300 hover:scale-110"
        >
          <FaTrashAlt size={20} className="text-black" />
        </button>
      </div>
      <Accordion data={data} state={accordionState} />
    </li>
  );
});

export default TaskCard;
