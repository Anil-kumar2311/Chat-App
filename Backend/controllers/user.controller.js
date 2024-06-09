import User from "../models/user.model.js";

export const getUserForSideBar = async( req,res) => {
    try {
        const loggedInUser = req.user._id;

        const filteredUser = await User.find({ _id:{ $ne: loggedInUser}}).select("-password")

        res.status(200).json(filteredUser)

    } catch (error) {
        console.error("Error in getUserForSideBar controller",error.message)
        return res.status(500).json({error:"Internal server error"})
    }
}