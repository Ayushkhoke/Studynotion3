import {
  VscAccount,
  VscDashboard,
  VscVm,
  VscAdd,
  VscHistory,
} from "react-icons/vsc";

export const ACCOUNT_TYPE = {
  INSTRUCTOR: "Instructor",
  STUDENT: "Student",
};
export const sidebarLinks=[
    {
        id:1,
        name:"My Profile",
        path:"/dashboard/my-profile",
        icon:VscAccount,
    },
     {
        id:2,
        name:"Dashboard",
        path:"/dashboard/instructor",
        type:ACCOUNT_TYPE.INSTRUCTOR,
        icon:VscDashboard,
    },
     {
        id:3,
        name:"My Course",
        path:"/dashboard/my-courses",
        type:ACCOUNT_TYPE.INSTRUCTOR,
        icon:VscVm,
    },
     {
        id:4,
        name:"Add Courses",
        path:"/dashboard/add-courses",
        type:ACCOUNT_TYPE.INSTRUCTOR,
        icon:VscAdd,
    },
    {
        id:5,
        name:"Enrolled Courses",
          path:"/dashboard/enrolled-courses",
          type:ACCOUNT_TYPE.STUDENT,
            icon:VscHistory,
    },
        {
        id:6,
        name:"Cart",
          path:"/dashboard/cart",
          type:ACCOUNT_TYPE.STUDENT,
            icon:VscHistory,
    },
    {
        id:7,
        name:"all Courses",
          path:"/dashboard/all-courses",
          type:ACCOUNT_TYPE.STUDENT,
            icon:VscHistory,
    }
]