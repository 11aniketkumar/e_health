import express from "express";
import { getAllPosts, savePost } from "../controllers/post.js";
import { user } from "../models/user.js";

const router = express.Router();

router.get("/home", async(req,res)=>{
    const { token } = req.cookies;

    const data = await user.findOne({ _id: token }).populate({
                                                        path: 'details',
                                                        model: 'Doctor'
                                                        });
    const name = data.details.name;

    res.render("doctor_home", { name, specilization:"doctor" });
});

router.get("/post", (req,res)=>{
    res.render("user_post");
});

router.post("/addPost", savePost);

// api used by home page
router.get("/posts", getAllPosts);

router.get("/profile", (req,res)=>{
    res.render("doctor_profile");
});

export default router;
