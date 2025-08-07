import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DateRangeExperience from "../utility/DateRangeExperience";

const WorkExperienceNew = ({
  resumeData,
  headerColor,
  className = "",
  style = {},
  itemClassNames = {},
}) => {
  if (
    resumeData.is_fresher ||
    !resumeData?.workExperience ||
    resumeData.workExperience.length === 0
  ) {
    return null;
  }

  return (
    <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={className}
          style={style}
        >
          <h2
            className={`${
              itemClassNames.title || "font-semibold text-xl mb-6"
            }`}
            contentEditable
            suppressContentEditableWarning
            style={{
              color: headerColor,
            }}
          >
            EXPERIENCE
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

            {resumeData.workExperience.map((item, index) => (
              <Draggable
                key={`${item.company}-${index}`}
                draggableId={`WORK_EXPERIENCE-${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`relative mb-8 ${itemClassNames.content || ""} ${
                      snapshot.isDragging
                        ? "outline-dashed outline-2 outline-gray-400 bg-white"
                        : ""
                    }`}
                  >
                    {/* Timeline bullet point */}
                    <div
                      className="absolute left-1/4 transform -translate-x-1/2 w-3 h-3 bg-black rounded-full z-10"
                      style={{ top: "0.5rem" }}
                    />

                    <div className="flex">
                      {/* Left Column - Dates and Location */}
                      <div className="w-1/4 text-left">
                        <div className="mb-2">
                          <DateRangeExperience
                            startYear={item.startYear}
                            endYear={item.endYear}
                            id={`work-experience-start-end-date-${index}`}
                            className=""
                          />
                        </div>
                        <div className="text-sm text-gray-600">
                          {item.location?.split(",")[0]?.trim()}
                        </div>
                      </div>

                      {/* Right Column - Job Details */}
                      <div className="w-3/4 pl-8">
                        <div className="mb-2">
                          <h3
                            className="font-medium text-lg mb-1"
                            contentEditable
                            suppressContentEditableWarning
                          >
                            {item.position}
                          </h3>
                          <h4
                            className="font-medium text-base mb-1"
                            contentEditable
                            suppressContentEditableWarning
                          >
                            {item.company}
                          </h4>
                          <p className="text-sm text-gray-600 mb-3">
                            A company operating in the{" "}
                            {item.industry || "technology"} domain
                          </p>
                        </div>

                        {/* Responsibilities */}
                        <div
                          className="hover:outline-dashed hover:outline-2 hover:outline-gray-400 font-light text-sm mb-3"
                          contentEditable
                          suppressContentEditableWarning
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />

                        {/* Key Achievements */}
                        {Array.isArray(item?.keyAchievements) &&
                          item.keyAchievements.length > 0 && (
                            <Droppable
                              droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
                              type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
                            >
                              {(provided) => (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                >
                                  <h5 className="font-medium text-sm mb-2">
                                    Key Achievements:
                                  </h5>
                                  <ul className="list-disc pl-4 font-light text-sm">
                                    {item.keyAchievements.map(
                                      (achievement, subIndex) => (
                                        <Draggable
                                          key={`ACHIEVEMENT-${index}-${subIndex}`}
                                          draggableId={`ACHIEVEMENT-${index}-${subIndex}`}
                                          index={subIndex}
                                        >
                                          {(provided, snapshot) => (
                                            <li
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className={`hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400 mb-1 ${
                                                snapshot.isDragging
                                                  ? "outline-dashed outline-2 outline-gray-400 bg-white"
                                                  : ""
                                              }`}
                                            >
                                              <div
                                                dangerouslySetInnerHTML={{
                                                  __html: achievement,
                                                }}
                                                contentEditable
                                                suppressContentEditableWarning
                                              />
                                            </li>
                                          )}
                                        </Draggable>
                                      )
                                    )}
                                    {provided.placeholder}
                                  </ul>
                                </div>
                              )}
                            </Droppable>
                          )}
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default WorkExperienceNew;
