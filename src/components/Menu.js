import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const menus = [
	{
		name: 'Trang chủ',
		to: '/',
		exact: true
	},
	{
		name: 'Quản lý công việc',
		to: '/task-list',
		exact: false
	},
	{
		name: 'Thêm công việc',
		to: '/task/add',
		exact: false
	}
];

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
	return (
		<Route
			path={to}
			exact={activeOnlyWhenExact}
			children={
				({match}) => {
					var active = (match ? 'active' : '');
					return (
						<li className={`${active}`}>
							<Link to={to}>
								{label}
							</Link>
						</li>
					);
				}
			}
		/>
	);
};

class Menu extends Component {
	render() {
		return (
			<nav className="navbar navbar-default" role="navigation">
				<div className="container">
					<ul className="nav navbar-nav">
						{ this.showMenu(menus) }
					</ul>
				</div>
			</nav>
		);
	}

	showMenu = (menus) => {
		var result = null;
		if(menus.length > 0) {
			result = menus.map((menu, index) => {
				return (
					<MenuLink
						key={index}
						label={menu.name}
						to={menu.to}
						activeOnlyWhenExact={menu.exact}
					/>
				);
			});
		}
		return result;
	}
}

export default Menu;
