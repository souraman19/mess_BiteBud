export const HOST = "http://localhost:7000";

export const AUTH_ROUTES = `${HOST}/api/auth`;
export const COMMENT_ROUTES = `${HOST}/api/comment`;
export const COMPLAINT_ROUTES = `${HOST}/api/complaint`;
export const GALLERY_ROUTES = `${HOST}/api/gallery`;
export const MESSMENU_ROUTES = `${HOST}/api/mess-menu`;



export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_OTP_ROUTE =`${AUTH_ROUTES}/get-otp`;
export const VALIDATE_OTP_ROUTE =`${AUTH_ROUTES}/verify-otp`;
export const USER_REGISTER_ROUTE =`${AUTH_ROUTES}/register-user`;


export const GET_ALL_COMMENTS_ROUTE = `${COMMENT_ROUTES}/get-all-comments`;
export const ADD_COMMENT_ROUTE = `${COMMENT_ROUTES}/add-comment`;
export const EDIT_COMMENT_ROUTE = `${COMMENT_ROUTES}/edit-comment`;
export const DELETE_COMMENT_ROUTE = `${COMMENT_ROUTES}/delete-comment`;
export const ADD_COMMENT_UNDER_COMMENT_ROUTE = `${COMMENT_ROUTES}/add-comment-under-comment`;
export const GET_COMMENTS_UNDER_COMMENT_ROUTE = `${COMMENT_ROUTES}/get-comments-under-comment`;
export const DELETE_COMMENT_UNDER_COMMENT_ROUTE = `${COMMENT_ROUTES}/delete-comment-under-comment`;


export const GET_ALL_COMPLAINTS_ROUTE = `${COMPLAINT_ROUTES}/get-all-complaints`;
export const ADD_COMPLAINT_ROUTE = `${COMPLAINT_ROUTES}/add-complaint`;
export const UPVOTE_COMPLAINT_ROUTE = `${COMPLAINT_ROUTES}/upvote-complaint`;
export const DOWNVOTE_COMPLAINT_ROUTE = `${COMPLAINT_ROUTES}/downvote-complaint`;
export const DELETE_COMPLAINT_ROUTE = `${COMPLAINT_ROUTES}/delete-complaint`;
export const EDIT_COMPLAINT_ROUTE = `${COMPLAINT_ROUTES}/edit-complaint`;


export const GET_ALL_IMAGES = `${GALLERY_ROUTES}/get-all-images`;
export const UPDLOAD_IMAGE = `${GALLERY_ROUTES}/upload-image`;
export const DELETE_IMAGE = `${GALLERY_ROUTES}/delete-image`;

export const GET_MESS_MENU = `${MESSMENU_ROUTES}/get-mess-menu`;
export const ADD_MESS_MENU = `${MESSMENU_ROUTES}/add-mess-menu`;
export const EDIT_MESS_MENU = `${MESSMENU_ROUTES}/edit-mess-menu`;
export const DELETE_MESS_MENU = `${MESSMENU_ROUTES}/delete-mess-menu`;