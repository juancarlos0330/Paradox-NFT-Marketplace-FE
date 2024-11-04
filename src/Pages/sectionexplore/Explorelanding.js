import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import isEmpty from "../../validations/is-empty";
import { ipfs_file_path } from "../../config/config";
import DefaultFeaturedImage from "../../assets/image/default_featured_image_collection.png";

const Explorelanding = (props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [logoImage, setLogoImage] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");

  useEffect(() => {
    if (!isEmpty(params.get("collection"))) {
      if (!isEmpty(props.collections.collections)) {
        const collectionData = props.collections.collections.filter((item) => {
          return item._id == params.get("collection");
        });
        if (!isEmpty(collectionData)) {
          setTitle(collectionData[0].title);
          setDescription(collectionData[0].description);
          setFeaturedImage(collectionData[0].featured_image);
          setLogoImage(collectionData[0].logo_image);
        }
      }
    }
  }, [params.get("collection"), props.collections]);

  return (
    <div
      className="explorelanding"
      style={
        isEmpty(featuredImage)
          ? {
              backgroundImage: "url(" + DefaultFeaturedImage + ")",
            }
          : { backgroundImage: "url(" + ipfs_file_path + featuredImage + ")" }
      }
    >
      <div className="main">
        <h1>{title}</h1>
        <span className="explore_content">{description}</span>
        <div className="itemdetail">
          <div className="itemblock">
            <div className="item">
              <span>Items</span>
              <span>7.8K</span>
            </div>
            <div className="item">
              <span>Owners</span>
              <span>2.6K</span>
            </div>
            <div className="item">
              <span>Floor</span>
              <span>0.5 ETHK</span>
            </div>
            <div className="item">
              <span>Volume</span>
              <span>20.6K</span>
            </div>
          </div>
        </div>
      </div>
      <div className="explore-collection-logo">
        <div className="explore-collection-logo-view">
          <img src={ipfs_file_path + logoImage} alt="logo image" />
        </div>
      </div>
    </div>
  );
};

Explorelanding.propTypes = {};

const mapStateToProps = (state) => ({
  collections: state.collections,
});

export default connect(mapStateToProps, {})(Explorelanding);
