import {reducerCases} from "./Constants.js";

export const initialState = {
    userInfo: {},
    newUser: false,
}

const reducer = (state, action) => {
    switch(action.type){
        case reducerCases.SET_USER_INFO: //Action to set user information in the state.
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,  // existing data
                    ...action.userInfo, // new data, which will overwrite existing keys if they match
                },
            };
        case reducerCases.SET_NEW_USER:  //Action to set the newUser state to true.
            return {
                ...state,
                newUser: action.newUser,
            };
        default: 
            return state;
    }
}

export default reducer;