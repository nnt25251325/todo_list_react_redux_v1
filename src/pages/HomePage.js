import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
	render() {
		return (
			<div className="section">
				<div className="container">
					<h1 className="text-center mb-15"><strong>Trang chủ</strong></h1>
					<p className="text-center mb-15"><Link to='/task-list' className="btn btn-primary">Vào trang Quản lý công việc</Link></p>
					<p className="text-center"><a href="https://github.com/nnt25251325/todo_list_react_redux_v1/" target="_blank" rel="noopener noreferrer" className="btn btn-default btn-sm">Tải về</a></p>
				</div>
			</div>
		);
	}
}

export default HomePage;
