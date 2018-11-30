import * as Types from  '../constants/ActionTypes';

var initialState = [];

var findIndex = (list, id) => {
	var result = -1;
	list.forEach((item, index) => {
		if(item.id === id) {
			result = index;
		}
	});
	return result;
}

var tasks = (state = initialState, action) => {
	var index = -1;
	var { id, task } = action;
	switch(action.type) {
		// //Hiển thị danh sách công việc
		case Types.FETCH_TASKS:
			state = action.tasks;
			console.log(state);
			return [...state];

		//Thêm công việc
		case Types.ADD_TASK:
			state.push(task);
			return [...state];

		//Cập nhật công việc
		case Types.UPDATE_TASK:
			index = findIndex(state, task.id);
			state[index] = task;
			return [...state];

		//Xoá công việc
		case Types.DELETE_TASK:
			index = findIndex(state, id);
			state.splice(index, 1);
			return [...state];

		default:
			return state;
	}
};

export default tasks;
