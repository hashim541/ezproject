const express = require('express')
const router = express.Router();

const {checkUniqueEmail,getUserDetails,editUserProfile,editSkill,deleteSkillByID,getAllSkills
    ,addNewSkill,addProject,getProjectDetails,updateProjectLike,updateProjectDetail,deleteProject,
    followersDetails,recomendedData,search,editFollower
} = require('../controllers/query')

router.post('/checkUniqueEmail',checkUniqueEmail)
router.post('/getUserDetails',getUserDetails)
router.post('/editUserProfile',editUserProfile)
router.post('/editSkill',editSkill)
router.post('/deleteSkill',deleteSkillByID)
router.post('/getAllSkills',getAllSkills)
router.post('/addNewSkill',addNewSkill)
router.post('/addProject',addProject)
router.post('/getProjectDetails',getProjectDetails)
router.post('/updateProjectLike',updateProjectLike)
router.post('/updateProjectDetail',updateProjectDetail)
router.post('/deleteProject',deleteProject)
router.post('/followers',followersDetails)
router.post('/recomendedData',recomendedData)
router.post('/search',search)
router.post('/editFollower',editFollower)

module.exports = router