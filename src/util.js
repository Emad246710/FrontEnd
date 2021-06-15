import store from "./store.js";

export const errHandler = (err) => {
  if (err.response) {
    // client received an error response (5xx, 4xx)

    // console.log(JSON.stringify(err.response, null, 4))
    if (err.response.status == 401)
      store.commit(LOGOUT_MUT)

    let formatted = {
      title: "Server Response",
      message: err.response.data.errMsg ? err.response.data.errMsg : err.message,
    }

    return formatted;
  } else if (err.request) {
    // client never received a response, or request never left
    return {
      title: "Unable to Reach Server",
      message: err.message,
    };
  } else {
    // There's probably an error in your code
    return {
      title: "Application Error",
      message: err.message,
    };
  }
};


