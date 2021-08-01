import React, {createContext, PropsWithChildren, useState} from "react";

export const ThemeContext  = createContext<PropsWithChildren<any>>(null);

export const ThemeProvider : React.FC<{}> = ({children}) => {
    const [theme, setTheme] = useState("lightTheme");

    return (
        <ThemeContext.Provider value = {{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
