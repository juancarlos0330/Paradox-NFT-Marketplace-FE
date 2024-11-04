import React, { useState } from "react";

const Image = (props) => {
  const [loading, setLoading] = useState(true);

  const onLoad = () => {
    setLoading(false);
  };

  return (
    <img
      src={props.src}
      onLoad={onLoad}
      className={props.className}
      alt={props.alt}
      style={props.style}
    />
  );
};

export default Image;
