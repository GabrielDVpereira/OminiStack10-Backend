const Dev = require('../models/User');
const parseToArray = require('../utils/ParseToArray');

module.exports = {
    async index(req,res){
        //Search for users in a range of 10 km 
        // filter users by its techs 
        const { latitude, longitude, techs } = req.query; 
        const techsArray = parseToArray(techs);
        try {
            const devs = await Dev.find({
                techs:{
                    $in: techsArray,
                },
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude],
                        },
                        $maxDistance: 10000, 
                    },
                },
            });
            
            return res.json({devs});
        } catch(error){
            res.status(400).json({error: error.message || error})
        }
    }
}