// reducers/index.js
import { combineReducers } from 'redux';

const initialState = {
    isAuthenticated: false,
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
            };
        // Add other cases as needed for login, logout, etc.
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    auth: authReducer,
    // Add other reducers here if needed
});

export default rootReducer;
