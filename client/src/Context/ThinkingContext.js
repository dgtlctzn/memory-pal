import { createContext } from "react";

const ThinkingContext = createContext({
    thinking: {
        add: false,
        edit: false,
        delete: false,
        table: false,
        credentials: false,
        info: false,
    },
    setThinking: () => {}
});

export default ThinkingContext;