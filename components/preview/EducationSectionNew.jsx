import React, { useContext } from "react";
import DateRange from "../utility/DateRange";
import { ResumeContext } from "../context/ResumeContext";

const EducationSectionNew = ({
  educationData,
  headerColor,
  className = "",
  layout = "column", // "column" or "row"
}) => {
  const { backgroundColorss } = useContext(ResumeContext);
  if (!educationData || educationData.length === 0) return null;

  return (
    <div className={`mb-1 ${className}`}>
      <h2
        style={{
          color: `${
            headerColor == "black" ? `${backgroundColorss}` : headerColor
          }`,
        }}
        className="text-xl font-semibold mb-6"
        contentEditable
        suppressContentEditableWarning
      >
        EDUCATION
      </h2>

      <div className="relative">
        {/* Vertical timeline line */}
        <div
          className="absolute left-1/4 transform -translate-x-1/2 w-0.5 bg-gray-300"
          style={{
            top: "0",
            bottom: "0",
            height: "100%",
          }}
        />

        {educationData.map((item, index) => (
          <div key={index} className="relative mb-8">
            {/* Timeline bullet point */}
            <div
              className="absolute left-1/4 transform -translate-x-1/2 w-3 h-3 bg-black rounded-full z-10"
              style={{ top: "0.5rem" }}
            />

            <div className="flex">
              {/* Left Column - Dates and Location */}
              <div className="w-1/4 text-left">
                <div className="mb-2">
                  <DateRange
                    layout={layout}
                    startYear={item.startYear}
                    endYear={item.endYear}
                    className=""
                  />
                </div>
                <div className="text-sm text-gray-600">
                  {item.location?.split(",")[0]?.trim()}
                </div>
              </div>

              {/* Right Column - Education Details */}
              <div className="w-3/4 pl-8">
                <div className="mb-2">
                  <h3
                    className="font-medium text-lg mb-1"
                    contentEditable
                    suppressContentEditableWarning
                    style={{
                      color:
                        layout === "row" || headerColor == "black"
                          ? "black"
                          : "white",
                    }}
                  >
                    {item.degree}
                  </h3>
                  <h4
                    className="font-medium text-base mb-1"
                    contentEditable
                    suppressContentEditableWarning
                    style={{
                      color:
                        layout === "row" || headerColor == "black"
                          ? "black"
                          : "white",
                    }}
                  >
                    {item.school}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationSectionNew;
