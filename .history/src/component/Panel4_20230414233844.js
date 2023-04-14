export const Upper = (list, index) => {
  retrun(
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
};
