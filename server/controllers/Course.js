const Course = require("../models/Course");
const Category = require("../models/Category")
const User = require("../models/User");
const { uploadimagetocloudinary } = require('../utils/imageuploader');

//create course handler function 
exports.createCourse = async (req, res) => {
  try {
    //fetch data
    const { courseName, courseDescription, whatyouwilllearn, price, category } = req.body;

    console.log(req.body);
    //get thumbnail
    console.log("Uploaded files:", req.files);

    //request
    const thumbnail = req.files.thumbnailImage;

    if (!req.files || !req.files.thumbnailImage) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail image is missing",
      });
    }
    console.log("Uploaded file details:", req.files.thumbnailImage);
    console.log(thumbnail);

    //validation
    if (!courseName || !courseDescription || !whatyouwilllearn || !price || !category || !thumbnail) {
      return res.status(400).json({
        success: false,
        message: 'fill all the details ',
      });
    }

    //check for innstructor
    const userid = req.user.id;
    const instructdetails = await User.findById(userid);
    console.log("instructor details", instructdetails);


    // too verify tahat userid and instructordetails._id are same or differentt 
    if (!instructdetails) {
      return res.status(400).json({
        success: false,
        message: "instructor details not  found",
      });
    }

    // check give tag is valid or not
    const categorydetails = await Category.findById(category);

    console.log(categorydetails);
    if (!categorydetails) {
      return res.status(400).json({
        success: false,
        message: "category  details not  found",
      })
    }

    //upload image to cloudinary
    const thumbnailimage = await uploadimagetocloudinary(thumbnail, process.env.FOLDER_NAME);

    if (!thumbnailimage) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail image upload failed",
      });
    }

    //create an entry for new course
    const newcourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructdetails._id,
      whatyouwilllearn: whatyouwilllearn,
      price: price,
      category: categorydetails._id,
      thumbnail: thumbnailimage.secure_url,
      studentsEnrolled: [],
      status: "draft",
    })
    console.log(newcourse);

    //add the new course to the user schema of instructor
    await User.findByIdAndUpdate(
      { _id: instructdetails._id },
      {
        $push: {
          courses: newcourse._id,
        }
      },
      { new: true },
    )

    //update the tag schema
    await Category.findByIdAndUpdate(
      { _id: categorydetails._id },
      {
        $push: {
          courses: newcourse._id,
        }
      },
      { new: true },
    )

    //return responssee
    return res.status(200).json({
      success: true,
      message: "course created succesfully",
      data: newcourse,
    })

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "course does not create dsuccesfully",
      error: error.message,
    })
  }
}

//get courses handleer function 
exports.showallcourses = async (req, res) => {
  try {
    const allCourses = await Course.find({}, {
      courseName: true,
       courseDescription: true, 
      price: true,
      thumbnail: true,
      instructor: true,
      ratingandreviews: true,
      studentsEnrolled: true,
    }).populate("instructor").exec();

    return res.status(200).json({
      success: true,
      message: " fetch course data",
      data: allCourses,
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "canot fetch course data",
      error: error.message,
    })
  }
}

//get course detail 
exports.getcoursedetails = async (req, res) => {
  try {
    //get id
    const { courseId } = req.body;
    console.log("Request body:", courseId);

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing course ID",
      });
    }
    //course details
    const coursedetails = await Course.findById({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionaldetails",
        }
      })
      .populate("category")
      // .populate("RatingAndReview")
      .populate({
        path: "courseContent",
        model: "Section",
        populate: {
          path: "subSection",
          model: "SubSection",
        },
      })
      .exec();

    //validation
    if (!coursedetails) {
      return res.status(400).json({
        success: false,
        message: `could not find the corse with ${courseId}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "course detail fetched succesfully",
      data: coursedetails,
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}



exports.editCourse = async (req, res) => {
  try {
    const { courseId, status } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { status },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update course",
    });
  }
};




exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const courses = await Course.find({
      instructor: instructorId,
    });

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch instructor courses",
    });
  }
};


exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    await Course.findByIdAndDelete(courseId);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete course",
    });
  }
};








