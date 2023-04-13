export const slide = (props) => {
  const { slide, index, activeIndex } = props;
  const isActive = index === activeIndex;
  const slideStyle = {
    backgroundImage: `url(${slide.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: isActive ? 1 : 0,
    transition: "opacity 500ms ease-in-out",
    zIndex: isActive ? 1 : 0,
  };

  if (element.classList.contains("red") == true) {
    //何か処理を書く
  }

  return (
    <div style={slideStyle}>
      <div className='slide-content'>
        <h1>{slide.title}</h1>
        <p>{slide.description}</p>
      </div>
    </div>
  );
};
