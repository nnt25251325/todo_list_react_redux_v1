import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TaskItem extends Component {
	onDelete = (id) => {
		//Thêm dòng comment >>>eslint-disable-line<<< ngay trên dòng có hàm confirm để chạy được hàm này
		if(confirm('Bạn chắc chắn muốn xóa?')) { //eslint-disable-line
			this.props.onDelete(id);
		}
	}

	onUpdateStatus = (task) => {
		this.props.onUpdateStatus(task);
	}

	toSlug = (str) => {
		// Chuyển hết sang chữ thường
		str = str.toLowerCase();
 
		// xóa dấu
		str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
		str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
		str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
		str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
		str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
		str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
		str = str.replace(/(đ)/g, 'd');
 
		// Xóa ký tự đặc biệt
		str = str.replace(/([^0-9a-z-\s])/g, '');
 
		// Xóa khoảng trắng thay bằng ký tự -
		str = str.replace(/(\s+)/g, '-');
 
		// xóa phần dự - ở đầu
		str = str.replace(/^-+/g, '');
 
		// xóa phần dư - ở cuối
		str = str.replace(/-+$/g, '');
 
		// return
		return str;
	}

	render() {
		var {task, index} = this.props;
		var toSlugName = this.toSlug(task.name);
		var statusClass = (task.status ? "label label-status label-danger" : "label label-status label-info");
		var statusName = task.status ? "Kích hoạt" : "Ẩn";
		return (
			<tr>
				<td>{index + 1}</td>
				<td>
					<Link to={`/task-detail/${toSlugName}.${task.id}`}>
						{task.name}
					</Link>
				</td>
				<td className="text-center">
					<span className={statusClass} onClick={ () => this.onUpdateStatus(task) }>
						{statusName}
					</span>
				</td>
				<td className="text-center">
					<Link to={`/task/${task.id}/edit`} className="btn btn-success">
						<i className="fa fa-pencil mr-5"></i>Sửa
					</Link>&nbsp;
					<button
						type="button"
						className="btn btn-danger"
						onClick={ () => this.onDelete(task.id) }
					>
						<i className="fa fa-trash mr-5"></i>Xóa
					</button>
				</td>
			</tr>
		);
	}
}

export default TaskItem;
