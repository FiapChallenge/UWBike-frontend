import { useTheme } from "@/src/context/ThemeProvider";
import { Switch } from "react-native";

export default function ThemeToggle(){
    const {theme, toggleTheme} = useTheme();

    return(
       <Switch value={theme === "dark"} onValueChange={toggleTheme}/>
    )   
}