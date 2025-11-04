import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();
router.route("/").get(getAllJobs);      

router.route("/post").post(isAuthenticated, postJob);
// Public: allow non-authenticated users to fetch job listings
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
// Public: allow fetching a single job by id
router.route("/get/:id").get(getJobById);

export default router;

