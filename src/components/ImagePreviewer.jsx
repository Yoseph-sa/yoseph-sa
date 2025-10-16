import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ImagePreviewer = ({ imageUrl, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });

  // Zoom handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () =>
    setZoom(
      (prev) => Math.max(prev - 0.2, 1) // cannot zoom below original size
    );
  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    lastPosition.current = { x: 0, y: 0 };
  };

  // Mouse & Touch drag handlers
  const startDrag = (e) => {
      if (zoom <= 1) return; // Don't drag if image is at original size
    e.preventDefault();
    setIsDragging(true);

    const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;

    dragStart.current = { x: clientX, y: clientY };
  };

  const duringDrag = (e) => {
    if (!isDragging) return;

    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;

    setPosition({
      x: lastPosition.current.x + dx,
      y: lastPosition.current.y + dy,
    });
  };

  const endDrag = () => {
    setIsDragging(false);
    lastPosition.current = { ...position };
  };

  return (
    <div className="image-preview-overlay" onClick={onClose}>
      <div
        className="image-preview-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-right controls */}
        <div className="image-preview-controls">
          <button
            className="control-btn"
            onClick={handleZoomIn}
            title="Zoom In"
          >
            <i className="bi bi-zoom-in"></i>
          </button>
          <button
            className="control-btn"
            onClick={handleZoomOut}
            title="Zoom Out"
          >
            <i className="bi bi-zoom-out"></i>
          </button>
          <button
            className="control-btn"
            onClick={handleReset}
            title="Reset Zoom"
          >
            <i className="bi bi-arrow-counterclockwise"></i>
          </button>
          <button
            className="control-btn close-btn"
            onClick={onClose}
            title="Close"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Image */}
        <div
          className="image-preview-wrapper"
          onMouseDown={startDrag}
          onMouseMove={duringDrag}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={startDrag}
          onTouchMove={duringDrag}
          onTouchEnd={endDrag}
        >
          <img
            src={imageUrl}
            alt="Preview"
            className="image-preview"
            style={{
              transform: `scale(${zoom}) translate(${position.x / zoom}px, ${
                position.y / zoom
              }px)`,
              cursor: zoom > 1 ? "grab" : "default",
            }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewer;
