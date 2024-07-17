const express = require("express")
const Router = express.Router()

//controllers
const { signup, signin, signout } = require("../controller/user")

Router.post("/signup", signup)

Router.post("/signin", signin)

Router.post("/signout", signout)

module.exports = Router