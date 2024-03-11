import React from "react";

export default function Development() {
  return (
    <div
      className="container"
      style={{ maxHeight: "500px", overflowY: "auto" }}>
      <div>
        <h3>Development Plan</h3>
      </div>
      <div className="mt-4">
        <h4>Food at a Glance</h4>
      </div>
      <div>
        <div>
          <h5 className="mx-2">1 Home</h5>
          <p className="mx-5">
            1.1 Users will be able to highlight that they have food available to
            collect.
          </p>
        </div>
        <h5 className="mx-2">2 Maps</h5>
        <p className="mx-5">
          2.1 Users will be able to see on the map where food is available to
          collect.
        </p>
      </div>

      <div className="mt-4">
        <h4>Blogging</h4>
      </div>
      <div>
        <h5 className="mx-2">1 Comments</h5>
        <p className="mx-5">
          1.1 Users will be able to reply to comments made on blogs.
        </p>
      </div>
    </div>
  );
}
