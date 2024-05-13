import { createContext, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const srv_url = 'http://localhost:3000'
    const [User,setUser] = useState({auth:false})
    const [nav,setNav] = useState('landing')
    const [notification,setNotification] = useState([])
    const [validEmail,setValidEmail] = useState('')
    const [userProfile,setUserProfile] = useState({})
    const [userID,setUserId] = useState(0)
    const [allSkills,setAllSkills] = useState([])
    const [project,setProject] = useState({})
    const [followers,setFollowers] = useState({})
    const [recomended,setRecomended] = useState({
        user:[],
        project:[]
    })

    const navigate = useNavigate();

    function handelNotification(message){
        const newNotification = notification.filter((data) => data.message != message)
        setNotification(newNotification)
    }
    function addNotification(status,message){
        const newNotification = [...notification,{status,message}]
        setNotification(newNotification)
        setTimeout(()=>{
            handelNotification(message)
        },10000)
    }

    function convertFormData(form){
        const formData = new FormData(form);
        const data = {};
        for (const [key,value] of formData){
            data[key] = value;
        }
        return data
    }
    function setOptions(path,data){
        return {
            method:'POST',
            url:srv_url+'/'+path,
            headers:{'Content-type':'application/json'},
            data:JSON.stringify(data)
        }
    }
    function getAllSkills (){
        const options = setOptions('query/getAllSkills',{})

        axios(options)
        .then(response => {
            const data = JSON.parse(response.data)
            setAllSkills(data)
        })
        .catch(error => {
            console.log('unable to get all the skills')
        })
    }
    async function handelUserAuthSubmit(e,path){
        e.preventDefault();
        const formData = convertFormData(e.target)
        if(path == 'register' && formData.password != formData.confirmPassword){
            addNotification(false,"password and confirm password should match")
            return
        }
        const options = setOptions(path,formData)
        axios(options)
        .then((response)=>{
            if(path == 'register'){
                addNotification(true,response.data)
                navigate('/login')
                return
            }
            const user = {};
            user.data=response.data
            user.auth = true
            setUser(user)
            setUserId(user.data.id)
            setNav('logout')
            addNotification(true,"User Logged in")
            const userP = userProfile
            userP.id = user.data.id
            setUserProfile(userP)
            getAllSkills()
            
            navigate('/home/profile/'+user.data.id)
           
        })
        .catch(error =>{
            console.log(error.response.data)
            addNotification(false,error.response.data)
        })
    }
    function checkForValidEmail(e){
        const email = e.target.value;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(regex.test(email)){
            const options = setOptions('query/checkUniqueEmail',{email})
            axios(options)
            .then(response => {
                if(response.data == 0){
                    setValidEmail('Valid')
                }else{
                    setValidEmail('Already taken')
                }
            })
            .catch(error => {
                addNotification(false,error.response.data)
            })
        }else{
            setValidEmail('Invalid')
        }
    }
    function handelLogout(){
        const user = {}
        user.auth = false
        setUser(user)
        navigate('/login')
    }
    function getUserDataForProfile(userId,setLoading){
        const data = {id:userId,user_id:userID}
        const options = setOptions('query/getUserDetails',data)
        axios(options)
        .then(response => {
            var userData = response.data
            userData = JSON.parse(userData)
            if(userData.user.id == User.data.id){
                const newUser = User
                newUser.data = userData
                setUser(newUser)
            }
            setUserProfile({id:userData.id,data:userData})
            setLoading(false)
        })
        .catch(error => {
            addNotification(false,error.response.data)
        })
    }
    function updateUserProfile(e) {
        e.preventDefault()
        const formData = convertFormData(e.target)
        formData.id= userID
        const options = setOptions('query/editUserProfile',formData)
        axios(options)
        .then(response => {
            const data= response.data
            addNotification(true,"profile updated successfully")
        })
        .catch(error => {
            addNotification(false,"Unable to update your profile")
        })
    }
    function editSkill(e,skills,setSkills,i){
        const copySkills = [...skills]
        const updatedSkill = copySkills[i]
        updatedSkill.user_id = userID
        const option = setOptions('query/editSkill',updatedSkill)
        axios(option)
        .then(response => {
            const data= response.data
            setSkills(copySkills)
            addNotification(true,"profile updated successfully")
        })
        .catch(error => {
            addNotification(false,"Unable to update your profile")
        })
    }
    function deleteSkill(e,skills,setSkills,i){
        const copySkills = [...skills]
        const deletedSkill = copySkills[i]
        deletedSkill.user_id = userID
        const updatedSkills = copySkills.filter( (skill,index) =>{
            if(index != i){
                return skill
            }
        } )
        const option = setOptions('query/deleteSkill',deletedSkill)
        axios(option)
        .then(response => {
            const data= response.data
            setSkills(updatedSkills)
            addNotification(true,"profile updated successfully")
        })
        .catch(error => {
            addNotification(false,"Unable to update your profile")
        })
    }
    function handelSkillSubmit(e,skills,setSkills){
        e.preventDefault()
        const formData = convertFormData(e.target)
        formData.skill_id = Number(formData.skill_id)
        formData.user_id = userID

        const option = setOptions('query/addNewSkill',formData)
        axios(option)
        .then(response => {
            const data= response.data
            setSkills(data)
            addNotification(true,"New Skill Added")
        })
        .catch(error => {
            addNotification(false,"Unable to Add your Skill")
        })
    }
    function handelCreateProject(e,projectSchema){
        e.preventDefault()
        const formData = convertFormData(e.target)
        const copyProjectSchema = {...projectSchema}
        copyProjectSchema.project.difficulty = formData.difficulty
        if(copyProjectSchema.pro_lang.length == 0){
            addNotification(false,"Add atleast one tech stack")
        }
        const option = setOptions('query/addProject',copyProjectSchema)
        axios(option)
        .then(response => {
            const data= response.data
            addNotification(true,"New Project Added")
        })
        .catch(error => {
            addNotification(false,"Unable to Add your Project")
        })
    }

    function getProjectDetails(projectId,setLoading){
        const option = setOptions('query/getProjectDetails',{project_id:Number(projectId),userId:userID})
        axios(option)
        .then(response => {
            const data= response.data
            setProject(data)
            setLoading(false)
        })
        .catch(error => {
            addNotification(false,"Unable to Add your Project")
        })
    }

    function addLikeToProject(projectId){
        const option = setOptions('query/updateProjectLike',{project_id:projectId,userId:userID})
        axios(option)
        .then(response => {
            const data= response.data
            const copyProject = {...project}
            if(data.userLikedThisProject){
                copyProject.data.like_count+=1
            }else{
                copyProject.data.like_count-=1
            }
            copyProject.data.userLikedThisProject = data.userLikedThisProject
            setProject(copyProject)

        })
        .catch(error => {
            addNotification(false,"Unable to Add your Project")
        })
    }
    function updateProjectDetails(e){
        console.log(project)
        const option = setOptions('query/updateProjectDetail',project)
        axios(option)
        .then(response => {
            const data= response.data
            addNotification(true,data)
            navigate('/home/projects/'+project.data.id)
        })
        .catch(error => {
            addNotification(false,"Unable to update project")
        })
    }
    function deleteProject(projectId){
        const options = setOptions('query/deleteProject',{project_id:Number(projectId),user_id:userID})
        axios(options)
        .then(response => {
            const data= response.data
            addNotification(true,"Project deleted successfully")
            navigate('/home/profile/'+userID)
        })
        .catch(error => {
            addNotification(false,"Unable to delete project")
        })
    }
    function getfollowerDetails(userId,setLoading){
        const option = setOptions('query/followers',{userId:userId})
        axios(option)
        .then(response => {
            const data= JSON.parse(response.data)
            setFollowers(data)
            setLoading(false)
        })
        .catch(error => {
            addNotification(false,"Unable to get follower details")
        })
    }
    function getHomeData(){
        const option = setOptions('query/recomendedData',{user_id:userID})
        axios(option)
        .then(response => {
            const data= JSON.parse(response.data)
            setRecomended(data)
        })
        .catch(error => {
            addNotification(false,"Unable to get home data")
        })
    }
    function onSearch(e,setSearch){
        e.preventDefault()
        const formData = convertFormData(e.target)
        formData.userId = userID
        const option = setOptions('query/search',formData)
        axios(option)
        .then(response => {
            const data = JSON.parse(response.data)
            setSearch(data)
        })
        .catch(error => {
            addNotification(false,"Unable to search")
        })
    }
    function editFollower(followerID){
        const data = {
            user_id:userID,
            following : followerID
        }
        const option = setOptions('query/editFollower',data)
        axios(option)
        .then(response => {
            const data = response.data
            const copyUserProfile = {...userProfile}
            copyUserProfile.data.user.userFollowing = data.userFollowing
            setUserProfile(copyUserProfile)
            addNotification(true,"following updated")
        })
        .catch(error => {
            addNotification(false,"Unable to update following")
        })
    }

    
// all data
    const contextValue = {
        User,setUser,
        nav,setNav,
        srv_url,handelUserAuthSubmit,
        notification,handelNotification,
        checkForValidEmail,validEmail,
        userProfile,getUserDataForProfile,
        handelLogout,updateUserProfile,userID,
        handelSkillSubmit,editSkill,deleteSkill,
        allSkills,getAllSkills,setUserProfile,
        convertFormData,handelCreateProject,
        project,getProjectDetails,addLikeToProject,
        setProject,updateProjectDetails,deleteProject,
        getfollowerDetails,followers,recomended,getHomeData,
        onSearch,editFollower
    };

    return (
        <AppContext.Provider value={contextValue}>
        {children}
        </AppContext.Provider>
    );
};

export default AppContext;
