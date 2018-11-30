import React, { Component } from 'react';

class TaskList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			filterName: '',
			filterStatus: -1
		}
	}

	onHangleChange = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.value === 'checkbox' ? target.checked : target.value;
		var filter = {
			name: (name === 'filterName' ? value : this.state.filterName),
			status: parseInt(name === 'filterStatus' ? value : this.state.filterStatus)
		};
		this.props.onFilterTable(filter);
		this.setState({
			[name]: value
		});
	}

	onClearfilterTable = () => {
		this.props.onFilterTable({
			name: '',
			status: -1
		});
		this.setState({
			filterName: '',
			filterStatus: -1
		});
	}

	render() {
		return (
			<div className="box-tbl">
				<table className="table table-bordered table-hover">
					<thead>
						<tr>
							<th className="text-center">STT</th>
							<th className="text-center">Tên</th>
							<th className="text-center">Trạng Thái</th>
							<th className="text-center">Hành Động</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td></td>
							<td>
								<input
									type="text"
									className="form-control"
									name="filterName"
									onChange={this.onHangleChange}
									value={this.state.filterName}
								/>
							</td>
							<td>
								<select
									className="form-control"
									name="filterStatus"
									onChange={this.onHangleChange}
									value={this.state.filterStatus}
								>
									<option value={-1}>Tất Cả</option>
									<option value={0}>Ẩn</option>
									<option value={1}>Kích Hoạt</option>
								</select>
							</td>
							<td className="text-center">
								<button type="button" className="btn btn-default btn-clear" onClick={ this.onClearfilterTable }>Bỏ lọc</button>
							</td>
						</tr>
						{ this.props.children }
					</tbody>
				</table>
			</div>
		);
	}
}

export default TaskList;
