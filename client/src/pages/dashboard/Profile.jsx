import { useEffect,useState } from "react"
import useAppContext from "../components/useAppContext"
import UserProfile from "./components/UserProfile"
import AboutSkills from "./components/AboutSkills"
import UserProjects from "./components/UserProject"
import { useParams } from "react-router-dom"

function Profile () {
    const { userProfile, getUserDataForProfile   } = useAppContext()
    const { userId } = useParams();
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        getUserDataForProfile(userId,setLoading)
    },[])
    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <UserProfile />
            <AboutSkills />
            <UserProjects />
        </>
    );
}
export default Profile