import {createContext } from "react";

const CookieContext = createContext({
    cookie: "",
    setCookie: () => {}
});

export default CookieContext;