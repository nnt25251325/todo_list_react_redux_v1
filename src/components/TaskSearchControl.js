import React, { Component } from 'react';

class TaskSearchControl extends Component {

	constructor(props) {
		super(props);
		this.state = {
			keyword: ''
		}
	}

	onHandleChange = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.value;
		this.setState({
			[name]: value
		});
	}

	onSearch = () => {
		this.props.onSearch(this.state.keyword);
	}

	onClearSearch = () => {
		this.props.onSearch('');
		this.setState({
			keyword: ''
		});
	}

	render() {
		return (
			<div className="col-xs-6">
				<div className="search-wrp">
					<div className="input-group">
						<input
							type="text"
							name="keyword"
							className="form-control"
							placeholder="Nhập từ khóa..."
							value={this.state.keyword}
							onChange={this.onHandleChange}
						/>
						<span className="input-group-btn">
							<button className="btn btn-primary" type="button" onClick={ this.onSearch }><i className="fa fa-search mr-5"></i>Tìm</button>
						</span>
					</div>
					<button type="button" className="btn btn-default btn-clear" onClick={ this.onClearSearch }><i className="fa fa-close"></i></button>
				</div>
			</div>
		);
	}
}

export default TaskSearchControl;
