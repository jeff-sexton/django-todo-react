import React from "react";

const TabList = ({ displayCompleted, viewCompleted }) => {
  return (
    <div className="nav nav-tabs">
      <span
        className={viewCompleted ? "nav-link active" : "nav-link"}
        onClick={() => displayCompleted(true)}
      >
        Complete
      </span>
      <span
        className={viewCompleted ? "nav-link" : "nav-link active"}
        onClick={() => displayCompleted(false)}
      >
        Incomplete
      </span>
    </div>
  );
};

export default TabList
