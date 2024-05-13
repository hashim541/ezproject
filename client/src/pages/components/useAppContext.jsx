import { useContext } from "react";
import AppContext from "../../dataContext/AppContext";

function useAppContext(){
    return useContext(AppContext)
}

export default useAppContext