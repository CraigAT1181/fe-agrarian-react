import React from "react";

export default function ProduceSearch() {
  return (
    <>
      <section className=".flex-column justify-content-center border border-primary">
        <p>Produce Finder</p>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            Dropdown Button
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton">
            <a
              className="dropdown-item"
              href="#">
              Tomatoes
            </a>
            <a
              className="dropdown-item"
              href="#">
              Lettuce
            </a>
            <a
              className="dropdown-item"
              href="#">
              Asparagus
            </a>
            <div className="dropdown-divider"></div>
            <a
              className="dropdown-item"
              href="#">
              Separated Link
            </a>
          </div>
        </div>
        <div id="produce-selected-list">
          <p>Selected produce will appear here</p>
        </div>
        <button>Search</button>
      </section>
    </>
  );
}
