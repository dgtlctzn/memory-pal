import {useContext} from "react";

const AuthContext = useContext({
    jwt: "",
    setJwt: () => {}
});

export default AuthContext;