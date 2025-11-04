import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        console.log("📥 getAllJobs called - keyword:", req.query.keyword || "(none)");
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } },
                { jobType: { $regex: keyword, $options: "i" } },
            ]
        };
        console.log("🔍 Finding jobs with query...");
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        console.log(`✅ Found ${jobs?.length || 0} jobs`);
        if (!jobs || jobs.length === 0) {
            console.log("⚠️  No jobs found, returning empty array");
            return res.status(200).json({
                jobs: [],
                success: true,
                message: "No jobs found"
            })
        };
        console.log(`📤 Sending ${jobs.length} jobs to frontend`);
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.error("❌ Error in getAllJobs:", error);
        console.error("Stack:", error.stack);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
