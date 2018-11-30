import { combineReducers } from 'redux';
import tasks from './tasks';
import itemEditing from './itemEditing';
import filterTable from './filterTable';
import search from './search';
import sort from './sort';

const appReducers = combineReducers({
	tasks,
	itemEditing,
	filterTable,
	search,
	sort
});

export default appReducers;
