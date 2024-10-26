const express = require('express');
const router = express.Router();

const shortid= require('shortid');
const Url = require('../models/Url.js');



router.post('/shorten',async (req,res)=>{
    const {originalUrl}=req.body;
    const shortUrl= shortid.generate();
    const url=new Url({originalUrl,shortUrl,userId:req.user.userId});
    try {
        await url.save();
        res.status(201).json({ shortUrl });
    } catch (error) {
        res.status(400).json({ error });
    }
})
router.get('/redirecturl/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    console.log("Received shortUrl:", shortUrl);  // Debugging line
    try {
        const urlentry = await Url.findOne({ shortUrl });
        if (!urlentry) return res.status(404).json({ error: 'URL not found' });
        urlentry.clickCount += 1;
        await urlentry.save();
        return res.redirect(urlentry.originalUrl);
    } catch (error) {
        console.error("Error in redirect:", error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/dashboard',async (req,res)=>{
    try {
        // Fetch all URLs created by the user
        const urls = await Url.find({ userId: req.user.userId });
    
        // Aggregate the count of URLs created per day for the user
        const countPerDay = await Url.aggregate([
            { $match: { userId: req.user.userId } }, // Filter URLs by user ID
            { 
                $group: { 
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by day
                    count: { $sum: 1 } // Count how many URLs were created on that day
                }
            },
            { 
                $sort: { _id: 1 } // Sort by date in ascending order (optional)
            }
        ]);
    
        // Send the response with URLs and the count per day
        res.status(200).json({ urls, countPerDay });
    
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
});

const UrlRouter = router;

module.exports = UrlRouter;