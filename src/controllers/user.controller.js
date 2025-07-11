import { asyncHandler } from "../utils/apihandlers.js";
import { User } from "../models/user.models.js";
import {ApiError} from "../utils/apierrors.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiresponse.js";

const registerUser = asyncHandler( async (req, res) =>{
     // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

     const {fullName, email, username, password } = req.body
     console.log("email: ", email);

   res.status(200).json({
    message: "ok"
   })

    // if(fullName === ""){
    //     throw new apierrors(400, "email are required")
    // }

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    
    const userExisted = User.findOne({
        $or: [{username}, {email}]
    })
     
    if(userExisted){
        throw new ApiError(409, "user with this email or username alredy exist")
    }
    
    const avatarLocalPath =    req.files?.avatar[0]?.path;
    const coverImageLocalPath =    req.files?.coverImage[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(409, "avatar image is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
     
     if(!avatar){
        throw new ApiError(409, "avatar image is required")
    }
    
    const user = await User.create({
        fullName,
        email,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCase()

    })

   const createdUser = await User.findById(user._id).select(
        "-password -refreshToken "
    )
    if(!createdUser){
        throw new ApiError(500, "Something Went Wrong while registering")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user register successfully")
    )


})


export {registerUser}