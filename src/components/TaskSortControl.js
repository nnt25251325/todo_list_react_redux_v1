import React, { Component } from 'react';

class TaskSortControl extends Component {

	onClick = (sortBy, sortValue) => {
		this.props.onSort({
			by: sortBy,
			value: sortValue
		});
	}

	render() {
		var { sort } = this.props;
		// console.log(sort);
		return (
			<div className="col-xs-6">
				<div className="dropdown">
					<button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Sắp Xếp <i className="fa fa-caret-square-o-down ml-5"></i></button>
					<ul className="dropdown-menu">
						<li onClick={() => this.onClick('name', 1)}>
							<span className={ (sort.by === 'name' && sort.value === 1) ? 'sort-selected' : ''}>
								<span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
							</span>
						</li>
						<li onClick={() => this.onClick('name', -1)}>
							<span className={ (sort.by === 'name' && sort.value === -1) ? 'sort-selected' : ''}>
								<span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
							</span>
						</li>
						<li role="separator" className="divider" />
						<li onClick={() => this.onClick('status', 1)}>
							<span className={ (sort.by === 'status' && sort.value === 1) ? 'sort-selected' : ''}>
								Trạng Thái Kích Hoạt
							</span>
						</li>
						<li onClick={() => this.onClick('status', -1)}>
							<span className={ (sort.by === 'status' && sort.value === -1) ? 'sort-selected' : ''}>
								Trạng Thái Ẩn
							</span>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default TaskSortControl;