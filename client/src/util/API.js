import axios from "axios";

const API = {
    url: "https://7c6hku694c.execute-api.us-east-1.amazonaws.com/post",
    signUpUser: function(user_email, user_pass) {
        return axios({
            method: "POST",
            url: this.url + "/signup",
            data: {
                user_email,
                user_pass
            }
        });
    }
};

export default API;