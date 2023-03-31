const express = require('express');
const User = require('../models/User');
const auth = require("../middleware/auth");
const { json } = require('body-parser');
const router = express.Router();

router.post("/user/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        
        const token = await user.generateAuthToken()

        res.send({ user, token })

    } catch (error) {
        res.status(400).send(error)
    }
})
router.post("/user/logout", async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })

        await req.user.save()
    } catch (error) {
        res.status(500).send()
    }
})
router.post("/user/add", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/user/get/me", auth, async (req, res) => {

    const _id = req.user._id

    try {

        const users = await User.find({ _id })
        res.status(200).send(users)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.patch("/user/update/:id", async (req, res) => {
    try {
        const updatedName = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!updatedName) {
            return res.status(404).send()
        }
        res.status(200).send(updatedName)

    } catch (error) {
        res.status(400).send(error)
    }
});


module.exports = router;