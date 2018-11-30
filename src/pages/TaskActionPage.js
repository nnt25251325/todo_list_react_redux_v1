import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { actAddTaskRequest, actGetTaskRequest, actUpdateTaskRequest } from '../actions/index';

class TaskActionPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			status: false
		};
	}

	//method này được thực thi khi 1 component được render trên client side
	//sau khi TaskActionPage render thì componentDidMount được gọi
	componentDidMount() {
		var { match } = this.props;
		if(match) {
			// console.log(match.params.id);
			var id = parseInt(match.params.id);
			this.props.onEditTask(id);
		}
	}

	//method này được thực thi ngay khi thuộc tính props được update và trước khi component được render lại.
	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		if(nextProps && nextProps.itemEditing) {
			var { itemEditing } = nextProps;
			this.setState({
				id: itemEditing.id,
				name: itemEditing.name,
				status: itemEditing.status
			});
		}
	}

	onHandleChange = (e) => {
		var target = e.target;
		var name = target.name;
		var value = (target.type === 'checkbox' ? target.checked : target.value);
		if(name === 'status') {
			value = (target.value === 'true' ? true : false);
		}
		this.setState({
			[name]: value
		});
	}

	onSave = (e) => {
		e.preventDefault();
		var { id, name, status } = this.state;
		var { history } = this.props;
		var task = {
			id: id,
			name: name,
			status: status
		};
		console.log(task);
		if(id) { //update
			this.props.onUpdateTask(task);
		} else { //add
			this.props.onAddTask(task);
		}
		history.goBack(); //Hoặc có thể dùng: history.push('/task-list');
	}

	render() {
		var { id, name, status } = this.state;
		return (
			<div className="section">
				<div className="container">
					<div className="row">
						<div className="col-xs-6 col-xs-push-3">
							<div className="panel panel-primary">
								<div className="panel-heading">
									<h3 className="panel-title text-center">
										{/*nếu form được gọi đến, sẽ kiểm tra id đã tồn tại hay rỗng*/}
										{id ? 'Cập Nhật Công Việc' : 'Thêm Công Việc'}
									</h3>
								</div>
								<div className="panel-body">
									<form onSubmit={this.onSave}>
										<div className="form-group">
											<label>Tên :</label>
											<input
												type="text"
												required="required"
												className="form-control"
												name="name"
												value={name}
												onChange={this.onHandleChange}
											/>
										</div>
										<div className="form-group">
											<label>Trạng Thái :</label>
											<select
												className="form-control"
												name="status"
												value={status}
												onChange={this.onHandleChange}
											>
												<option value={true}>Kích Hoạt</option>
												<option value={false}>Ẩn</option>
											</select>
										</div>
										<div className="form-group text-center">
											<button type="submit" className="btn btn-primary">
												<i className="fa fa-save mr-5"></i>Lưu Lại
											</button>
										</div>
									</form>
								</div>
							</div>
							<hr/>
							<p className="text-center">
								<Link to='/task-list' className="btn btn-default">Quay lại danh sách</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

TaskActionPage.propTypes = {
	onAddTask: PropTypes.func.isRequired,
	onEditTask: PropTypes.func.isRequired,
	onUpdateTask: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		itemEditing: state.itemEditing
	};
};

const mapDispatchToProps= (dispatch, props) => {
	return {
		onAddTask: (task) => {
			dispatch(actAddTaskRequest(task));
		},
		onEditTask: (id) => {
			dispatch(actGetTaskRequest(id));
		},
		onUpdateTask: (task) => {
			dispatch(actUpdateTaskRequest(task));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskActionPage);
