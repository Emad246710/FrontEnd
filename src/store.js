import { createStore } from 'vuex'
import axios from "axios";

import {
    URI_ROOT,

    LOGIN_MUT, LOGOUT_MUT,GET_USE_MUT,  DELETE_USER_MUT,

    GET_ALL_NOTES_MUT, GET_NOTE_MUT, DELETE_NOTE_MUT,
    GET_ALL_CATEGORIES_MUT, GET_CATEGORY_MUT,  DELETE_CATEGORY_MUT,


    LOGIN_ACT, LOGOUT_ACT,GET_USER_ACT, SIGNUP_ACT, EDIT_USER_ACT, DELETE_USER_ACT,
    GET_ALL_NOTES_ACT, GET_NOTE_ACT, EDIT_NOTE_ACT, CREATE_NOTE_ACT, DELETE_NOTE_ACT,
    GET_ALL_CATEGORIES_ACT, GET_CATEGORY_ACT, EDIT_CATEGORY_ACT, CREATE_CATEGORY_ACT, DELETE_CATEGORY_ACT,


    GET_NOTE_GET, GET_CATEGORY_GET, IS_LOGGED_IN

} from './storeDef.js'


const state = {
    current_user: {
        id: 1,
        username: "user1",
    },
    notes: {
    },
    categories: {},


}
const getters = {
    [GET_NOTE_GET]: (state) => (id) => {
        return state.notes[id];
    }
    , [GET_CATEGORY_GET]: (state) => (id) => {
        return state.categories[id];
    }
    ,
    [IS_LOGGED_IN]: (state) => {
        return state.current_user.id != null;
    }


}
const actions = {

    [LOGIN_ACT]: async ({ commit }, { username, password }) => {

        let config = {
            method: "post",
            url: URI_ROOT + "/login",
            data: {
                password: password,
                username: username,
            },
            withCredentials: true,
        };

        let response = await axios(config);
        let user = response.data.current_user;
        commit(LOGIN_MUT, user)

    },
    [LOGOUT_ACT]: async ({ commit }) => {
        let config = {
            method: "get",
            url: URI_ROOT + "/logout",
            withCredentials: true,
        };
        let response = await axios(config);
        let res = response.data;  // show msg??
        commit(LOGOUT_MUT)
    },

    [GET_USER_ACT]: async ({ commit }, id) => {
        let config = {
            method: "get",
            url: URI_ROOT + "/users/" + id ,

            withCredentials: true,
        };
        let response = await axios(config);
        let user = response.data;

        commit(GET_USE_MUT, user)
    },


    [SIGNUP_ACT]: async ({ commit, dispatch }, { username, password }) => {
        let config = {
            method: "post",
            url: URI_ROOT + "/users",
            data: {
                password: password,
                username: username,
            },
            withCredentials: true,
        };
        let response = await axios(config);
        let user_id = response.data.id;
        dispatch(GET_USER_ACT, user_id)

    },
    [EDIT_USER_ACT]: async ({ commit }, { username, password, id }) => {

        let config = {
            method: "put",
            url: URI_ROOT + "/users/" + id,
            data: {
                password: password,
                username: username,
            },
            withCredentials: true,
        };
        let response = await axios(config);
        let user_id = response.data.id;
        dispatch(GET_USER_ACT, user_id)
    },
    [DELETE_USER_ACT]: async ({ commit }, id) => {
        let config = {
            method: "delete",
            url: URI_ROOT + "/users/" + id,
            withCredentials: true,
        };
        let response = await axios(config);
        let msg = response.data;   // show msg??
        commit(DELETE_USER_MUT)
    },




    [GET_ALL_NOTES_ACT]: async ({ commit }) => {
        let config = {
            method: "get",
            url: URI_ROOT + "/users/" + state.current_user.id + "/notes",
            withCredentials: true,
        };
        let response = await axios(config);
        let notes = response.data;
        commit(GET_ALL_NOTES_MUT, notes)
    },

    [GET_NOTE_ACT]: async ({ commit }, id) => {
        let config = {
            method: "get",
            url: URI_ROOT + "/users/" + state.current_user.id + "/notes/" + id,

            withCredentials: true,
        };
        let response = await axios(config);
        let note = response.data;

        commit(GET_NOTE_MUT, note)
    },

    [EDIT_NOTE_ACT]: async ({ commit, dispatch }, note) => {

        let { id } = note
        let config = {
            method: "put",
            url: URI_ROOT + "/users/" + state.current_user.id + "/notes/" + id,

            withCredentials: true,
            data: note
        };
        let response = await axios(config);
        let updated_note_id = response.data.id;

        dispatch(GET_NOTE_ACT, updated_note_id)
    },


    [CREATE_NOTE_ACT]: async ({ commit, dispatch }, note) => {
        console.log(note)

        let config = {
            method: "post",
            url: URI_ROOT + "/users/" + state.current_user.id + "/notes",

            withCredentials: true,
            data: note
        };
        let response = await axios(config);
        let updated_note_id = response.data.id;
        dispatch(GET_NOTE_ACT, updated_note_id)

    },

    [DELETE_NOTE_ACT]: async ({ commit, dispatch }, id) => {
        let config = {
            method: "delete",
            url: URI_ROOT + "/users/" + state.current_user.id + "/notes/" + id,

            withCredentials: true,
        };
        let response = await axios(config);
        let msg = response.data;   // show msg??
        commit(DELETE_NOTE_MUT, id)
        dispatch(GET_ALL_NOTES_ACT)

    },

    [GET_ALL_CATEGORIES_ACT]: async ({ commit, state }) => {
        let config = {
            method: "get",
            url: URI_ROOT + "/users/" + state.current_user.id + "/categories",
            withCredentials: true,
        };

        console.log(URI_ROOT + "/users/" + state.current_user.id + "/categories")
        let response = await axios(config);
        let categories = response.data;
        commit(GET_ALL_CATEGORIES_MUT, categories)
    },

    [GET_CATEGORY_ACT]: async ({ commit, state }, id) => {
        let config = {
            method: "get",
            url: URI_ROOT + "/users/" + state.current_user.id + "/categories/" + id,
            withCredentials: true,
        };
        let response = await axios(config);
        let category = response.data;
        commit(GET_CATEGORY_MUT, category)
    },

    [EDIT_CATEGORY_ACT]: async ({ commit, state, dispatch }, category) => {

        let { id } = category
        console.log(category)
        let config = {
            method: "put",
            url: URI_ROOT + "/users/" + state.current_user.id + "/categories/" + id,
            withCredentials: true,
            data: category
        };
        let response = await axios(config);
        let updated_category_id = response.data.id;
        dispatch(GET_CATEGORY_ACT, updated_category_id)

    },

    [CREATE_CATEGORY_ACT]: async ({ commit, dispatch }, category) => {
        let config = {
            method: "post",
            url: URI_ROOT + "/users/" + state.current_user.id + "/categories",

            withCredentials: true,
            data: category
        };
        let response = await axios(config);
        let updated_category_id = response.data.id;
        dispatch(GET_CATEGORY_ACT, updated_category_id)

    },

    [DELETE_CATEGORY_ACT]: async ({ commit, dispatch }, id) => {
        let config = {
            method: "delete",
            url: URI_ROOT + "/users/" + state.current_user.id + "/categories/" + id,

            withCredentials: true,
        };
        let response = await axios(config);
        let msg = response.data;   // show msg??
        commit(DELETE_CATEGORY_MUT, id)
        dispatch(GET_ALL_CATEGORIES_ACT)
    },
}


const mutations = {
    [LOGIN_MUT]: (state, user) => {
        state.current_user = user
    },

    [LOGOUT_MUT]: (state) => {
        state.current_user = {
            id: null,
            username: null,
        }
        state.notes = {}
        state.categories = {}
    },
    [GET_USE_MUT]: (state, user) => {
        state.current_user = user
    },

    [DELETE_USER_MUT]: (state) => {
        state.current_user = {
            id: null,
            username: null,
        }
    },


    [GET_ALL_NOTES_MUT]: (state, notes) => {
        state.notes = notes
    },

    [GET_NOTE_MUT]: (state, note) => {
        let { id } = note
        console.log(state.notes)
        state.notes[id.toString()] = note
        console.log(state.notes)
    },

    // [EDIT_NOTE_MUT]: (state, note) => {
    //     let { id } = note
    //     state.notes[id] = note
    // },

    // [CREATE_NOTE_MUT]: (state, note) => {
    //     let { id } = note
    //     state.notes[id] = note
    // },

    [DELETE_NOTE_MUT]: (state, id) => {
        delete state.notes[id]
    },





    [GET_ALL_CATEGORIES_MUT]: (state, categories) => {
        state.categories = categories
    },

    [GET_CATEGORY_MUT]: (state, category) => {
        let { id } = category
        state.categories[id] = category
    },

    // [EDIT_CATEGORY_MUT]: (state, category) => {
    //     let { id } = category
    //     state.categories[id] = category
    // },

    // [CREATE_CATEGORY_MUT]: (state, category) => {
    //     let { id } = category
    //     state.categories[id] = category
    // },

    [DELETE_CATEGORY_MUT]: (state, id) => {
        delete state.categories[id]
    },


}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default createStore({
    state,
    getters,
    actions,
    mutations
})



// 

// const errHandler = (err) => {
//     if (err.response) {
//       // client received an error response (5xx, 4xx)
//       console.log(err.response);
//       return {
//         title: "Server Response",
//         message: err.response.data.errMsg,
//       };
//     } else if (err.request) {
//       // client never received a response, or request never left
//       return {
//         title: "Unable to Reach Server",
//         message: err.message,
//       };
//     } else {
//       // There's probably an error in your code
//       return {
//         title: "Application Error",
//         message: err.message,
//       };
//     }
//   };
