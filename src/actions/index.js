import * as Types from '../constants/ActionTypes';
import callApi from '../utils/apiCaller';

export const actFetchTasksRequest = () => {
	return (dispatch) => {
		return callApi('tasks', 'GET', null).then((res) => {
			dispatch(actFetchTasks(res.data));
		});
	};
}

export const actFetchTasks = (tasks) => {
	return {
		type: Types.FETCH_TASKS,
		tasks
	}
}

export const actAddTaskRequest = (task) => {
	return (dispatch) => {
		return callApi('tasks', 'POST', task).then((res) => {
			dispatch(actAddTask(res.data));
		});
	};
}

export const actAddTask = (task) => {
	return {
		type: Types.ADD_TASK,
		task
	}
}

//Khi nhấn vào nút Sửa, sẽ đi đến trang sửa, là trang TaskActionPage.
//Dữ liệu sẽ được nạp vào trang này nhờ 2 hàm: actGetTaskRequest và actGetTask
//Nạp như sau:
//	+Gọi lên server dựa vào id lấy trên url (match.params.id)
//	+Sau đó server trả về response, res.data chính là task có id tương ứng
//	+Sau đó dispatch action actGetTask để lưu vào store
export const actGetTaskRequest = (id) => {
	return (dispatch) => {
		return callApi(`tasks/${id}`, 'GET', null).then((res) => {
			dispatch(actGetTask(res.data));
		});
	};
}

//Hàm này lấy task trên store (ko phải lấy trong server)
export const actGetTask = (task) => {
	return {
		type: Types.EDIT_TASK,
		task
	}
}

//Khi nhấn nút Lưu lại ở trang TaskActionPage
//Hai hàm actUpdateTaskRequest và actUpdateTask sẽ gửi giá trị đã sửa trong form lên server
//Đồng thời sẽ đưa giá trị đó vào lại store
export const actUpdateTaskRequest = (task) => {
	return (dispatch) => {
		return callApi(`tasks/${task.id}`, 'PUT', task).then((res) => {
			dispatch(actUpdateTask(res.data));
		});
	};
}

export const actUpdateTask = (task) => {
	return {
		type: Types.UPDATE_TASK,
		task
	}
}

export const actDeleteTaskRequest = (id) => {
	return (dispatch) => {
		return callApi(`tasks/${id}`, 'DELETE', null).then((res) => {
			dispatch(actDeleteTask(id));
		});
	};
}

export const actDeleteTask = (id) => {
	return {
		type: Types.DELETE_TASK,
		id
	}
}

export const actUpdateStatusTaskRequest = (task) => {
	return (dispatch) => {
		task.status = !task.status;
		return callApi(`tasks/${task.id}`, 'PUT', task).then((res) => {
			dispatch(actUpdateTask(res.data));
		});
	};
}

export const actFilterTableTask = (filter) => {
	return {
		type: Types.FILTER_TABLE,
		filter //filter: filter => filterName, filterStatus
	}
}

export const actSearchTask = (keyword) => {
	return {
		type: Types.SEARCH,
		keyword
	}
}

export const actSortTask = (sort) => {
	return {
		type: Types.SORT,
		sort //sort: sort => sort.by, sort.value
	}
}
