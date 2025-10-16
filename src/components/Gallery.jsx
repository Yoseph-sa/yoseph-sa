import React, { useState } from "react";
import ImagePreviewer from "./ImagePreviewer";

const Gallery = ({ project }) => {
  const [popupImage, setPopupImage] = useState(null);

  const showPopup = (img) => {
    setPopupImage(img);
  };

  const closePopup = () => {
    setPopupImage(null);
  };

  const { image, projectImages = [], multiImages = [], iframes = [] } = project;

  // const getImagePath = (imgName) =>
  //   require(`../assets/img/projectDetail/${imgName}`);

  return (
    <div className="gallery-container">
      {multiImages?.length === 0 && iframes?.length === 0 ? (
        <img src={image.url} className="single-image" alt="" />
      ) : (
        <div className="multi-image-wrapper">
          {projectImages?.map((img, i) => (
            <img
              key={i}
              src={img?.url}
              className="vertical-image"
              alt=""
              onClick={() => showPopup(img?.url)}
            />
          ))}

          <div className="image-grid">
            {multiImages.map((img, i) => (
              <img
                key={i}
                src={img?.url}
                className="grid-image"
                alt=""
                onClick={() => showPopup(img?.url)}
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

      {/* {popupImage && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closePopup}>
              ×
            </button>
            <img src={popupImage} alt="Popup" className="popup-image" />
          </div>
        </div>
      )} */}
      {popupImage && (
        <ImagePreviewer
          imageUrl={popupImage}
          onClose={() => setPopupImage(null)}
        />
      )}
    </div>
  );
};

export default Gallery;
