import React, { useState } from "react";

const Gallery = ({ project }) => {
  const [popupImage, setPopupImage] = useState(null);

  const showPopup = (img) => {
    setPopupImage(img);
  };

  const closePopup = () => {
    setPopupImage(null);
  };

  const { image, multiImages = [], iframes = [] } = project;

  const getImagePath = (imgName) =>
    require(`../assets/img/projectDetail/${imgName}`);

  return (
    <div className="gallery-container">
      {multiImages.length === 0 && iframes?.length === 0 ? (
        <img
          src={require(`../assets/img/${image}`)}
          className="single-image"
          alt=""
        />
      ) : (
        <div className="multi-image-wrapper">
          {multiImages.slice(0, 2).map((img, i) => (
            <img
              key={i}
              src={getImagePath(img)}
              className="vertical-image"
              alt=""
              onClick={() => showPopup(getImagePath(img))}
            />
          ))}

          <div className="image-grid">
            {multiImages.slice(2).map((img, i) => (
              <img
                key={i}
                src={getImagePath(img)}
                className="grid-image"
                alt=""
                onClick={() => showPopup(getImagePath(img))}
              />
            ))}
          </div>
          {iframes.map((item, i) => (
            <iframe
              title="Saudi National Day"
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
