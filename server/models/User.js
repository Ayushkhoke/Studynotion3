import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,

    },
    accountType: {
        type: String,
        enum: ["Admin", "Student", "Instructor"],
    },
    additionaldetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },

    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }
    ],
    image: {
        type: String,
        required: true,
    },
    courseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseProgress",
        }
    ],
    token: {
        type: String,
    },
    resetpasswordexpires: {
        type: Date
    },
    EnrolledCourses:{
       type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress",
    }

})

export default mongoose.model("User", userSchema);