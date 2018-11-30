import React from 'react';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import TaskListPage from './pages/TaskListPage';
import TaskActionPage from './pages/TaskActionPage';
import TaskDetailPage from './pages/TaskDetailPage';

const routes = [
	{
		path: '/',
		exact: true,
		main: () => <HomePage />
	},
	{
		path: '/task-list',
		exact: false,
		main: () => <TaskListPage />
	},
	{
		path: '/task/add',
		exact: false,
		main: ({history}) => <TaskActionPage history={history} />
	},
	{
		path: '/task/:id/edit',
		exact: false,
		main: ({match, history}) => <TaskActionPage match={match} history={history} />
	},
	{
		path: '/task-detail/:slug.:id',
		exact: false,
		main: ({match}) => <TaskDetailPage match={match} />
	},
	{
		path: '',
		exact: false,
		main: () => <NotFoundPage />
	}
];

export default routes;
