const pool = require('./db');
const bcrypt = require('bcrypt')

function getUserByEmail(resp,user_data){
    pool.query('SELECT * FROM users WHERE email = $1',[user_data.email],(err,res)=>{
        if(err){
            return resp.status(403).json(err.message)
        }
        const user = res.rows[0]
        bcrypt.compare(user_data.password,user.password,(err,result)=>{
            if(err){
                return resp.status(403).json("Error verifying your password")
            }
            if(!result){
                return resp.status(403).json("Wrong password try again")
            }else{
                return resp.status(200).json(res.rows[0])
            }
        })
    })
 }
function insertNewUser(resp,user_data){
    pool.query('INSERT INTO users (username,email,password) VALUES($1, $2, $3)',
    [user_data.username,user_data.email,user_data.password],(err,res) => {
        if(err){
            return resp.status(403).json(err.message)
        }
        return resp.status(200).json('User created successfully.Try logging in.')
    })
}
function countUser(resp,user_data){
    pool.query('SELECT * FROM users WHERE email = $1',
    [user_data.email],(err,res)=>{
        if(err){
            return resp.status(400).json("Error Counting user.")
        }
        resp.status(200).json(res.rowCount)
    })
}

async function getUserDataById (userData){
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1',[userData.id])
        return result.rows[0]
    } catch (error) {
        console.log("Unable to find user",error)
        return {}
    }
}
async function getUserLikesById(userData){
    try {
        const result = await pool.query('SELECT id,username,profile_url FROM users WHERE id IN (SELECT user_id FROM likes WHERE likes = $1)',[userData.id])
        return result.rows
    } catch (error) {
        console.log("Unalbe to get likes of the user")
        return []
    }
}
async function getUserFollowingById(userData){
    try {
        const result = await pool.query('SELECT id,username,profile_url,about_short FROM users WHERE id IN (SELECT user_id FROM followers WHERE following = $1) LIMIT 20',[userData.id])
        return result.rows
    } catch (error) {
        console.log("Unalbe to get followers of the user")
        return []
    }
}
async function getUSerFollowerByuserID(userData){
    try {
        const result = await pool.query('SELECT id,username,profile_url,about_short FROM users WHERE id IN (SELECT following FROM followers WHERE user_id = $1)',[userData.id])
        return result.rows.length
    } catch (error) {
        console.log("Unalbe to get followers of the user")
        return []
    }
}
async function getUserSkillsById(userData){
    try {
        const result = await pool.query('SELECT skills.id as skill_id,pro_lang.id,pro_lang.name,pro_lang.url,skills.certification_url,skills.desc,pro_lang.type FROM pro_lang JOIN skills ON skills.pro_lang_id = pro_lang.id WHERE skills.user_id = $1',[userData.id])
        return result.rows
    } catch (error) {
        console.log("Unalbe to get skills of the user")
        return []
    }
}
async function getUserProjectsById(userData){
    try {
        const result = await pool.query('SELECT * FROM projects WHERE user_id = $1',[userData.id])
        return result.rows
    } catch (error) {
        console.log("Unalbe to get projects of the user")
        return []
    }
}
async function getProjectLanguages(project_id,userData_id){
    try {
        const result = await  pool.query('SELECT pro_lang.name,pro_lang.url,pro_lang.type FROM pro_lang JOIN project_lang ON pro_lang.id = project_lang.pro_lang_id WHERE project_lang.user_id = $1 AND project_lang.project_id = $2',[userData_id,project_id])
        return result.rows
    } catch (error) {
        console.log("Unalbe to get languages of the project")
        return []
    }
}

async function updateUserProfile(userData){
    try{
        const result = await pool.query('UPDATE users SET username = $1, profile_url = $2,  about_short = $3, github_url = $4, linkedin_url = $5, about = $6 WHERE id =$7',
            [   userData.username,
                userData.profile_url,
                userData.about_short,
                userData.github_url,
                userData.linkedin_url,
                userData.about,
                userData.id
            ])
        return 'Your profile updated successfully'
    }catch(error){
        console.log("Unalbe to update the profile",error)
        return ''
    }
}

async function deleteSkill(skillData){
    try {
        const result = await pool.query('DELETE FROM skills WHERE id = $1',[skillData.skill_id])
        return 'Your skill deleted successfully'
    } catch (error) {
        console.log("Unalbe to delete the skills",error)
        return ''
    }
}
async function updateSkill(skillData){
    try {
        const result = await pool.query('UPDATE skills SET "desc" = $1, certification_url = $2 WHERE id = $3',[skillData.desc,skillData.certification_url,skillData.skill_id])
        return 'Your profile updated successfully'
    } catch (error) {
        console.log("Unalbe to update the skills",error)
        return ''
    }
}
async function getEachSkills(){
    try {
        const result = await pool.query('SELECT id,name,url FROM pro_lang ORDER BY name')
        return result.rows
    } catch (error) {
        console.log("Unalbe to get all the skills",error)
        return []
    }
}
async function insertNewSkill(skillData){
    try {
        const result = await pool.query('INSERT INTO skills (user_id, pro_lang_id) VALUES ($1, $2)',[skillData.user_id,skillData.skill_id])
        return 'skill added successfully'
    } catch (error) {
        console.log("Unalbe to insert the skills",error)
        return ''
    }
}
async function insertNewProject(project){
    try {
        const result = await pool.query('INSERT INTO projects (user_id,title,preview_url,"desc",difficulty,live_site_url,github_repo_url) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
    [project.user_id,project.title,project.preview_url,project.desc,project.difficulty,project.live_site_url,project.github_repo_url])

    return result.rows
    } catch (error) {
        console.log('Unable to insert a new project',error)
        return []
    }
}


async function InsertProjectPro_langs(pro_lang){
    try {
        const result = await pool.query('INSERT INTO project_lang (project_id,pro_lang_id,user_id) VALUES ($1,$2,$3)',
        [pro_lang.project_id,pro_lang.id,pro_lang.user_id])
        return 'project_langs added successfully'
    } catch (error) {
        console.log('unable to insert project_lang')
        return ''
    }
}
async function InsertImageCarousel(projectData){
    try {
        const result = await pool.query('INSERT INTO carousel (project_id,image_url,image_name) VALUES ($1,$2,$3)',
        [projectData.project_id,projectData.image_url,projectData.image_name])
    } catch (error) {
        console.log("unable to insert carousel image")
    }
}


async function getProjectById(projectId,userId){
    try {
        const result = await pool.query('SELECT * FROM projects WHERE id = $1',[projectId])

        const likes = await pool.query('SELECT * FROM project_likes WHERE project_id = $1',[projectId])
        const resultData = result.rows[0]

        resultData.like_count = likes.rows.length
        const userLikedProject = await pool.query('SELECT * FROM project_likes WHERE user_id = $1 AND project_id = $2',[userId,projectId])
        resultData.userLikedThisProject = userLikedProject.rows.length == 0 ? false : true
        return resultData
    } catch (error) {
        console.log("unable to get project details",error)
        return {}
    }
}
async function getProjectTechstack(projectId){
    try {
        const result = await pool.query('SELECT id,name,url,type FROM pro_lang WHERE id IN (SELECT pro_lang_id FROM project_lang WHERE project_id = $1)',[projectId])
        return result.rows
    } catch (error) {
        console.log("unable to get all teck stacks used",error)
        return []
    }
}
async function getImageCarouselByProjectId(projectId){
    try {
        const result = await pool.query('SELECT * FROM carousel WHERE project_id = $1',[projectId])
        return result.rows
    } catch (error) {
        console.log("unable to get image carousel")
        return []
    }
}
async function updateProjectLikes(projectId,userId){
    try {
        const userLikedProject = await pool.query('SELECT * FROM project_likes WHERE user_id = $1 AND project_id = $2',[userId,projectId])
        if(userLikedProject.rowCount == 0){
            const likeThisProject = await pool.query('INSERT INTO project_likes (user_id,project_id) VALUES ($1,$2)',[userId,projectId])
            return true
        }
        const disLikeThisProject =  await pool.query('DELETE FROM project_likes WHERE user_id = $1 AND project_id = $2',[userId,projectId])
        return false
    } catch (error) {
        console.log('unable to update likes')
        return false
    }
}
async function updateProjectDetails(projectData){
    try {
        const projects=projectData.data
        await pool.query('UPDATE projects SET title = $1, preview_url = $2, "desc" = $3, difficulty = $4, live_site_url = $5, github_repo_url =$6 WHERE id = $7',
            [projects.title,projects.preview_url,projects.desc,projects.difficulty,projects.live_site_url,projects.github_repo_url,projects.id]
        )
        await pool.query('DELETE FROM project_lang WHERE project_id = $1',[projects.id])

        projectData.languages.forEach(async(pro_lang) => {
            pro_lang.project_id = projects.id
            pro_lang.user_id = projects.user_id
            await InsertProjectPro_langs(pro_lang)
        })
        await pool.query('DELETE FROM carousel WHERE project_id = $1',[projects.id])
        projectData.ImageCarousel.forEach(async(img) => {
            await pool.query('INSERT INTO carousel (project_id,image_url,image_name) VALUES($1,$2,$3)',[img.project_id,img.image_url,img.image_name])
        })
        return 'updated successfully'
    } catch (error) {
        console.log("unable to update Project deatils",error)
        return ''
    }
}
async function deleteProjectData(projectId){
    try {
        const deleteCarousel = await pool.query('DELETE FROM carousel WHERE project_id = $1',[projectId])
        const deleteProjectLikes = await pool.query('DELETE FROM project_likes WHERE project_id = $1',[projectId])
        const deleteProject_lang = await pool.query('DELETE FROM project_lang WHERE project_id = $1',[projectId])
        const deleteProject = await pool.query('DELETE FROM projects WHERE id = $1',[projectId])
        return 'project deleted'
    } catch (error) {
        console.log("unable to delete the project",error)
        return ''
    }
}

async function getSetOfUsers(userID){
    try {
        const result = await pool.query('SELECT username,id,profile_url,about_short FROM users WHERE id != $1 LIMIT 10',[userID])
        return result.rows
    } catch (error) {
        console.log('unable to get users',error)
        return []
    }
}
async function getSetOfProjects(userId){
    try {
        const result = await pool.query('SELECT id,user_id,title,preview_url,"desc",difficulty FROM projects WHERE user_id != $1 ORDER BY created_at LIMIT 10',[userId])
        return result.rows
    } catch (error) {
        console.log('unable to get project details',error)
        return []
    }
}
async function searchUserByName(searchData){
    try {
        const result = await pool.query('SELECT username,id,profile_url,about_short FROM users WHERE id != $1 AND LOWER(username) LIKE LOWER($2) LIMIT 10',[searchData.userId,'%'+searchData.search+'%'])
        return result.rows
    } catch (error) {
        console.log('unable to search by name',error)
        return []
    }
}
async function searchUserBySkill(searchData){
    try {
        const result = await pool.query('SELECT username,id,profile_url,about_short FROM users WHERE id != $1 AND id IN (SELECT user_id FROM skills WHERE pro_lang_id = $2)',[searchData.userId,Number(searchData.search)])
        return result.rows
    } catch (error) {
        console.log('unable to search by skill',error)
        return []
    }
}
async function searchProjectByName(searchData){
    try {
        const result = await pool.query('SELECT id,user_id,title,preview_url,"desc",difficulty FROM projects WHERE user_id != $1 AND LOWER(title) LIKE LOWER($2) ORDER BY created_at LIMIT 10',[searchData.userId,'%'+searchData.search+'%'])
        return result.rows
    } catch (error) {
        console.log('unable to find projects by name',error)
        return []
    }
}
async function searchProjectByDiff(searchData){
    try {
        const result = await pool.query('SELECT id,user_id,title,preview_url,"desc",difficulty FROM projects WHERE user_id != $1 AND difficulty = $2  ORDER BY created_at LIMIT 10' ,[searchData.userId,searchData.search])
        return result.rows
    } catch (error) {
        console.log('unable to find projects by name',error)
        return []
    }
}
async function searchProjectByTS(searchData){
    try {
        const result = await pool.query('SELECT id,user_id,title,preview_url,"desc",difficulty FROM projects WHERE user_id != $1 AND id IN (SELECT project_id FROM project_lang WHERE pro_lang_id = $2)  ORDER BY created_at LIMIT 10' ,[searchData.userId,Number(searchData.search)])
        return result.rows
    } catch (error) {
        console.log('unable to find projects by name',error)
        return []
    }
}
async function updateFollower(userData){
    try {
        const result = await pool.query('SELECT * FROM followers WHERE user_id = $1 AND following = $2',[userData.user_id,userData.following])
        if(result.rowCount == 0){
            const likeThisProject = await pool.query('INSERT INTO followers (user_id,following) VALUES ($1,$2)',[userData.user_id,userData.following])
            return true
        }
        const disLikeThisProject =  await pool.query('DELETE FROM followers WHERE user_id = $1 AND following = $2',[userData.user_id,userData.following])
        return false
    } catch (error) {
        console.log('unable to update following',error)
        return false
    }
}
async function isUserFollowing(userData){
    try {
        const result = await pool.query('SELECT * FROM followers WHERE user_id = $1 AND following = $2',[userData.user_id,userData.id])
        if(result.rows.length == 0){
            return false
        }
        return true
    } catch (error) {
        console.log('unable to get is user following',error)
        return false
    }
}
async function getUserFollowerById(userData){
    try {
        const result = await pool.query('SELECT id,username,profile_url,about_short FROM users WHERE id IN (SELECT following FROM followers WHERE user_id = $1) LIMIT 20',[userData.id])
        return result.rows
    } catch (error) {
        console.log("Unalbe to get followers of the user")
        return []
    }
}
 module.exports = {
    getUserByEmail, 
    insertNewUser, 
    countUser,
    getProjectLanguages,
    getUserProjectsById,
    getUserSkillsById,
    getUserFollowingById,
    getUserLikesById,
    getUserDataById,
    updateUserProfile,
    deleteSkill,
    updateSkill,
    getEachSkills,
    insertNewSkill,
    insertNewProject,
    InsertProjectPro_langs,
    getProjectById,
    getProjectTechstack,
    InsertImageCarousel,
    getImageCarouselByProjectId,
    updateProjectLikes,
    updateProjectDetails,
    deleteProjectData,
    getSetOfUsers,
    getSetOfProjects,
    searchUserByName,
    searchUserBySkill,
    searchProjectByName,
    searchProjectByDiff,
    searchProjectByTS,
    updateFollower,
    isUserFollowing,
    getUserFollowerById,
    getUSerFollowerByuserID
}