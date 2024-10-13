import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

instance.interceptors.response.use(
  (response) => {
    //success status
    if (response.status === 200) {
      return response;
    } 
    //error status
    else {  
      const messages = response.data.messages
      if (messages) {
        if (messages instanceof Array) {
          return Promise.reject({ messages });
        }
        return Promise.reject({ messages: [messages] });
      }
      return Promise.reject({ messages: ["Error, Try again later"] });
    }
  },
  (error) => {
    //unauthorised error
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem("token");
      history.replace({ pathname: "/auth" });
    } 
   //internal server error
    else if (error.response && error.response.status === 500) {
      return Promise.reject(error.response);
    } 
   //any other error
    else return Promise.reject(error);
  }
);