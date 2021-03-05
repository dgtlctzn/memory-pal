import {createContext} from "react";

const AuthContext = createContext({
    jwt: "",
    setJwt: () => {}
});

export default AuthContext;