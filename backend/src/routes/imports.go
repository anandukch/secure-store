package routes

import (
	"pass-saver/src/controllers"
	"pass-saver/src/middlewares"
)

// middlewares
var AuthMiddleWare = middlewares.AuthMiddleWare

//controllers
var CreateUser = controllers.CreateUser
var SignIn = controllers.SignIn

const USERS = "users"
const VAULT = "vault"