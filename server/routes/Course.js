const express=require("express");
const router=express.Router();

const {createCourse,getcoursedetails,showallcourses,editCourse ,getInstructorCourses,deleteCourse,getFullCourseContent}=require("../controllers/Course");

//categories controllers import
const{
    showallCategory,createCategory,categorypagedetails}=require("../controllers/Category");

    //cerate sections routess 
const{
    createSection , updateSection , deleteSection,
} =require("../controllers/Section");

const{
    createSubsection, updatesubsection ,deleteSubSection
}=require("../controllers/Subsection");



const{
    createrating,getAverageRating,getAllRatingAndreview
}=require("../controllers/RatingAndReview");

//importing  middelwware 
const{auth,isInstructor,isStudent,isadmin}=require("../middleware/auth");


//course routess

router.post("/createCourse",auth,isInstructor,createCourse);
//add asection to course 
router.post("/addSection",auth,isInstructor,createSection);
//update a section
router.post("/updateSection",auth,isInstructor,updateSection);
//delete section
router.post("/deleteSection",auth,isInstructor,deleteSection);

//edit dubsection
router.post("/updateSubsection",auth,isInstructor,updatesubsection);
//delete subsection
router.post("/deletesubsection",auth,isInstructor,deleteSubSection);

//add a subsection to  sectio
router.post("/addSubSection",auth,isInstructor,createSubsection);


//
router.post("/getCourseDetails",getcoursedetails);
//  course content
// router.get(
//   "/course/:courseId/content",
//   auth,
 
//   getFullCourseContent
// );


//geta all registered courses
router.get("/showallcourses",showallcourses);

//show all category
router.get("/showallCategory",auth,isInstructor,showallCategory);
//create category
router.post("/createCategory",createCategory);
//category page details
router.post("/categoryPageDetails",categorypagedetails);

//rating
router.post('/createRating',auth,isStudent,createrating)
router.get("/getAverageRating",getAverageRating)
router.get("/getReviews",getAllRatingAndreview)
router.put("/editCourse", auth, isInstructor, editCourse);


console.log("createCourse:", createCourse);

console.log("getCourseDetails:", getcoursedetails);

router.get(
  "/instructor-courses",
  auth,
  isInstructor,
  getInstructorCourses
);

router.delete(
  "/deleteCourse/:courseId",
  auth,
  isInstructor,
  deleteCourse
);

module.exports=router;
