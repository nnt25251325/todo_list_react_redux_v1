import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskItem from '../components/TaskItem';
import TaskSearchControl from '../components/TaskSearchControl';
import TaskSortControl from '../components/TaskSortControl';
import {	actFetchTasksRequest,
					actDeleteTaskRequest,
					actUpdateStatusTaskRequest,
					actFilterTableTask,
					actSearchTask,
					actSortTask } from '../actions/index';

class TaskListPage extends Component {

	componentDidMount() {
		this.props.fetchAllTasks();
	}

	onDelete = (id) => {
		this.props.onDeleteTask(id);
	}

	onUpdateStatus = (task) => {
		this.props.onUpdateStatusTask(task);
	}

	onFilterTable = (filter) => {
		this.props.onFilterTableTask(filter);
	}

	onSearch = (keyword) => {
		this.props.onSearchTask(keyword);
	}

	onSort = (sort) => {
		this.props.onSortTask(sort);
	}

	render() {
		var { tasks, filterTable, keyword, sort } = this.props;
		// console.log(tasks);

		// Lọc Dữ Liệu Trên Table
		if(filterTable.name) { // Lọc theo tên
			tasks = tasks.filter((task) => {
				return task.name.toLowerCase().indexOf(filterTable.name) !== -1
			});
		}

		tasks = tasks.filter((task) => { // Lọc theo trạng thái
			if(filterTable.status === -1) { // -1 tương ứng Tất cả
				return tasks;
			} else { // 0 hoặc 1 tương ứng với Ẩn hoặc Kích hoạt
				return task.status === (filterTable.status === 1 ? true : false);
			}
		});

		// Tìm kiếm
		if(keyword) {
			tasks = tasks.filter((task) => {
				return task.name.toLowerCase().indexOf(keyword) !== -1
			});
		}

		// Sắp xếp
		if(sort.by === 'name') {
			tasks.sort((a, b) => {
				if(a.name > b.name) return sort.value;
				else if(a.name < b.name) return -sort.value;
				else return 0;
			});
		} else {
			tasks.sort((a, b) => {
				if(a.status > b.status) return -sort.value;
				else if(a.status < b.status) return sort.value;
				else return 0;
			});
		}

		return (
			<div className="section">
				<div className="container">
					<Link to='/task/add' className="btn btn-primary mb-15">Thêm công việc</Link>
					<div className="box-task-control mb-15">
						<div className="row">
							<TaskSearchControl onSearch={ this.onSearch } />
							<TaskSortControl onSort={ this.onSort } sort={ this.props.sort } />
						</div>
					</div>
					<TaskList onFilterTable={ this.onFilterTable } >
						{ this.showTasks(tasks) }
					</TaskList>
				</div>
			</div>
		);
	}

	showTasks = (tasks) => {
		var result = null;
		if(tasks.length > 0) {
			result = tasks.map((task, index) => {
				return (
					<TaskItem
						key={index}
						task={task}
						index={index} //từng dòng có thứ tự nên phải truyền thêm index
						onDelete={this.onDelete}
						onUpdateStatus={this.onUpdateStatus}
					/>
				);
			});
		}
		return result;
	}
}

TaskListPage.propTypes = {
	tasks: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			status: PropTypes.bool.isRequired
		})
	).isRequired,
	fetchAllTasks: PropTypes.func.isRequired,
	onDeleteTask: PropTypes.func.isRequired,
	onUpdateStatusTask: PropTypes.func.isRequired,
	onFilterTableTask: PropTypes.func.isRequired,
	onSearchTask: PropTypes.func.isRequired,
	onSortTask: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		tasks: state.tasks,
		filterTable: state.filterTable,
		keyword: state.search,
		sort: state.sort
	};
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchAllTasks: () => {
			dispatch(actFetchTasksRequest());
		},
		onDeleteTask: (id) => {
			dispatch(actDeleteTaskRequest(id));
		},
		onUpdateStatusTask: (task) => {
			dispatch(actUpdateStatusTaskRequest(task));
		},
		onFilterTableTask: (filter) => {
			dispatch(actFilterTableTask(filter));
		},
		onSearchTask: (keyword) => {
			dispatch(actSearchTask(keyword));
		},
		onSortTask: (sort) => {
			dispatch(actSortTask(sort));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskListPage);
