import express from "express";
import signUp from '../controllers/authControllers/signUp.controllers.js';
import signIn from '../controllers/authControllers/signIn.controllers.js';
import signOut from "../controllers/authControllers/signOut.controllers.js";

import verifyEmail from "../controllers/authControllers/verifyEmail.controller.js";

const route = express.Router();

route.post("/signUp", signUp);

route.get("/verify",verifyEmail)


route.post("/signIn", signIn);
route.post("/signOut", signOut);

export default route;
