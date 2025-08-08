// import React from "react";
import { useContext, useRef } from "react";
// import { ResumeContext } from "../../pages/builder";
import { ResumeContext } from "../context/ResumeContext";

import { HighlightMenu } from "react-highlight-menu";
import ContactInfo from "./ContactInfo";
import { CgWebsite } from "react-icons/cg";
import DateRange from "../utility/DateRange";
import Language from "./Language";
import Skills from "./Skills";
import Certification from "./Certification";
import Image from "next/image";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import ContactAndSocialMedia from "./ContactAndSocial";

import EducationSection from "./Education";

import { ImageWrapper, SummaryWrapper, TextWrapper } from "./Common";
import { SkillsWrapper } from "./SkillWrapper";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";

const Template46 = () => {
  const {
    resumeData,
    setResumeData,
    headerColor,
    backgroundColorss,
    selectedFont,
  } = useContext(ResumeContext);
  const templateRef = useRef(null);

  const icons = [
    { name: "github", icon: <FaGithub /> },
    { name: "linkedin", icon: <FaLinkedin /> },
    { name: "twitter", icon: <FaTwitter /> },
    { name: "facebook", icon: <FaFacebook /> },
    { name: "instagram", icon: <FaInstagram /> },
    { name: "youtube", icon: <FaYoutube /> },
    { name: "website", icon: <CgWebsite /> },
  ];
  return (
    <div
      ref={templateRef}
      className=""
      style={{ fontFamily: `${selectedFont}` }}
    >
      <div className="header text-center mb-6">
        <div className="flex justify-center items-center mb-4">
          {/* {resumeData?.profilePicture && (
            <ImageWrapper
              src={resumeData.profilePicture}
              alt="Profile Picture"
            />
          )} */}
        </div>
        <div className="mb-4">
          <TextWrapper
            name={resumeData.name}
            position={resumeData.position}
            headerColor={backgroundColorss}
            orientation="column" // Use "column" for stacked layout
          />
        </div>

        <ContactAndSocialMedia
          contactData={{
            teldata: resumeData.contactInformation,
            emaildata: resumeData.email,
            addressdata: resumeData.address,
          }}
          socialMediaData={resumeData.socialMedia}
          icons={icons}
          layout="row" // or "row"
          contactClass=""
          socialMediaClass=""
          className="justify-center gap-4"
        />
      </div>
      <div className="mb-6">
        <SummaryWrapper
          summary={resumeData.summary}
          headerColor={"black"}
          editable={true} // Set to false if editing is not required
          className="mt-4"
          layout="timeline"
        />
      </div>

      <div className=" mb-6">
        <WorkExperience
          itemClassNames={{
            title: "text-lg font-bold mb-1 border-b-2 border-gray-300 editable",
            company: "font-semibold",
            position: "content",
            location: "sub-content",
          }}
          resumeData={resumeData}
          headerColor={backgroundColorss}
          layout="timeline"
        />
      </div>
      <div className=" mb-6">
        <ProjectsSection
          resumeData={resumeData}
          headerColor={backgroundColorss}
          layout="timeline"
        />
      </div>

      <div className="mb-6">
        <EducationSection
          itemClassNames={{
            school: "",
            degree: "",
            location: "",
          }}
          layout="row"
          newlayout="timeline"
          educationData={resumeData?.education}
          headerColor={backgroundColorss}
        />
      </div>

      <div className=" mb-6">
        <SkillsWrapper
          skills={resumeData.skills}
          headerColor={backgroundColorss}
          droppableId="skills-div-1"
          className="mt-4"
          layout="row"
          textColor="black"
          newlayout="timeline"
        />
      </div>
      <div className=" mb-6">
        <Certification
          title="Certifications"
          certifications={resumeData.certifications}
          hasBullet={false}
          headerColor={"black"}
          newlayout="timeline"
        />
      </div>
      <div className=" mb-6">
        <Language
          title="Languages"
          languages={resumeData.languages}
          headerColor={"black"}
          newlayout="timeline"
        />
      </div>
    </div>
  );
};

export default Template46;
