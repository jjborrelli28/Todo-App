import { TaskQueryParamsContextProvider } from '@/context/task-query-params';
import { MdDashboard } from 'react-icons/md';
import TaskCreatorForm from './components/task-creator-form';
import TaskLisk from './components/task-list';

const Dashboard = () => {
  return (
    <TaskQueryParamsContextProvider>
      <div className="flex min-h-screen-with-navbar flex-col gap-8 py-8 lg:gap-16 lg:pb-20 lg:pt-16">
        <h1 className="flex items-center gap-2 text-4xl font-bold">
          <MdDashboard />
          Dashboard
        </h1>
        <div className="grid h-full flex-1 grid-cols-1 grid-rows-[auto,_1fr] gap-8 pt-5 lg:grid-cols-2 lg:grid-rows-1 lg:gap-0 lg:pt-0">
          <TaskLisk />
          <TaskCreatorForm />
        </div>
      </div>
    </TaskQueryParamsContextProvider>
  );
};

export default Dashboard;
