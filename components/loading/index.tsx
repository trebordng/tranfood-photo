import React from "react";

const Loading = () => {
  return (
    <div className="grow flex justify-center items-center">
      <svg
        className="animate-spin h-96 w-96 text-purple-500"
        viewBox="0 0 24 24"
      >
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4zm3-5.291a7.962 7.962 0 01-3 2.647l-3-2.647A7.962 7.962 0 0112 16h3z"
        ></path>
      </svg>{" "}
    </div>
  );
};

export default Loading;
