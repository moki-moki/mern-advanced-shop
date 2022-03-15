import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        style={{
          borderTopColor: "transparent",
        }}
        className="w-60 h-60 absolute border-4 border-sub-heading border-solid rounded-full animate-spin"
      ></div>
    </div>
  );
};

export default Loader;
