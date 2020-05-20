// if we are in our local environment, NODE_ENV == null

if(process.env.NODE_ENV == 'production'){
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}
