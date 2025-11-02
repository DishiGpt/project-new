import express from "express";
import { login, logout, register, updateProfile, bookmarkJob, getBookmarkedJobs, getProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getProfile);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.route("/bookmark").post(isAuthenticated, bookmarkJob);
router.route("/bookmarks").get(isAuthenticated, getBookmarkedJobs);

export default router;

