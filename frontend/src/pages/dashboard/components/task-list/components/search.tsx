import debounce from 'lodash/debounce';
import { ChangeEvent, useCallback, useContext, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import TaskContext from '../../../../../context/task';
import { getTaskList as getTaskListService } from '../../../../../services';

const Search = () => {
  const [value, setValue] = useState('');
  const { task, setTask } = useContext(TaskContext);

  const getTaskListFiltered = useCallback(
    debounce(async (searchValue: string) => {
      const { currentPage, tasksPerPage } = task;
      setTask(prevState => ({ ...prevState, isLoading: true }));
      try {
        const { list } = await getTaskListService({
          search: searchValue,
          currentPage,
          tasksPerPage
        });
        setTask(prevState => ({ ...prevState, search: searchValue, list }));
      } catch (error) {
        if (import.meta.env.VITE_ENV === 'development')
          console.error('Error getting task list:', error);
      } finally {
        setTask(prevState => ({ ...prevState, isLoading: false }));
      }
    }, 300),
    []
  );

  const handleSearchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    getTaskListFiltered(newValue);
  };

  return (
    <form className="flex w-1/2 items-center border-b-2 border-lilac px-1">
      <input
        type="text"
        value={value}
        onChange={handleSearchOnChange}
        placeholder="Search for a task"
        className="w-[calc(100%_-_20px)] bg-transparent pr-1 text-xl placeholder:text-dark-gray focus:outline-none"
      />
      <FaSearch className="text-lilac" size={20} />
    </form>
  );
};

export default Search;
