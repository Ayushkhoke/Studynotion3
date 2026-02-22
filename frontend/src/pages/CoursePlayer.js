import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCoursesVideo } from "../services/courseDetailAPI";

export default function CoursePlayer() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [courseData, setCourseData] = useState(null);
  const [currentVideo, setCurrentVideo] = useState("");

  useEffect(() => {
    async function fetchCourse() {
      try {
        const courseDetails = await getCoursesVideo({
          token,
          courseId,
        });

        if (!courseDetails) return;

        setCourseData(courseDetails);

        // ✅ auto-play first lecture
        const firstVideo =
          courseDetails.courseContent?.[0]?.subSection?.[0]?.videoUrl;

        if (firstVideo) {
          setCurrentVideo(firstVideo);
        }
      } catch (error) {
        console.log("Error fetching course:", error);
      }
    }

    if (courseId && token) {
      fetchCourse();
    }
  }, [courseId, token]);

  if (!courseData) {
    return <p className="text-white p-6">Loading course...</p>;
  }

  return (
    <div className="flex h-screen text-white">

      {/* LEFT — VIDEO PLAYER */}
      <div className="flex-1 p-6 bg-black">
        {currentVideo ? (
          <video
            key={currentVideo}
            src={currentVideo}
            controls
            autoPlay
            className="w-full h-[70vh] rounded-lg"
          />
        ) : (
          <p>No video selected</p>
        )}
      </div>

      {/* RIGHT — COURSE CONTENT */}
      <div className="w-[350px] bg-gray-900 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">
          {courseData.courseName}
        </h2>

        {courseData.courseContent?.map((section) => (
          <div key={section._id} className="mb-4">
            <p className="font-semibold text-yellow-400">
              {section.sectionName}
            </p>

            {section.subSection?.map((lecture) => (
              <p
                key={lecture._id}
                onClick={() => setCurrentVideo(lecture.videoUrl)}
                className={`cursor-pointer mt-2 p-2 rounded 
                  ${
                    currentVideo === lecture.videoUrl
                      ? "bg-yellow-500 text-black"
                      : "hover:bg-gray-800"
                  }`}
              >
                ▶ {lecture.title}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
