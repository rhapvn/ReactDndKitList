import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faGrip } from "@fortawesome/free-solid-svg-icons";
import { shuffle } from "./shuffle";

export const Slide = ({ list, setList, direction }) => {
  const slide = (e) => {
    const index = e.currentTarget.getAttribute("index");
    const classes = e.currentTarget.classList;
    const listClone = shuffle(list, index, classes);
    setList(listClone);
  };

  const moveColumn = (e) => {
    const index = e.currentTarget.getAttribute("index");
    const classes = e.currentTarget.classList;
    console.log("index", index);
    console.log("classes", classes);
  };

  if (direction === "Upper") {
    return (
      <div className='panelUpper'>
        {Array.from(Array(10).keys()).map((i) => (
          <div
            className='p-0 m-0 panel flex flex-col justify-center items-center'
            key={i}
          >
            <div
              onDragStart={moveColumn}
              index={i}
              draggable='true'
              className='w-1/2 h-1/2 cursor-move'
            >
              <FontAwesomeIcon
                icon={faGrip}
                className='iconSpaceTB w-full h-full'
              />
            </div>
            <div className='w-1/2 h-1/2 cursor-move relative'>
              <FontAwesomeIcon
                onClick={slide}
                icon={faCaretUp}
                className='slideUp w-full h-[200%] absolute bottom-[-80%] '
                index={i}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (direction === "Left") {
    return (
        <div className='panelLeft'>
          {Array.from(Array(10).keys()).map((i) => (
            <>
              <div
                className='p-0 m-0 panel flex justify-center items-center'
                key={i}
              >
                <div
                  onDragStart={moveColumn}
                  index={i}
                  draggable='true'
                  className='w-1/2 h-1/2 cursor-move'
                >
                  <FontAwesomeIcon
                    icon={faGripVertical}
                    className='iconSpaceLR w-full h-full'
                  />
                </div>
                <div className='w-1/2 h-1/2 cursor-move relative'>
                  <FontAwesomeIcon
                    onClick={slide}
                    icon={faCaretLeft}
                    className='slideLeft w-full h-[150%] absolute right-[-40%] top-[-25%]'
                    index={i}
                  />
                </div>
              </div>
            </>
          ))}
        </div>
    );
  }
  if (direction === "Right") {
    return (

    );
  }
  if (direction === "Down") {
    return (

    );
  }


};
