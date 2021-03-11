import axios from "axios";

const API = {
  url: "https://7c6hku694c.execute-api.us-east-1.amazonaws.com/post",
  signUpUser: function (user_email, user_pass) {
    return axios({
      method: "POST",
      url: this.url + "/signup",
      data: {
        user_email,
        user_pass,
      },
    });
  },
  loginUser: function(user_email, user_pass) {
    return axios({
      method: "POST",
      url: this.url + "/login",
      data: {
        user_email,
        user_pass,
      },
    });
  },
  addUserInfo: function (user_jwt, user_name, user_phone, user_birthday) {
    return axios({
      method: "PUT",
      url: this.url + "/addinfo",
      data: {
        user_jwt,
        user_name,
        user_phone,
        user_birthday,
      },
    });
  },
  addEvent: function (
    user_jwt,
    user_message,
    day_type,
    day_name,
    day_map,
    date
  ) {
    return axios({
      method: "POST",
      url: this.url + "/addevent",
      data: {
        user_jwt,
        user_message,
        day_type,
        day_name,
        day_map,
        date
      },
    });
  },
  getEvents: function(jwt, date) {
    return axios({
      method: "GET",
      url: `${this.url}/addevent?user_dt=${date}`,
      headers: {
        Authorization: jwt
      }
    });
  },
  selectEvent: function(jwt, rowID) {
    return axios({
      method: "GET",
      url: `${this.url}/selectevent?row_id=${rowID}`,
      headers: {
        Authorization: jwt
      }
    });
  }
};

export default API;
