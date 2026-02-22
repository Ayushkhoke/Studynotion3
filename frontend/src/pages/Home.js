// import React from 'react'
// import { Link } from 'react-router-dom';
// import { FaArrowRight } from 'react-icons/fa';
// import HighlightText from '../components/core/HomePage/HighlightText'
// import CTABUTTON from '../components/core/HomePage/CTABUTTON.js';
// // import Banner from '../assets/Banner.mp4'
// import CodeBlock from '../components/core/HomePage/CodeBlocks.js'
// import TimeLineSection from '../components/core/HomePage/TimeLineSection.js';
// import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection.js';
// import InstructorSection from '../components/core/HomePage/InstructorSection.js'
// export default function Home() {
//   const Banner =
//   "https://res.cloudinary.com/dqojeedmu/video/upload/v1766492634/codehelp/epb7wkv0e33hai6hmalc.mp4";

//   return (
//     <div className="bg-black">
//       <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">  
//       <Link to={"/signup"}>
//       <div className="mx-auto rounded-full bg-gray-800 font-bold text transition-all duration-200 hover:scale-95 w-[250px]">
//         <div className="flex flex-row mt-[50px]">
//             <p className="pl-[10px]">Become An Instructor </p>
//             <FaArrowRight className="pt-[7px] text-[23px]"/>

//         </div>
//   </div>
//       </Link>

//       <div className="text-white ">
//             <h1 className="text-[25px]">Empower Your Future with
//                 <HighlightText text={"Coding Skills"}/>
//             </h1>
//             <p >With our online coding courses, you can learn at your own pace, from anywhere in the <br/> world, and get access to a wealth of resources, including hands-on projects, quizzes, and <br/> personalized feedback from instructors.</p>
//         </div>

//        <div>
//             <CTABUTTON active={true} linkto={"/signup"}>
//          Learn More
//             </CTABUTTON>
//                    <CTABUTTON active={false} linkto={"/login"}>
//                 Book Demo
//             </CTABUTTON>
//         </div>

//         <div className="shadow-blue-200 w-[1080px]">
//    <video 
//    muted
//    loop
//    autoPlay>
// <source src={Banner} type="video/mp4"/>
//    </video>
//         </div>

//         {/* code section */}
// <div>
//   <CodeBlock 
//   position={"lg:flex-row"}
//   heading={
//     <div className={`text-4xl font-semibold`}>
//       Unlock your
//       <HighlightText text={"coding potential"}/>
//       with our online courses.
//       </div>
//   }
//   subheading={
//     "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."

//   }
//   ctabtn1={
//     {
//       btnText:"try it yourself",
//       linkto:"/signup",
//       active:true,
//     }
//   }

//    ctabtn2={
//     {
//       btnText:"Learn More",
//       linkto:"/login",
//       active:false,
//     }
//   }

// codeblock={
// `<!Doctype Html>\n
// <html>
// <head>
// <title>welcome<title/>
// </head>
// <body>
// <h1> welcome to study notion/>
// </body>
// </html>

// `
// }

//   />
// </div>

// {/* Section-2 */}

// <div>
//   <CodeBlock 
//   position={"lg:flex-row-reverse"}
//   heading={
//     <div className={`text-4xl font-semibold`}>
//       Unlock your
//       <HighlightText text={"coding potential"}/>
//       with our online courses.
//       </div>
//   }
//   subheading={
//     "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."

//   }
//   ctabtn1={
//     {
//       btnText:"try it yourself",
//       linkto:"/signup",
//       active:true,
//     }
//   }

//    ctabtn2={
//     {
//       btnText:"Learn More",
//       linkto:"/login",
//       active:false,
//     }
//   }

// codeblock={
// `<!Doctype Html>\n
// <html>
// <head>
// <title>welcome<title/>
// </head>
// <body>
// <h1> welcome to study notion/>
// </body>
// </html>

// `
// }

//   />
// </div>


// <div className="bg-white text-black ">
// <div className="Homepage_bg h-[310px]" >
//  <div className="w-11/12  flex flex-cols  justify-center items-center gap-5 mx-auto">
// <div className="h-[250px]"></div>
// <div className='flex flex-row gap-7 text-white '>
// <CTABUTTON active={true} linkto={"/signup"}>
// <div className="flex flex-row items-center gap-3  ">
//   Explore Full Catalog
//   <FaArrowRight/>
// </div>
// </CTABUTTON>

// <CTABUTTON active={false} linkto={"/signup"}>
// <div className="flex flex-row items-center gap-3  ">
// Learn More
//   <FaArrowRight/>
// </div>
// </CTABUTTON>
// </div>
//  </div>
// </div>

// <div className="mx-auto w-11/12 max-w-maxContent flex flex-cols items-center justify-between gap-5 mx-auto">
// <div className="flex flex-row gap-5 mb-[50px] mt-[50px]">
// <div className="text-4xl font-semibold w-[45%]">
//   Get the skills you need for a  
//   <HighlightText text={" job that is in demand"}/>
// </div>

// <div className="flex flex-col gap-10 w-[40%] items-start">
// <p className="text-[16px]">
//   The modern StudyNotion is the dictates its own terms. Today, to be a competitive 
//   specialist requires more than professional skills.
// </p>
//     <CTABUTTON active={true} linkto={"/signup"}>
//     <div>
//            Learn More
//     </div>
//             </CTABUTTON>
// </div>

// </div>
// </div>
// </div>

// <TimeLineSection/>
// <LearningLanguageSection/>
//       </div>

//       {/* section 3 */}

//       <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-black text-white  ">
//       <InstructorSection/>

//       <h2 className="text-center text-4xl font-semibold mt-10 ">Review from other learners </h2>
//           {/* Review slider */}
          
//       </div>
//     </div>
//   )
// }


// import React from 'react'
// import { Link } from 'react-router-dom';
// import { FaArrowRight } from 'react-icons/fa';
// import HighlightText from '../components/core/HomePage/HighlightText'
// import CTABUTTON from '../components/core/HomePage/CTABUTTON.js';
// import CodeBlock from '../components/core/HomePage/CodeBlocks.js'
// import TimeLineSection from '../components/core/HomePage/TimeLineSection.js';
// import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection.js';
// import InstructorSection from '../components/core/HomePage/InstructorSection.js'

// export default function Home() {
//   const Banner =
//     "https://res.cloudinary.com/dqojeedmu/video/upload/v1766492634/codehelp/epb7wkv0e33hai6hmalc.mp4";

//   return (
//     <div className="bg-black">
//       <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">

//         {/* Become Instructor */}
//         <Link to={"/signup"}>
//           <div className="mx-auto mt-10 rounded-full bg-gray-800 font-bold transition-all duration-200 hover:scale-95 w-[220px] sm:w-[250px]">
//             <div className="flex items-center justify-center gap-2 py-2">
//               <p>Become An Instructor</p>
//               <FaArrowRight />
//             </div>
//           </div>
//         </Link>

//         {/* Hero Text */}
//         <div className="text-center mt-6 px-2">
//           <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
//             Empower Your Future with{" "}
//             <HighlightText text={"Coding Skills"} />
//           </h1>

//           <p className="text-sm sm:text-base text-gray-300 mt-4 max-w-3xl mx-auto">
//             With our online coding courses, you can learn at your own pace, from
//             anywhere in the world, and get access to hands-on projects, quizzes,
//             and personalized feedback from instructors.
//           </p>
//         </div>

//         {/* CTA Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 mt-6">
//           <CTABUTTON active={true} linkto={"/signup"}>
//             Learn More
//           </CTABUTTON>

//           <CTABUTTON active={false} linkto={"/login"}>
//             Book Demo
//           </CTABUTTON>
//         </div>

//         {/* Video */}
//         <div className="shadow-blue-200 w-full sm:w-[90%] md:w-[1080px] mt-10">
//           <video muted loop autoPlay className="w-full rounded-lg">
//             <source src={Banner} type="video/mp4" />
//           </video>
//         </div>

//         {/* Code Section 1 */}
//         <div className="mt-14 w-full">
//           <CodeBlock
//             position={"lg:flex-row"}
//             heading={
//               <div className="text-2xl sm:text-3xl md:text-4xl font-semibold">
//                 Unlock your <HighlightText text={"coding potential"} /> with our
//                 online courses.
//               </div>
//             }
//             subheading={
//               "Our courses are designed and taught by industry experts who have years of experience."
//             }
//             ctabtn1={{ btnText: "Try it yourself", linkto: "/signup", active: true }}
//             ctabtn2={{ btnText: "Learn More", linkto: "/login", active: false }}
//             codeblock={`<!Doctype Html>\n<html>\n<body>\n<h1>welcome to study notion</h1>\n</body>\n</html>`}
//           />
//         </div>

//         {/* Code Section 2 */}
//         <div className="mt-14 w-full">
//           <CodeBlock
//             position={"lg:flex-row-reverse"}
//             heading={
//               <div className="text-2xl sm:text-3xl md:text-4xl font-semibold">
//                 Unlock your <HighlightText text={"coding potential"} /> with our
//                 online courses.
//               </div>
//             }
//             subheading={
//               "Our courses are designed and taught by industry experts who have years of experience."
//             }
//             ctabtn1={{ btnText: "Try it yourself", linkto: "/signup", active: true }}
//             ctabtn2={{ btnText: "Learn More", linkto: "/login", active: false }}
//             codeblock={`<!Doctype Html>\n<html>\n<body>\n<h1>welcome to study notion</h1>\n</body>\n</html>`}
//           />
//         </div>

//         {/* White Section */}
//         <div className="bg-white text-black w-full mt-20 py-16">
//           <div className="w-11/12 mx-auto flex flex-col md:flex-row gap-10 items-center">
//             <div className="text-2xl md:text-4xl font-semibold md:w-[45%]">
//               Get the skills you need for a{" "}
//               <HighlightText text={"job that is in demand"} />
//             </div>

//             <div className="flex flex-col gap-6 md:w-[40%]">
//               <p className="text-sm sm:text-base">
//                 The modern StudyNotion dictates its own terms. Today, to be
//                 competitive requires more than professional skills.
//               </p>

//               <CTABUTTON active={true} linkto={"/signup"}>
//                 Learn More
//               </CTABUTTON>
//             </div>
//           </div>
//         </div>

//         <TimeLineSection />
//         <LearningLanguageSection />
//       </div>

//       {/* Section 3 */}
//       <div className="w-11/12 mx-auto flex flex-col items-center gap-8 bg-black text-white">
//         <InstructorSection />
//         <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mt-10">
//           Review from other learners
//         </h2>
//       </div>
//     </div>
//   )
// }


import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTABUTTON from '../components/core/HomePage/CTABUTTON'
import CodeBlock from '../components/core/HomePage/CodeBlocks'
import TimeLineSection from '../components/core/HomePage/TimeLineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/Comman/Footer'
export default function Home() {
  const Banner =
    "https://res.cloudinary.com/dqojeedmu/video/upload/v1766492634/codehelp/epb7wkv0e33hai6hmalc.mp4";

  return (
    <div className="bg-black overflow-x-hidden ">
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white">

        {/* Become Instructor */}
        <Link to="/signup">
          <div className="mt-10 rounded-full bg-gray-800 font-bold transition hover:scale-95 
                          w-[200px] sm:w-[250px]">
            <div className="flex items-center justify-center gap-2 py-2">
              <p>Become An Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* Hero */}
        <div className="text-center mt-6 px-4 max-w-4xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            Empower Your Future with{" "}
            <HighlightText text="Coding Skills" />
          </h1>

          {/* <p className="text-sm sm:text-base text-gray-300 mt-4">
            With our online coding courses, you can learn at your own pace,
            from anywhere in the world, and get access to hands-on projects,
            quizzes, and personalized feedback from instructors.
          </p> */}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <CTABUTTON active linkto="/signup">Learn More</CTABUTTON>
          <CTABUTTON active={false} linkto="/login">Book Demo</CTABUTTON>
        </div>

        {/* Video */}
        <div className="shadow-blue-200 w-full max-w-[1080px] mt-10 px-2">
          <video muted loop autoPlay className="w-full rounded-lg">
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1 */}
        <div className="mt-14 w-full">
          <CodeBlock
            position="lg:flex-row"
            heading={
              <div className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                Unlock your <HighlightText text="coding potential" /> with our online courses.
              </div>
            }
            subheading="Our courses are designed and taught by industry experts."
            ctabtn1={{ btnText: "Try it yourself", linkto: "/signup", active: true }}
            ctabtn2={{ btnText: "Learn More", linkto: "/login", active: false }}
            codeblock={`<!DOCTYPE html>\n<html>\n<body>\n<h1>Welcome to StudyNotion</h1>\n</body>\n</html>`}
          />
        </div>

        {/* Code Section 2 */}
        <div className="mt-14 w-full">
          <CodeBlock
            position="lg:flex-row-reverse"
            heading={
              <div className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                Unlock your <HighlightText text="coding potential" /> with our online courses.
              </div>
            }
            subheading="Our courses are designed and taught by industry experts."
            ctabtn1={{ btnText: "Try it yourself", linkto: "/signup", active: true }}
            ctabtn2={{ btnText: "Learn More", linkto: "/login", active: false }}
            codeblock={`<!DOCTYPE html>\n<html>\n<body>\n<h1>Welcome to StudyNotion</h1>\n</body>\n</html>`}
          />
        </div>

        {/* White Section */}
        <div className="bg-white text-black w-full mt-20 py-16 overflow-x-hidden">
          <div className="w-11/12 mx-auto flex flex-col md:flex-row gap-10 items-center">
            <div className="text-2xl md:text-4xl font-semibold md:w-[45%]">
              Get the skills you need for a{" "}
              <HighlightText text="job that is in demand" />
            </div>

            <div className="flex flex-col gap-6 md:w-[40%]">
              <p className="text-sm sm:text-base">
                Today, being competitive requires more than professional skills.
              </p>

              <CTABUTTON active linkto="/signup">Learn More</CTABUTTON>
            </div>
          </div>
        </div>

        <TimeLineSection />
        <LearningLanguageSection />
      </div>

      {/* Section 3 */}
      <div className="w-11/12 mx-auto flex flex-col items-center gap-8 text-white">
        <InstructorSection />
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mt-10">
          Review from other learners
        </h2>
      </div>

      <Footer/>
    </div>
  )
}
