import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import callApi from '../utils/apiCaller';

class TaskDetailPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			status: false
		};
	}

	componentDidMount() {
		var { match } = this.props;
		console.log(match);
		if(match) {
			var id = parseInt(match.params.id);
			callApi(`tasks_todo_list_01/${id}`, 'GET', null).then((res) => {
				this.setState({
					id: res.data.id,
					name: res.data.name,
					status: res.data.status
				});
			});
		}
	}

	render() {
		var statusClass = (this.state.status ? "label label-danger" : "label label-info");
		var statusName = this.state.status ? "Kích hoạt" : "Ẩn";
		return (
			<div className="section">
				<div className="container">
					<h1 className="text-center mb-15">{this.state.name}</h1>
					<p className="text-center mb-15">Trạng thái: <span className={statusClass}>{statusName}</span></p>
					<p className="text-center mb-15">
						<Link to='/task-list' className="btn btn-default">Quay lại danh sách</Link>
					</p>
				</div>
			</div>
		);
	}
}

export default TaskDetailPage;
