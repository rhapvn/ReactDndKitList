import React, { useEffect, useState } from "react";
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
  const [initial, setInitial] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [moveData, setMoveData] = useState({ place: "", id: "", x: 0, y: 0 });

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

  const handleStart = (e) => {
    e.preventDefault();
    setInitial({ x: e.clientX, y: e.clientY });
    setMoveData({
      place: "",
      id: e.currentTarget.getAttribute("index"),
      x: 0,
      y: 0,
    });
    console.log("start");
    console.log(e.parentNode.parentNode.className);
    console.log(e.clientX, e.clientY);
    console.log(initial.x, initial.y);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    setMoveData((prev) => ({
      place: prev.place,
      id: prev.id,
      x: e.clientX - initial.x,
      y: e.clientY - initial.y,
    }));
    console.log("dragging");
    console.log(
      "place",
      moveData.place,
      "id",
      moveData.id,
      e.clientX - initial.x,
      e.clientY - initial.y
    );
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

  useEffect(() => {
    window.addEventListener("mouseup", handleEnd);

    return () => {
      window.removeEventListener("mouseup", handleEnd);
    };
  }, []);

  const handleEnd = () => {
    console.log("end");

    setIsDragging(false);
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
              onDragStart={handleStart}
              index={i}
              draggable='true'
              className='w-1/2 h-1/2 cursor-move'
              style={
                moveData.id == i
                  ? {
                      transform: `translate(${moveData.x}px, 0px)`,
                    }
                  : {}
              }
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
                onDragStart={handleStart}
                onDragEnd={handleEnd}
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
                onDragStart={handleStart}
                onDragEnd={handleEnd}
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
                onDragStart={handleStart}
                onDragEnd={handleEnd}
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
