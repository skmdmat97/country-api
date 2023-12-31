const express = require('express');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const router = new express.Router();
const axios = require("axios")
// Sample username and password for testing
const users = { username: 'skmdmat' };

// Authentication route
router.post('/auth', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (username != process.env.USER_NAME || password!=process.env.PASSWORD) {
           return res.status(404).json({ error: "Invalid credentials" })
        }

        const token = jwt.sign({ username,password }, process.env.JWT_SECRET, { expiresIn: "1h" });
       
        res.status(200).json({token:token})
    }
    catch (err) {
        res.status(404).json({error:err});
    }
});


// Endpoint to fetch country info by name
router.get('/country/:name', auth, async (req, res) => {
    try {
        const { name } = req.params;

        //Fetching data from the REST Countries API
        const countryData = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);

        if (!countryData?.data || countryData?.length == 0) {

            return res.status(404).json({ message: 'Country not found' })
        }
        res.status(200).json({ data: countryData.data });

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})
console.log("here")
// Endpoint to retrieve a list of countries with filters and pagination
router.get('/country', auth, async (req, res) => {
    try {
        const { population, area, language, sort, page = 1, pageSize = 20 } = req.query;
        // Fetch all the country from api
        let response;
        if (language) {
            response = await axios.get(`https://restcountries.com/v3.1/lang/${language}?fields=name,population,area`);
        }
        else response = await axios.get(`https://restcountries.com/v3.1/all?fields=name,population,area,languages`);
        let countries = response.data
        // Apply filters
        if (population) {
            countries = countries.filter(data => data.population >= Number(population));
        }

        if (area) {
            countries = countries.filter(data => data.area >= Number(area));
        }


        // Apply sorting
        if (sort == "asc") {
            countries = countries.sort((a, b) => a.name.common.localeCompare(b.name));
        }
        else if (sort == "desc") {
            countries = countries.sort((a, b) => b.name.common.localeCompare(a.name));
        }

        // Apply pagination
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        countries = countries.slice(startIndex, endIndex);

        // send only country name
        countries = countries.map(data => data.name);

        res.status(200).json(countries);
    }
    catch (err) {
        console.log("error", err);
        res.status(404).json({ error: "not found" })
    }
});

module.exports = router