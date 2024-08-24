import User from "../models/user.model.js";

export const getUserForSideBar = async( req,res) => {
    try {
        const loggedInUser = req.user._id;

        const filteredUsers = await User.find({ _id:{ $ne: loggedInUser}}).select("-password")

        res.status(200).json(filteredUsers)

    } catch (error) {
        console.error("Error in getUserForSideBar controller",error.message)
        return res.status(500).json({error:"Internal server error"})
    }
}
export const getSearchUserList = async(req, res) => {
    try {
        const loggedInUser = req.user._id;
        const searchString = req.query.search;
        const searchRegex = new RegExp(searchString, 'i'); // 'i' makes the search case-insensitive

        const filteredUsers = await User.find({
            _id: { $ne: loggedInUser },
            $or: [
                { username: searchRegex },
                { email: searchRegex }
            ]
        }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getSearchUserList controller",error.message)
        return res.status(500).json({error:"Internal server error"})
    }
}