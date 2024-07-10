import React from "react";

function ProgressBar(props) {
  const { completed } = props;

  // const backgroundColor = (() => {
  //     if (completed >= 0 && completed < 25) {
  //         return "#61dafb"; // light blue
  //     } else if (completed >= 25 && completed < 50) {
  //         return "#00FF00"; // green
  //     } else if (completed >= 50 && completed < 75) {
  //         return "#FFFF03"; // yellow
  //     } else if (completed >= 75 && completed <= 100) {
  //         return "#FF6970";
  //     }
  //     else {
  //         return "grey";
  //     }
  // })();
  const determineGradient = () => {
    if (completed >= 0 && completed < 25) {
      return "#82e327";
    } else if (completed >= 25 && completed <= 50) {
      return `linear-gradient(to right, #82e327 0%, #FFFF03 ${completed}%, #FFFF03 ${completed}%)`;
    } else if (completed >= 50 && completed < 75) {
      return `linear-gradient(to right, #FFFF03 0%, #FFA500 ${completed}%, #FFA500 ${completed}%)`;
    } else if (completed >= 75 && completed <= 100) {
      return `linear-gradient(to right, #FFA500 0%, rgb(225 86 2) ${completed}%, rgb(225 86 2) 100%)`;
    } else {
      return "grey";
    }
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    background: determineGradient(),
    borderRadius: "inherit",
    textAlign: "right",
  };
  return (
    <div className="progressbar-container">
      <div style={fillerStyles}>
        <span>
          {completed !== "null" ? `${completed}` : ""}
        </span>
      </div>
    </div>
  );
}

export default ProgressBar;
