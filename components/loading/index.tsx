import React from "react";

interface Loading {
  uploadCounter: number | null;
  totalCounter: number | null;
}
const Loading: React.FC<Loading> = ({ uploadCounter, totalCounter}) => {
  return (
    <div className="grow flex justify-center items-center flex-col">
      {/* Spinner */}
      <div className="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {uploadCounter !== null && (
        <div className="mt-16">
          Uploading: {uploadCounter}/{totalCounter} files
        </div>
      )}
    </div>
  );
};

export default Loading;
