
import User from "../models/User.js";
import Profile from "../models/Profile.js";
import Course from "../models/Course.js";
export async function updateProfile(req, res) {
try{
   
    console.log("Request User:", req.user);
    console.log("Request Body:", req.body);
    //get data
const {dateofBirth="",about="",contactNumber,gender=""}=req.body;

 
//getuserid
const id=req.user.id;
//valsidate  data
if(!contactNumber || !gender  ){
    return res.status(400).json({
        success:false,
        message:"fill all the nescessary details",
    });
}
if (!id) {
    return res.status(400).json({ success: false, message: "User ID is missing" });
}
//find profile
const userdetails=await User.findById(id);
if(!userdetails ){
    return res.status(404).json({
        success:false,
        messsage:"data id not found userdetails"
    })
}

console.log("userdetails",userdetails);
const profileId=userdetails.additionaldetails;
if(!profileId ){
    return res.status(404).json({
        success:false,
        messsage:"data id not found profileid"
    })
}
console.log("profileId",profileId);
const profileDetails=await Profile.findById(profileId);
// i have updated this part
if( !profileDetails){
    return res.status(404).json({
        success:false,
        messsage:"data id not found profileDetails "

    })
}

console.log("profiledetails=",profileDetails);
//updateprofie
// profileDetails.dateofBirth =  profileDetails.dateofBirth;
// profileDetails.about = profileDetails.about;
// profileDetails.contactNumber = profileDetails.contactNumber;
// profileDetails.gender =  profileDetails.gender;


profileDetails.dateofBirth = dateofBirth;
profileDetails.about = about;
profileDetails.contactNumber = contactNumber;
profileDetails.gender = gender;

await profileDetails.save();



if (!profileDetails) {
    return res.status(404).json({ success: false, message: "Profile not found" });
}
//return response
return res.status(200).json({
    success:true,
    message:"profile details created succesfully",
    profileDetails,
})
}
catch(error){
return res.status(500).json({
    success:false,
    message:"profile details not created succesfully",
    })
}
}


//how can we schedule this operation deletion
 
//delete acccount
export async function deleteaccount(req, res) {
    try{
     //get id
const id=req.user.id;
//  validate whether it is valid user or not
const userDetails=await User.findById(id);
if(!userDetails){
    return res.status(404).json({
        success:false,
        message:"user not found",
    });
}

//delete profile
await Profile.findByIdAndDelete({_id:userDetails.additionaldetails});
//delete user
await User.findByIdAndDelete({_id:id});

//todo hw unenrooled from all enrolled courses


//return resoponse 
return res.status(200).json({
    success:true,
    message:"user deleted succesfully",
})
}
    catch(error){
        return res.status(500).json({
            success:false,
            message:"user  not deleted succesfully",
        })
    }
}



export async function getuserdetails(req, res) {
    try{
       
    if ( !req.user.id || !req.user) {
        return res.status(400).json({
            success: false,
            message: "User ID not found in request",
        });
    }
    const id=req.user.id;
    console.log("req.user.id=",id);
    //get user details
   const userDetails=await User.findById(id).populate("additionaldetails").exec();

   console.log("getuserdetails+",userDetails);
   if(!userDetails){
    return res.status(404).json({
        success:false,
        message:'user not found',
    })
   }
    //validation
    return res.status(200).json({
        success:true,
        message:"user data fetched successfuly",
        userDetails
    })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"user data  not fetched successfuly",
        })
    }
}


//get  Enrolled course




// // Fetch enrolled courses for the authenticated user
// exports.getEnrolledCourses = async (req, res) => {
//     try {
//         const userId = req.user.id; // set by your auth middleware

//         const user = await User.findById(userId).populate("courses").exec();
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         const enrolledCourses = Array.isArray(user.courses) ? user.courses : [];

//         return res.status(200).json({
//             success: true,
//             data: enrolledCourses
//         });

//     } catch (error) {
//         console.error("Error fetching enrolled courses:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to fetch enrolled courses"
//         });
//     }
// };




export async function getEnrolledCourses(req, res) {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate("courses")
      .exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
        // Debug log: print enrolled courses
        console.log("Enrolled courses for user:", user.courses);

    return res.status(200).json({
      success: true,
      data: user.courses || [],
    });

  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch enrolled courses",
    });
  }
};
