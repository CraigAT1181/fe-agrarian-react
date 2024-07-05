import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function FilterModal({ show, handleClose, applyFilters }) {
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleClear = () => {
    setSelectedAvailability("");
    setSelectedType("");
  };

  const handleConfirm = () => {
    applyFilters(selectedAvailability, selectedType);
    handleClose();
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div className="flex justify-around">
              <div className="flex items-center space-x-2">
                <span>Available</span>
                <input
                  type="radio"
                  name="availability"
                  value="Available"
                  checked={selectedAvailability === "Available"}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="form-radio text-green-900"
                />
              </div>
              <div className="flex items-center space-x-2">
                <span>Wanted</span>
                <input
                  type="radio"
                  name="availability"
                  value="Wanted"
                  checked={selectedAvailability === "Wanted"}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="form-radio text-green-900"
                />
              </div>
            </div>
            <div className="flex justify-around">
              <div className="flex items-center space-x-2">
                <span>Produce</span>
                <input
                  type="radio"
                  name="type"
                  value="Produce"
                  checked={selectedType === "Produce"}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="form-radio text-green-900"
                />
              </div>
              <div className="flex items-center space-x-2">
                <span>Seed</span>
                <input
                  type="radio"
                  name="type"
                  value="Seed"
                  checked={selectedType === "Seed"}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="form-radio text-green-900"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleClear}
                className="button-outline">
                Clear
              </button>
              <button
                onClick={handleConfirm}
                className="button-fill">
                Confirm
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
