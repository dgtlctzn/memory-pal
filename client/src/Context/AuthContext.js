import {createContext} from "react";

const AuthContext = createContext({
    jwt: "",
    username: "",
    setJwt: () => {},
    setUsername: () => {}
});

export default AuthContext;