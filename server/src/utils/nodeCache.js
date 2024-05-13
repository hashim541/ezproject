const NodeCache = require('node-cache')

const userCache = new NodeCache()
const projectCache = new NodeCache()
module.exports={userCache,projectCache}