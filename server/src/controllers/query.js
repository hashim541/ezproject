const {userCache,projectCache} = require('../utils/nodeCache')

const { countUser,
    getProjectLanguages,getUserProjectsById,getUserSkillsById,getUserFollowingById,getUserLikesById,getUserDataById,
    updateUserProfile,updateSkill,deleteSkill,getEachSkills,insertNewSkill,insertNewProject,
    InsertProjectPro_langs,getProjectById,getProjectTechstack,InsertImageCarousel,
    getImageCarouselByProjectId,updateProjectLikes,updateProjectDetails,deleteProjectData,
    getSetOfUsers,getSetOfProjects,searchUserByName,searchUserBySkill,searchProjectByName,searchProjectByDiff,
    searchProjectByTS,updateFollower,isUserFollowing,getUserFollowerById,getUSerFollowerByuserID
} = require('../utils/dbquery')

function checkUniqueEmail (req,res){
    const userData = req.body;
    countUser(res,userData)
}
async function getUserDetails(req, res){
    const userData = req.body
    const userDataCache = userCache.get(userData.id)
    if(userDataCache != undefined){
        return res.status(200).json(JSON.stringify(userDataCache))
    }
    const responseData = {
        user:{},
        skills:[],
        followers:[],
        projects:[]
    }
    responseData.user = await getUserDataById(userData);
    responseData.skills = await getUserSkillsById(userData);
    responseData.followers = await getUserFollowingById(userData);
    responseData.user.followers_count = responseData.followers.length;
    responseData.user.following_count = await getUSerFollowerByuserID(userData)
    responseData.projects = await getUserProjectsById(userData)
    responseData.user.userFollowing = await isUserFollowing(userData)
    responseData.followers=[];

    for (const project of responseData.projects) {
        project.user = {
            id:responseData.user.id,
            username:responseData.user.username,
            profile_url : responseData.user.profile_url,
        }
        project.languages = await getProjectLanguages(project.id, userData.id);
    }
    responseData.user.project_count = responseData.projects.length

    if(userDataCache == undefined){
        userCache.set(userData.id , responseData,1800)
    }
    return res.status(200).json(JSON.stringify(responseData))

}

async function editUserProfile(req,res){
    const userData = req.body
    userCache.del(userData.id)
    const result = await updateUserProfile(userData)
    if(result.length == 0){
        return res.status(400).json(result)
    }
    return res.status(200).json(result)
}
async function editSkill(req,res){
    const skillData = req.body
    userCache.del(skillData.user_id)
    
    const result = await updateSkill(skillData)
    if(result.length == 0){
        return res.status(400).json(result)
    }
    return res.status(200).json(result)
}
async function deleteSkillByID(req,res){
    const skillData = req.body
    userCache.del(skillData.user_id)
    const result = await deleteSkill(skillData)
    if(result.length == 0){
        return res.status(400).json(result)
    }
    return res.status(200).json(result)
}
async function getAllSkills (req,res){
    const result = await getEachSkills()
    if(result.length == 0){
        return res.status(400).json('Unable to get all the skills')
    }
    return res.status(200).json(JSON.stringify(result))

}
async function addNewSkill(req,res){
    const skillData = req.body;
    userCache.del(skillData.user_id)
    const result1 = await insertNewSkill(skillData)
    if(result1.length == 0){
        return res.status(400).json('Unable to add Skills')
    }
    skillData.id = skillData.user_id
    const result =await getUserSkillsById(skillData)
    return res.status(200).json(result)
}

async function addProject(req,res){
    const projectData = req.body
    userCache.del(projectData.project.user_id)
    let result = await insertNewProject(projectData.project)
    if(result.length == 0){
        return res.status(400).json("Unable to create a new project")
    }
    result=result[0]
    projectData.pro_lang.forEach(async(pro_lang) => {
        pro_lang.project_id = result.id
        pro_lang.user_id = result.user_id
        await InsertProjectPro_langs(pro_lang)
    })
    await InsertImageCarousel({project_id:result.id,image_url:result.preview_url,image_name:"Home Page"})
    return res.status(200).json("New project created successfully")
}

async function getProjectDetails(req,res) {
    const projectData = req.body
    const projectDataCache = projectCache.get(projectData.project_id)
    if(projectDataCache != undefined){
        return res.status(200).json(projectDataCache)
    }
    const responseData = {
        data:{},
        languages:[],
        ImageCarousel:[]
    }
    responseData.data = await getProjectById(projectData.project_id,projectData.userId)
    responseData.data.user = await getUserDataById({id:responseData.data.user_id})
    responseData.languages = await getProjectTechstack(projectData.project_id)
    responseData.ImageCarousel = await getImageCarouselByProjectId(projectData.project_id)

    if(projectDataCache == undefined){
        projectCache.set(projectData.project_id,responseData,900)
    }

    return res.status(200).json(responseData)
}

async function updateProjectLike(req,res){
    const projectData = req.body
    projectCache.del(Number(projectData.project_id))
    const result = await updateProjectLikes(projectData.project_id,projectData.userId)
    return res.status(200).json({userLikedThisProject:result})
}
async function updateProjectDetail(req,res){
    const project = req.body
    projectCache.del(Number(project.data.id))
    const result = await updateProjectDetails(project)
    if (result.length == 0){
        return res.status(400).json("unable to update project")
    }
    return res.status(200).json("updated successfully")
}

async function deleteProject(req,res){
    const projectId = req.body.project_id
    userCache.del(req.body.user_id)
    projectCache.del(projectId)
    const result = await deleteProjectData(projectId)
    if(result.length == 0){
        return res.status(400).json("unable to delete project")
    }
    return res.status(200).json("Project Deleted")
}

async function followersDetails(req,res){
    const userData = req.body
    const responseData = {
        user:{},
        followers:[],
        following:[]
    }
    userData.id = userData.userId
    responseData.user = await getUserDataById(userData);
    
    responseData.followers = await getUserFollowingById(userData);
    responseData.following = await getUserFollowerById(userData)
    
    return res.status(200).json(JSON.stringify(responseData))
}
async function recomendedData(req,res){
    const userData = req.body
    const responseData = {
        user:[],
        project:[]
    }
    responseData.user = await getSetOfUsers(userData.user_id)
    responseData.project = await getSetOfProjects(userData.user_id)
    await Promise.all(responseData.project.map(async (project) => {
        userData.id = project.user_id;
        project.user={}
        let data = await getUserDataById(userData);
        project.user.id = data.id
        project.user.username = data.username
        project.user.profile_url = data.profile_url
        project.user.about_short = data.about_short
        project.languages = await getProjectLanguages(project.id,project.user_id)
    }));

    return res.status(200).json(JSON.stringify(responseData))
}
async function search(req,res){
    const searchData = req.body
    console.log(searchData)
    const responseData = {
        type: searchData.type.includes('user') ? 'user' : 'project',
        result:[]
    }
    if (searchData.type == 'user_name'){
        responseData.result = await searchUserByName(searchData)
    }
    if (searchData.type == 'user_skill'){
        responseData.result = await searchUserBySkill(searchData)
    }
    if (searchData.type == 'project_name'){
        responseData.result = await searchProjectByName(searchData)
    }
    if(searchData.type == 'project_difficulty'){
        responseData.result = await searchProjectByDiff(searchData)
    }
    if(searchData.type == 'project_tech_stack'){
        responseData.result = await searchProjectByTS(searchData)
    }
    if(responseData.type == 'project'){
        await Promise.all(responseData.result.map(async (project) => {
            const userData = {id:project.user_id};
            project.user={}
            let data = await getUserDataById(userData);
            project.user.id = data.id
            project.user.username = data.username
            project.user.profile_url = data.profile_url
            project.user.about_short = data.about_short
            project.languages = await getProjectLanguages(project.id,project.user_id)
        }));
    }
    return res.status(200).json(JSON.stringify(responseData))
}
async function editFollower(req,res){
    const userData = req.body
    userCache.del(userData.following)
    const result = await updateFollower(userData)
    return res.status(200).json({userFollowing:result})
}

module.exports = {
    checkUniqueEmail,
    getUserDetails, 
    editUserProfile,
    editSkill,
    deleteSkillByID,
    getAllSkills,
    addNewSkill,
    addProject,
    getProjectDetails,
    updateProjectLike,
    updateProjectDetail,
    deleteProject,
    followersDetails,
    recomendedData,
    search,
    editFollower
}