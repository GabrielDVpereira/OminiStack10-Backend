const  Dev  = require('../models/User');
const axios = require('axios');
const parseToArray = require('../utils/ParseToArray')

// index, show, store, update, destroy
 
module.exports = {

    async index(req, res){
        try {

            const devs = await Dev.find();
            return res.json(devs);

        }catch(error){

            return res.status(400).send({
                error: error.mesage || error
            });
        }
    },
    async store(req, res){
        const { github_username, techs, latitude, longitude } = req.body;
        
        try {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const { name = login, avatar_url, bio } = response.data;
            
            const techsArray = parseToArray(techs);
            console.log(techsArray)
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
           
        let dev = await Dev.findOne({github_username});
             if (dev)
                throw {message: 'this user is alredy registered!'}
             else 
                dev =  await Dev.create({github_username, name, avatar_url, bio, techs: techsArray, location});
            
            return res.json(dev)
    
        } catch(error){
    
            return res.status(400).send({
                error: error.message || error
             });
        }
    }
}