import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faGrip,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";

import { shuffle } from "./shuffle";

export const Slide = ({ list, setList, direction }) => {
  // console.log(document.getElementById("id23").getBoundingClientRect()); //実験中
  // console.log(document.getElementById("id23").children[0].innerHTML);
  // console.log(document.getElementById("id24").getBoundingClientRect());
  // console.log(document.getElementById("id24").children[0].innerHTML);

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
    console.log("classes", classes); //Draggable をグリップにつけて、ここで取得する
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
      <div className='panelRight'>
        {Array.from(Array(10).keys()).map((i) => (
          <>
            <div
              className='p-0 m-0 panel flex justify-center items-center'
              key={i}
            >
              <div className='w-1/2 h-1/2 cursor-move relative'>
                <FontAwesomeIcon
                  onClick={slide}
                  icon={faCaretRight}
                  className='slideRight w-full h-[150%] absolute left-[-40%] top-[-25%]'
                  index={i}
                />
              </div>
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
            </div>
          </>
        ))}
      </div>
    );
  }
  if (direction === "Down") {
    return (
      <div className='panelLower'>
        {Array.from(Array(10).keys()).map((i) => (
          <>
            <div
              className='p-0 m-0 panel flex flex-col justify-center items-center'
              key={i}
            >
              <div className='w-1/2 h-1/2 cursor-move relative'>
                <FontAwesomeIcon
                  onClick={slide}
                  icon={faCaretDown}
                  className='slideDown w-full h-[200%] absolute top-[-80%]'
                  index={i}
                />
              </div>
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
            </div>
          </>
        ))}
      </div>
    );
  }
};
