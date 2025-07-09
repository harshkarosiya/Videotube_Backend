import { asyncHandler } from "../utils/apihandlers.js";

const registerUser = asyncHandler( (req, res) =>{
    res.status(200).json({
        message: "harsh sbka papa"
    })
})


export {registerUser}