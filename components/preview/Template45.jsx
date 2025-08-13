import { useContext, useRef } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { HighlightMenu } from "react-highlight-menu";
import ContactInfo from "./ContactInfo";
import { CgWebsite } from "react-icons/cg";
import DateRange from "../utility/DateRange";
import Language from "./Language";
import Skills from "./Skills";
import Certification from "./Certification";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaBold,
  FaItalic,
  FaPlus,
  FaMinus,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaLink,
  FaUnderline,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import dynamic from "next/dynamic";
import ContactAndSocialMedia from "./ContactAndSocial";
import { SummaryWrapper, TextWrapper, ImageWrapper } from "./Common1";
import { SkillsWrapper } from "./SkillWrapper";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";
import EducationSection from "./Education";
import ContactAndSocialMedia2 from "./ContactAndSocial2";
import EducationSection1 from "./Education1";

const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);
const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false }
);

const Template45 = () => {
  const templateRef = useRef(null);

  const extractHtml = () => {
    const htmlContent = templateRef.current?.outerHTML;
    console.log(htmlContent);
    return htmlContent;
  };

  const {
    resumeData,
    setResumeData,
    headerColor,
    backgroundColorss,
    selectedFont,
  } = useContext(ResumeContext);

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
      <div className="p-4" style={{ backgroundColor: backgroundColorss }}>
        <div
          style={{ borderBottom: `2px solid ${backgroundColorss}` }}
          className={`mb-2 flex justify-center items-center `}
        >
          <TextWrapper
            name={resumeData.name}
            position={resumeData.position}
            orientation="column" // Use "column" for stacked layout
            nameclassName="text-white"
            positionclassName="text-white"
          />
        </div>
      </div>
      <div className=" mx-auto flex">
        {/* Left Column */}
        <div className="left-column w-8/12 p-4 border-r border-gray-300">
          {/* Header Section with TextWrapper and conditional ImageWrapper */}

          {/* Rest of the left column content */}
          <div className="flex flex-col gap-4">
            <div className="col-span-2 space-y-2">
              <SummaryWrapper
                summary={resumeData.summary}
                headerColor={"black"}
                editable={true}
                className=""
              />
              <WorkExperience
                itemClassNames={{
                  title: "text-xl font-semibold mb-1 editable",
                  company: "",
                  position: "",
                  location: "",
                }}
                resumeData={resumeData}
                headerColor={backgroundColorss}
              />
              <ProjectsSection
                resumeData={resumeData}
                headerColor={backgroundColorss}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div
          className="right-column w-4/12  pl-4 pt-4"
          //   style={{ backgroundColor: backgroundColorss }}
        >
          <div className=" ">
            <div className="mb-5">
              <ContactAndSocialMedia2
                title="Contacts"
                contactData={{
                  teldata: resumeData.contactInformation,
                  emaildata: resumeData.email,
                  addressdata: resumeData.address,
                }}
                socialMediaData={resumeData.socialMedia}
                icons={icons}
                layout="column" // or "row"
                contactClass=""
                socialMediaClass=""
                //   textColor="text-white"
              />
            </div>
            <div className="mb-5">
              <EducationSection1
                itemClassNames={{
                  school: "",
                  degree: "",
                  location: "",
                }}
                layout="column"
                educationData={resumeData?.education}
                headerColor={backgroundColorss ? "black" : "white"}
              />
            </div>
            <div className="mb-5">
              <Certification
                title="Certifications"
                certifications={resumeData.certifications}
                hasBullet={true}
                headerColor={backgroundColorss ? "black" : "black"}
              />
            </div>

            <div className="mb-5">
              <SkillsWrapper
                skills={resumeData.skills}
                //   headerColor={backgroundColorss ? "white" : "black"}
                droppableId="skills-section-1"
                className="mt-4"
                textColor="black"
                layout="column"
              />
            </div>
            <div className="mb-5">
              <Language
                title="Languages"
                languages={resumeData.languages}
                headerColor={backgroundColorss ? "black" : "black"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template45;
