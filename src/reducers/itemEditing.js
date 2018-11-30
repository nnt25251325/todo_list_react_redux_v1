import * as Types from '../constants/ActionTypes';

var initialState = {};

const itemEditing = (state = initialState, action) => {
	switch(action.type) {
		//Lưu công việc đang chỉnh sửa lên store, tên state là itemEditing
		case Types.EDIT_TASK:
			return action.task;

		default:
			return state;
	}
};

export default itemEditing;
