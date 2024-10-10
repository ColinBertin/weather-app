import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="grid justify-center content-center h-full">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
