export const HOST = "http://localhost:7000";

export const AUTH_ROUTES = `${HOST}/api/auth`;
export const COMMENT_ROUTES = `${HOST}/api/comment`;



export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_OTP_ROUTE =`${AUTH_ROUTES}/get-otp`;
export const VALIDATE_OTP_ROUTE =`${AUTH_ROUTES}/verify-otp`;
export const USER_REGISTER_ROUTE =`${AUTH_ROUTES}/register-user`;


export const GET_ALL_COMMENTS_ROUTE = `${COMMENT_ROUTES}/get-all-comments`
export const ADD_COMMENT_ROUTE = `${COMMENT_ROUTES}/add-comment`
export const EDIT_COMMENT_ROUTE = `${COMMENT_ROUTES}/edit-comment`
export const DELETE_COMMENT_ROUTE = `${COMMENT_ROUTES}/delete-comment`
export const ADD_COMMENT_UNDER_COMMENT_ROUTE = `${COMMENT_ROUTES}/add-comment-under-comment`
export const GET_COMMENTS_UNDER_COMMENT_ROUTE = `${COMMENT_ROUTES}/get-comments-under-comment`
export const DELETE_COMMENT_UNDER_COMMENT_ROUTE = `${COMMENT_ROUTES}/delete-comment-under-comment`
