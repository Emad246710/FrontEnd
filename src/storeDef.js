const URI_ROOT = 'http://localhost:5002'


const LOGIN_MUT = 'login';
const LOGOUT_MUT = 'logout';

// const SIGNUP_MUT = 'signup'; // we're using  LOGIN_MUT instead of SIGNUP_MUT
const GET_ALL_NOTES_MUT = 'getAllNotes';
const GET_NOTE_MUT = 'getNote';
const EDIT_NOTE_MUT = 'editNote';
const CREATE_NOTE_MUT = 'createNote';
const DELETE_NOTE_MUT = 'deleteNote';

const GET_ALL_CATEGORIES_MUT = 'getAllCategories';
const GET_CATEGORY_MUT = 'getCategory';
const EDIT_CATEGORY_MUT = 'editCategory';
const CREATE_CATEGORY_MUT = 'createCategory';
const DELETE_CATEGORY_MUT = 'deleteCategory';



const LOGIN_ACT = 'login';
const LOGOUT_ACT = 'logout';
const SIGNUP_ACT = 'signup';

const GET_ALL_NOTES_ACT = 'getAllNotes';
const GET_NOTE_ACT = 'getNote';
const EDIT_NOTE_ACT = 'editNote';
const CREATE_NOTE_ACT = 'createNote';
const DELETE_NOTE_ACT = 'deleteNote';

const GET_ALL_CATEGORIES_ACT = 'getAllCategories';
const GET_CATEGORY_ACT = 'getCategory';
const EDIT_CATEGORY_ACT = 'editCategory';
const CREATE_CATEGORY_ACT = 'createCategory';
const DELETE_CATEGORY_ACT = 'deleteCategory';

const GET_NOTE_GET = 'getNote';
const GET_CATEGORY_GET = 'getCategory';



export  {
    URI_ROOT,

    LOGIN_MUT, LOGOUT_MUT,

    GET_ALL_NOTES_MUT, GET_NOTE_MUT, EDIT_NOTE_MUT, CREATE_NOTE_MUT, DELETE_NOTE_MUT,
    GET_ALL_CATEGORIES_MUT, GET_CATEGORY_MUT, EDIT_CATEGORY_MUT, CREATE_CATEGORY_MUT, DELETE_CATEGORY_MUT,


    LOGIN_ACT, LOGOUT_ACT, SIGNUP_ACT,
    GET_ALL_NOTES_ACT, GET_NOTE_ACT, EDIT_NOTE_ACT, CREATE_NOTE_ACT, DELETE_NOTE_ACT,
    GET_ALL_CATEGORIES_ACT, GET_CATEGORY_ACT, EDIT_CATEGORY_ACT, CREATE_CATEGORY_ACT, DELETE_CATEGORY_ACT,

    GET_NOTE_GET, GET_CATEGORY_GET

}