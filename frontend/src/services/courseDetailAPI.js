import {toast} from 'react-hot-toast';
import {course} from './apis'
import { apiConnector } from './apiconnector';




import axios from "axios";

export const getAllCourses = async (token) => {
  try {
    const res = await apiConnector("GET", course.SHOW_ALL_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    });

    // ✅ GUARANTEE ARRAY
    return res?.data?.data ?? [];
  } catch (error) {
    console.log("GET ALL COURSES ERROR:", error);
    return [];
  }
};




export const fetchCourseCategories = async (token) => {
    let result = [];
    try {
        // Pass token in headers
       const headers = {
  Authorization: `Bearer ${token}`,
};
console.log("Extracted Token:", token);

        const res = await apiConnector("GET", course.COURSE_CATEGORRIES_API, null, headers);
        console.log("res", res);

        if (!res.data.success) {
            throw new Error("Could not fetch course categories");
        }

        result = res.data.allCategory;
    } catch (error) {
        console.log("course_category_API Error", error);
    }

    return result;
};

export const  addCourseDetails=async(token,formdata)=>{
    try{
 const headers = {
  Authorization: `Bearer ${token}`,
};
console.log("Extracted Token:", token);
    const res=await apiConnector("POST", course.CREATE_COURSE_API,formdata,headers);
    if(!res.data.success){
        throw new Error("could not fetch create course");
    }
      return res.data.data;
    }
    catch(error){
         console.log("course_addcourse_API Error", error);
          throw error;
    }
}



export const  editCourseDetails=async(token,formdata)=>{
    try{
 const headers = {
  Authorization: `Bearer ${token}`,
};
console.log("Extracted Token:", token);
    const res=await apiConnector("PUT", course.EDIT_COURSE_API,formdata,headers);
    if(!res.data.success){
        throw new Error("could not fetch create course");
    }
       return res.data.data;
    }
    catch(error){
         console.log("course_addcourse_API Error", error);
          throw error;
    }
}



export const updateSection=async(data,token)=>{
    
    try{
        const headers={
            Authorization:`Bearer ${token}`,
        }
  const res=await apiConnector("POST",course.UPDATE_SECTION_API,data,
    headers)
        if(!res.data.success){
        throw new Error("could not fetch create course");
    }
     return res.data.section;
     }
     catch(error){
            console.log("update_section_api Error", error);
          throw error;
     }
}




export const createSection=async(data,token)=>{
    
    try{
        const headers={
            Authorization:`Bearer ${token}`,
        }
  const res=await apiConnector("POST",course.CREATE_SECTION_API,data,
    headers)
        if(!res.data.success){
        throw new Error("could not fetch create course");
    }
      toast.success("created section")
   return res.data.data;

 
     }
     catch(error){
            console.log("update_section_api Error", error);
          throw error;
     }
}

export const deleteSection = async ({ sectionId, courseId, token }) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res = await apiConnector(
      "POST",
      course.DELETE_SECTION_API,
      { courseId, sectionId },
      headers
    );

    console.log("delete formdata", res.data);

    if (!res.data.success) {
      throw new Error("Could not delete section");
    }

    toast.success("Section deleted successfully");
    return res.data.data; // ✅ full updated course
  } catch (error) {
    console.log("Delete_section_api Error:", error);
    toast.error("Failed to delete section");
    return null;
  }
};



export const createSubsection = async (formData, token) => {
  

  try {
    const headers = {
    Authorization: `Bearer ${token}`,
    // ⚠️ Don't manually set multipart/form-data
  };
   console.log(" Sending FormData:", [...formData.entries()]);

    const res = await apiConnector("POST", course.CREATE_SUBSECTION_API, formData, headers);
    console.log("sending formdata",res.data)
    if (!res.data.success) {
      throw new Error("Could not create subsection");
    }
    toast.success("Subsection created successfully");
   return res.data.data ;

  } catch (error) {
    console.log("create_subsection_api Error:", error);
    // show server provided message when available
    const serverMessage = error?.response?.data?.message || error?.message;
    toast.error(serverMessage || "Failed to upload subsection");
    // rethrow so callers can handle if needed
    throw error;
  }
};



export const deleteSubSection = async ({subSectionId, sectionId,token}) => {
  

  try {
    const headers = {
    Authorization: `Bearer ${token}`,
    // ⚠️ Don't manually set multipart/form-data
  };


    const res = await apiConnector("POST", course.DELETE_SUBSECTION_API, { subSectionId, sectionId }, headers);
    console.log("delete formdata",res.data)
    if (!res.data.success) {
      throw new Error("Could not delete subsection");
    }
    toast.success("Subsection deleted  successfully");
   return res.data.data ;

  } catch (error) {
    console.log("Delete_subsection_api Error:", error);
    toast.error("Failed to delete subsection");
  }
};


export const updatesubsection=async(formData,token)=>{
       const header={
            Authorization:`Bearer ${token}`,
        }
    try{
 const res=await apiConnector("POST",course.UPDATE_SUBSECTION_API,formData,header)
   if(!res.data.success){
    throw new Error("could not update subsection");
   } 
   toast.success("updated Subsection");
    // controller returns updated subsection or updated course depending on implementation
    // prefer returning updated course details if present
    return res.data.data || res.data.updatedCoursedetails || res.data;
    }
    catch(error){
  console.log("update subsection api  Error", error);
          throw error;
    }
}



export const getCoursesVideo = async ({ token, courseId }) => {
  try {
    const response = await apiConnector(
      "POST",
      course.GET_COURSE_DETAILS_API,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response?.data?.data; // full course
  } catch (error) {
    console.log("GET COURSE VIDEO ERROR:", error);
    return null;
  }
};

