import React, { useState } from "react";

const Gallery = ({ project }) => {
  const [popupImage, setPopupImage] = useState(null);

  const showPopup = (img) => {
    setPopupImage(img);
  };

  const closePopup = () => {
    setPopupImage(null);
  };

  const { imageUrl, multiImageUrls = [], iframes = [] } = project;

  const getImagePath = (imgName) =>
    require(`../assets/img/projectDetail/${imgName}`);

  return (
    <div className="gallery-container">
      {multiImageUrls?.length === 0 && iframes?.length === 0 ? (
        <img src={imageUrl} className="single-image" alt="" />
      ) : (
        <div className="multi-image-wrapper">
          {multiImageUrls?.slice(0, 2).map((img, i) => (
            <img
              key={i}
              src={img}
              className="vertical-image"
              alt=""
              onClick={() => showPopup(img)}
            />
          ))}

          <div className="image-grid">
            {multiImageUrls?.slice(2).map((img, i) => (
              <img
                key={i}
                src={img}
                className="grid-image"
                alt=""
                onClick={() => showPopup(img)}
              />
            ))}
          </div>
          {iframes?.map((item, i) => (
            <iframe
              title={project?.name}
              src={item?.src}
              width="1320"
              height="600"
              frameborder="0"
              className="vertical-image"
            ></iframe>
          ))}
        </div>
      )}

      {popupImage && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closePopup}>
              ×
            </button>
            <img src={popupImage} alt="Popup" className="popup-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
