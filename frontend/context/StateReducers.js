import {reducerCases} from "./Constants.js";

export const initialState = {
    userInfo: undefined,
    newUser: false,
    
}

const reducer = (state, action) => {
    switch(action.type){
        case reducerCases.SET_USER_INFO: //Action to set user information in the state.
            return {
                ...state,
                userInfo: action.userInfo,
            };
        case reducerCases.SET_NEW_USER:  //Action to set the newUser state to true.
            return {
                ...state,
                newUser: action.newUser,
            };
    }
}