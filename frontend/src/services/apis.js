// const BASE_URL = "https://studynotion3-3.onrender.com/api/v1";
//https://studynotion-online-platform.onrender.com
const BASE_URL = "https://studynotion3-3.onrender.com/api/v1";
export const categories={
    CATEGORIES_API:BASE_URL+"/course/showallCategory"
}

export const auth={
    SENDOTP_API:BASE_URL+"/auth/sendotp",
    SIGNUP_API:BASE_URL+"/auth/signup",
    LOGIN_API:BASE_URL+"/auth/login",
    CONTACT_API:BASE_URL+"/auth/contact",
}
export const resetpassword={
    RESETPASSWORDTOKEN_API:BASE_URL+"/auth/reset-Password-Token",
    RESETPASSWORD_API:BASE_URL+"/auth/reset-Password"
}


export const profile={
    ENROLLED_COURSES_API:BASE_URL+"/profile/getEnrolledCourses"
}

export const course={
    COURSE_CATEGORRIES_API: BASE_URL+"/course/showallCategory",
    CREATE_COURSE_API:BASE_URL+"/course/createCourse",
    CREATE_SECTION_API:BASE_URL+"/course/addSection",
    UPDATE_SECTION_API:BASE_URL+"/course/updateSection",
    CREATE_SUBSECTION_API:BASE_URL+"/course/addSubSection",
    UPDATE_SUBSECTION_API:BASE_URL+"/course/updateSubSection",
    DELETE_SECTION_API:BASE_URL+"/course/deleteSection",
    DELETE_SUBSECTION_API:BASE_URL+"/course/deleteSubSection",
    SHOW_ALL_COURSES_API:BASE_URL+"/course/showallcourses",
      EDIT_COURSE_API: BASE_URL+"/course/editCourse", 
      INSTRUCTOR_COURSES_API: BASE_URL + "/course/instructor-courses",
      DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
}

export const student = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API:
    BASE_URL + "/payment/sendPaymentSuccessEmail",
};
