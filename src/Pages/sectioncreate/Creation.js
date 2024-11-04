import React from "react";
import CollectionSrc from "../../assets/image/create/collection.png";
import ItemSrc from "../../assets/image/create/item.png";

const Creation = (props) => {
  return (
    <div className="creation-main">
      <div className="creation-section">
        <h2 className="creation-title">Create Collectible</h2>
        <div className="creation-content">
          <div
            className="creation-block"
            onClick={() => props.setFlag("collection")}
          >
            <img
              alt="create collection"
              src={CollectionSrc}
              className="c-image"
            />
            <p className="c-text">Create Collection</p>
          </div>
          <div className="creation-block" onClick={() => props.setFlag("item")}>
            <img alt="create item" src={ItemSrc} className="c-image" />
            <p className="c-text">Create Item</p>
          </div>
        </div>
        <p className="creation-tip">
          We do not own your private keys and cannot access your funds without
          your confirmation
        </p>
      </div>
    </div>
  );
};

export default Creation;
