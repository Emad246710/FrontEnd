import { createStore } from 'vuex'
import axios from "axios";

import {
    URI_ROOT,

    LOGIN_MUT, LOGOUT_MUT,

    GET_ALL_NOTES_MUT, GET_NOTE_MUT, EDIT_NOTE_MUT, CREATE_NOTE_MUT, DELETE_NOTE_MUT,
    GET_ALL_CATEGORIES_MUT, GET_CATEGORY_MUT, EDIT_CATEGORY_MUT, CREATE_CATEGORY_MUT, DELETE_CATEGORY_MUT,


    LOGIN_ACT, LOGOUT_ACT, SIGNUP_ACT,
    GET_ALL_NOTES_ACT, GET_NOTE_ACT, EDIT_NOTE_ACT, CREATE_NOTE_ACT, DELETE_NOTE_ACT,
    GET_ALL_CATEGORIES_ACT, GET_CATEGORY_ACT, EDIT_CATEGORY_ACT, CREATE_CATEGORY_ACT, DELETE_CATEGORY_ACT,


    GET_NOTE_GET,GET_CATEGORY_GET

} from './storeDef.js'


const state = {
    currnet_user: {
        id: 1,
        username: "Mockdata",
    },
    notes: {
    },
    categories: {},

}
const getters = {
  [GET_NOTE_GET]: (state)=>(id) => {
      return state.notes[id];
  }
,
  [GET_CATEGORY_GET]: (state)=>(id) => {
    return state.categories[id];
}

}
const actions = {
    [LOGIN_ACT]: async ({ commit }, { username, password }) => {

        try {
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
        } catch (err) {
            console.log(err);
        } finally {

        }
    },


    [LOGOUT_ACT]: async ({ commit }) => {
        try {
            let config = {
                method: "get",
                url: URI_ROOT + "/logout",
                withCredentials: true,
            };
            let response = await axios(config);
            let res = response.data;  // show msg??
            commit(LOGOUT_MUT)
        } catch (err) {
            console.log(err);
        } finally {

        }
    },

    [SIGNUP_ACT]: async ({ commit }, { username, password }) => {
        try {
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
            let user = response.data.current_user;
            commit(LOGIN_MUT, user)
        } catch (err) {
            console.log(err);
        }
    },

    [GET_ALL_NOTES_ACT]: async ({ commit }) => {
        try {
            let config = {
                method: "get",
                url: URI_ROOT + "/notes",
                withCredentials: true,
            };
            let response = await axios(config);
            let notes = response.data;
            commit(GET_ALL_NOTES_MUT, notes)
        } catch (err) {
            console.log(err);
        } finally {

        }
    },

    [GET_NOTE_ACT]: async ({ commit }, id) => {
        try {
            let config = {
                method: "get",
                url: URI_ROOT + "/notes/" + id,
                withCredentials: true,
            };
            let response = await axios(config);
            let note = response.data;

            commit(GET_NOTE_MUT, note)
        } catch (err) {
            console.log(err);
        } finally {

        }
    },

    [EDIT_NOTE_ACT]: async ({ commit }, note) => {

        try {
            let { id } = note
            let config = {
                method: "put",
                url: URI_ROOT + "/notes/" + id,
                withCredentials: true,
                data: note
            };
            let response = await axios(config);
            let note_res = response.data;
            console.log(note_res)
            commit(EDIT_NOTE_MUT, note_res)
        } catch (err) {
            console.log(err);
        } finally {

        }
    },


    [CREATE_NOTE_ACT]: async ({ commit }, note) => {
        try {
            let config = {
                method: "post",
                url: URI_ROOT + "/notes",
                withCredentials: true,
                data: note
            };
            let response = await axios(config);
            let note_res = response.data;
            commit(CREATE_NOTE_MUT, note_res)
        } catch (err) {
            console.log(err);
        } finally {

        }
    },

    [DELETE_NOTE_ACT]: async ({ commit }, id) => {
        try {
            let config = {
                method: "delete",
                url: URI_ROOT + "/notes/" + id,
                withCredentials: true,
            };
            let response = await axios(config);
            let msg = response.data;   // show msg??
            commit(DELETE_NOTE_MUT, id)
        } catch (err) {
            console.log(err);
        } finally {

        }
    },

    [GET_ALL_CATEGORIES_ACT]: async ({ commit }) => {
        try {
            let config = {
                method: "get",
                url: URI_ROOT + "/categories",
                withCredentials: true,
            };
            let response = await axios(config);
            let categories = response.data;
            commit(GET_ALL_CATEGORIES_MUT, categories)
        } catch (err) {
            console.log(err);
        } finally {

        }
    },

    [GET_CATEGORY_ACT]: async ({ commit }, id) => {
        try {
            let config = {
                method: "get",
                url: URI_ROOT + "/categories/" + id,
                withCredentials: true,
            };
            let response = await axios(config);
            let category = response.data;
            commit(GET_CATEGORY_MUT, category)
        } catch (err) {
            console.log(err);
        } finally {

        }
    },

    [EDIT_CATEGORY_ACT]: async ({ commit }, category) => {

        try {
            let { id } = category
            let config = {
                method: "put",
                url: URI_ROOT + "/categories/" + id,
                withCredentials: true,
                data: category
            };
            let response = await axios(config);
            let category_res = response.data;
            commit(EDIT_CATEGORY_MUT, category_res)
        } catch (err) {
            console.log(err);
        } finally {

        }
    },

    [CREATE_CATEGORY_ACT]: async ({ commit }, category) => {
        try {
            let config = {
                method: "post",
                url: URI_ROOT + "/categories",
                withCredentials: true,
                data: category
            };
            let response = await axios(config);
            let category_res = response.data;
            commit(CREATE_CATEGORY_MUT, category_res)
        } catch (err) {
            console.log(err);
        } finally {

        }
    },

    [DELETE_CATEGORY_ACT]: async ({ commit }, id) => {
        try {
            let config = {
                method: "delete",
                url: URI_ROOT + "/categories/" + id,
                withCredentials: true,
            };
            let response = await axios(config);
            let msg = response.data;   // show msg??
            commit(DELETE_CATEGORY_MUT, id)
        } catch (err) {
            console.log(err);
        } finally {

        }
    },
}




const mutations = {
    [LOGIN_MUT]: (state, user) => {
        state.currnet_user = user
    },

    [LOGOUT_MUT]: (state) => {
        state.currnet_user = {
            id: null,
            username: null,
        }
    },

    [GET_ALL_NOTES_MUT]: (state, notes) => {
        state.notes = notes
    },

    [GET_NOTE_MUT]: (state, note) => {
        let { id } = note
        state.notes[id] = note
    },

    [EDIT_NOTE_MUT]: (state, note) => {
        let { id } = note
        state.notes[id] = note
    },

    [CREATE_NOTE_MUT]: (state, note) => {
        let { id } = note
        state.notes[id] = note
    },

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

    [EDIT_CATEGORY_MUT]: (state, category) => {
        let { id } = category
        state.categories[id] = category
    },

    [CREATE_CATEGORY_MUT]: (state, category) => {
        let { id } = category
        state.categories[id] = category
    },

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
