import * as Types from  '../constants/ActionTypes';

var initialState = {
	name: '',
	status: -1
};

var filterTable = (state = initialState, action) => {
	switch(action.type) {
		case Types.FILTER_TABLE:
			return {
				name: action.filter.name,
				status:action.filter.status
			};
		default: return state;
	}
};

export default filterTable;
