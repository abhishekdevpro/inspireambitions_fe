import React from "react";
import dynamic from "next/dynamic";
import DateRange from "../utility/DateRange";
import Link from "next/link";
import DateRangeExperience from "../utility/DateRangeExperience";
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
const ProjectsSectionNew = ({ resumeData, headerColor }) => {
  if (!resumeData?.projects || resumeData.projects.length === 0) {
    return null;
  }

  return (
    <Droppable droppableId="projects" type="PROJECTS">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <h2
            className="text-xl font-semibold mb-6"
            contentEditable
            suppressContentEditableWarning
            style={{
              color: headerColor,
            }}
          >
            PROJECTS
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

            {resumeData.projects.map((item, index) => (
              <Draggable
                key={`${item.name}-${index}`}
                draggableId={`PROJECTS-${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`relative mb-8 ${
                      snapshot.isDragging &&
                      "outline-dashed outline-2 outline-gray-400 bg-white"
                    }`}
                  >
                    {/* Timeline bullet point */}
                    <div
                      className="absolute left-1/4 transform -translate-x-1/2 w-3 h-3 bg-black rounded-full z-10"
                      style={{ top: "0.5rem" }}
                    />

                    <div className="flex">
                      {/* Left Column - Dates */}
                      <div className="w-1/4 text-left">
                        <div className="mb-2">
                          <DateRangeExperience
                            startYear={item.startYear}
                            endYear={item.endYear}
                            id={`projects-start-end-date-${index}`}
                            className=""
                          />
                        </div>
                      </div>

                      {/* Right Column - Project Details */}
                      <div className="w-3/4 pl-8">
                        <div className="mb-2">
                          <h3
                            className="font-medium text-lg mb-1"
                            contentEditable
                            suppressContentEditableWarning
                          >
                            {item.name}
                          </h3>
                          <Link
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline mb-2 block"
                            contentEditable
                            suppressContentEditableWarning
                          >
                            {item.link}
                          </Link>
                        </div>

                        {/* Project Description */}
                        <div
                          className="hover:outline-dashed hover:outline-2 hover:outline-gray-400 font-light text-sm mb-3"
                          contentEditable
                          suppressContentEditableWarning
                          dangerouslySetInnerHTML={{
                            __html: item.description,
                          }}
                        />

                        {/* Key Achievements */}
                        {Array.isArray(item?.keyAchievements) &&
                          item.keyAchievements.length > 0 && (
                            <Droppable
                              droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                              type="PROJECTS_KEY_ACHIEVEMENT"
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
                                          key={`${item.name}-${index}-${subIndex}`}
                                          draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                          index={subIndex}
                                        >
                                          {(provided, snapshot) => (
                                            <li
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className={`hover:scale-105 transition-transform duration-300 hover:outline-dashed hover:outline-2 hover:outline-gray-400 mb-1 ${
                                                snapshot.isDragging &&
                                                "outline-dashed outline-2 outline-gray-400 bg-white"
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

export default ProjectsSectionNew;
