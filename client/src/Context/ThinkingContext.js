import { createContext } from "react";

const ThinkingContext = createContext({
    thinking: false,
    setThinking: () => {}
});

export default ThinkingContext;