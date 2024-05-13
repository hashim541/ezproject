import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
function NavOutlet(){
    return (
        <>
            <Navbar />
            <main className="main">
                <Outlet />
            </main>
        </>
    )
}
export default NavOutlet