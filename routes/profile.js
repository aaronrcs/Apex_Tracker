const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
//Routes
router.get('/:platform/:gamertag', async (req,res) =>{
    try {

        // Need to send API Key as a header
        const headers = {
            'TRN-Api-Key': process.env.TRACKER_API_KEY
        }

        // Using Destructuring to set paramaters as separate variables
        const { platform, gamertag } = req.params;

        // Using Node Fetch to request data to API
        const response = await fetch(`${process.env.TRACKER_API_URL}/profile/${platform}/${gamertag}`, 
        {
            headers
        })

        const data = await response.json();

        if(data.errors && data.errors.length > 0){
            return res.status(404).json({
                message:"Profile Not Found"
            })
        }

        res.json(data);

        
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Server Error'
        })
    }
})

module.exports = router;