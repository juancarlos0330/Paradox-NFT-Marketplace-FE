import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "antd";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import axios from "axios";
import {
  apiUrl,
  pinata_api_key,
  pinata_secret_api_key,
} from "../../config/config";
import { createNFTData } from "../../actions/nftActions";
import LoadingSrc from "../../assets/image/loading.gif";

const CreateItem = (props) => {
  const [fieldError, setFieldError] = useState({
    logoFile: "",
    title: "",
    collectionName: "",
  });
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [propertyModalTagItems, setPropertyModalTagItems] = useState([]);
  const [propertyModalItemLiquidID, setPropertyModalItemLiquidID] = useState(0);

  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
  const [levelModalTagItems, setLevelModalTagItems] = useState([]);
  const [levelModalItemLiquidID, setLevelModalItemLiquidID] = useState(0);

  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [statsModalTagItems, setStatsModalTagItems] = useState([]);
  const [statsModalItemLiquidID, setStatsModalItemLiquidID] = useState(0);

  const [subCollectionModalFlag, setSubCollectionModalFlag] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [collectionID, setCollectionID] = useState("");
  const [subCollectionModalList, setSubCollectionModalList] = useState([]);
  const [selectedLogoFile, setSelectedLogoFile] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [flagLogoFile, setFlagLogoFile] = useState(false);
  const [logoFile, setLogoFile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [supply, setSupply] = useState("");

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      axios
        .post(apiUrl + "/api/nfts/getCollectionByUserID", {
          userid: props.auth.user.id,
        })
        .then((res) => {
          setSubCollectionModalList(res.data);
        })
        .catch((err) => {
          setSubCollectionModalList([]);
          toast.error("API Network Error!");
        });
    } else {
      toast.error("You must connect wallet!");
    }
  }, []);

  const handleSelectCollectionItem = (item) => {
    setSubCollectionModalFlag(false);
    setCollectionName(item.title);
    setCollectionID(item._id);
    setFieldError({
      ...fieldError,
      collectionName: "",
    });
  };

  const showPropertyModal = () => {
    setIsPropertyModalOpen(true);
  };

  const handlePropertyModalSave = () => {
    const tempPropertyModalTagItems = [...propertyModalTagItems];
    const tempResultPropertyModalTagItems = tempPropertyModalTagItems.filter(
      (item, key) => {
        if (
          document.getElementById(item.id + "propertytype").value.trim() !==
            "" &&
          document.getElementById(item.id + "propertyname").value.trim() !== ""
        ) {
          return {
            id: key,
            type: document.getElementById(item.id + "propertytype").value,
            name: document.getElementById(item.id + "propertyname").value,
          };
        }
      }
    );
    if (
      [...propertyModalTagItems].length ===
      tempResultPropertyModalTagItems.length
    ) {
      setIsPropertyModalOpen(false);
    } else {
      setIsPropertyModalOpen(true);
      toast.warning("Please fill the field.");
    }
  };

  const handlePropertyModalCancel = () => {
    const tempPropertyModalTagItems = [...propertyModalTagItems];
    const tempResultPropertyModalTagItems = tempPropertyModalTagItems.filter(
      (item, key) => {
        if (
          document.getElementById(item.id + "propertytype").value.trim() !==
            "" &&
          document.getElementById(item.id + "propertyname").value.trim() !== ""
        ) {
          return {
            id: key,
            type: document.getElementById(item.id + "propertytype").value,
            name: document.getElementById(item.id + "propertyname").value,
          };
        }
      }
    );
    if (
      [...propertyModalTagItems].length ===
      tempResultPropertyModalTagItems.length
    ) {
      setIsPropertyModalOpen(false);
    } else {
      setIsPropertyModalOpen(true);
      toast.warning("Please fill the field.");
    }
  };

  const showLevelModal = () => {
    setIsLevelModalOpen(true);
  };

  const handleLevelModalSave = () => {
    const tempLevelModalTagItems = [...levelModalTagItems];
    const tempResultLevelModalTagItems = tempLevelModalTagItems.filter(
      (item, key) => {
        if (
          document.getElementById(item.id + "levelname").value.trim() !== "" &&
          document.getElementById(item.id + "levelvalue").value.trim() !== ""
        ) {
          return {
            id: key,
            name: document.getElementById(item.id + "levelname").value,
            value: document.getElementById(item.id + "levelvalue").value,
          };
        }
      }
    );
    if (
      [...levelModalTagItems].length === tempResultLevelModalTagItems.length
    ) {
      setIsLevelModalOpen(false);
    } else {
      setIsLevelModalOpen(true);
      toast.warning("Please fill the field.");
    }
  };

  const handleLevelModalCancel = () => {
    const tempLevelModalTagItems = [...levelModalTagItems];
    const tempResultLevelModalTagItems = tempLevelModalTagItems.filter(
      (item, key) => {
        if (
          document.getElementById(item.id + "levelname").value.trim() !== "" &&
          document.getElementById(item.id + "levelvalue").value.trim() !== ""
        ) {
          return {
            id: key,
            name: document.getElementById(item.id + "levelname").value,
            value: document.getElementById(item.id + "levelvalue").value,
          };
        }
      }
    );
    if (
      [...levelModalTagItems].length === tempResultLevelModalTagItems.length
    ) {
      setIsLevelModalOpen(false);
    } else {
      setIsLevelModalOpen(true);
      toast.warning("Please fill the field.");
    }
  };

  const showStatsModal = () => {
    setIsStatsModalOpen(true);
  };

  const handleStatsModalSave = () => {
    const tempStatsModalTagItems = [...statsModalTagItems];
    const tempResultStatsModalTagItems = tempStatsModalTagItems.filter(
      (item, key) => {
        if (
          document.getElementById(item.id + "levelname").value.trim() !== "" &&
          document.getElementById(item.id + "levelvalue").value.trim() !== ""
        ) {
          return {
            id: key,
            name: document.getElementById(item.id + "levelname").value,
            value: document.getElementById(item.id + "levelvalue").value,
          };
        }
      }
    );
    if (
      [...statsModalTagItems].length === tempResultStatsModalTagItems.length
    ) {
      setIsStatsModalOpen(false);
    } else {
      setIsStatsModalOpen(true);
      toast.warning("Please fill the field.");
    }
  };

  const handleStatsModalCancel = () => {
    const tempStatsModalTagItems = [...statsModalTagItems];
    const tempResultStatsModalTagItems = tempStatsModalTagItems.filter(
      (item, key) => {
        if (
          document.getElementById(item.id + "levelname").value.trim() !== "" &&
          document.getElementById(item.id + "levelvalue").value.trim() !== ""
        ) {
          return {
            id: key,
            name: document.getElementById(item.id + "levelname").value,
            value: document.getElementById(item.id + "levelvalue").value,
          };
        }
      }
    );
    if (
      [...statsModalTagItems].length === tempResultStatsModalTagItems.length
    ) {
      setIsStatsModalOpen(false);
    } else {
      setIsStatsModalOpen(true);
      toast.warning("Please fill the field.");
    }
  };

  useEffect(() => {
    setPropertyModalTagItems([]);
    setLevelModalTagItems([]);
    setStatsModalTagItems([]);
  }, []);

  const HandleAddModalPropertyItem = () => {
    setPropertyModalTagItems([
      ...propertyModalTagItems,
      {
        id: propertyModalItemLiquidID,
        content: (
          <>
            <div className="type-item">
              <input
                type="text"
                id={propertyModalItemLiquidID + "propertytype"}
                name={propertyModalItemLiquidID + "propertytype"}
                className="type-item-input"
                placeholder="Character"
              />
            </div>
            <div className="name-item">
              <input
                type="text"
                id={propertyModalItemLiquidID + "propertyname"}
                name={propertyModalItemLiquidID + "propertyname"}
                className="name-item-input"
                placeholder="Male"
              />
            </div>
          </>
        ),
      },
    ]);
    setPropertyModalItemLiquidID(propertyModalItemLiquidID + 1);
  };

  const HandleAddModalLevelItem = () => {
    setLevelModalTagItems([
      ...levelModalTagItems,
      {
        id: levelModalItemLiquidID,
        content: (
          <>
            <div className="name-item">
              <input
                type="text"
                id={levelModalItemLiquidID + "levelname"}
                className="name-item-input"
                placeholder="Speed"
              />
            </div>
            <div className="value-item">
              <input
                type="number"
                id={levelModalItemLiquidID + "levelvalue"}
                className="value-item-input"
                placeholder="0"
              />
            </div>
          </>
        ),
      },
    ]);
    setLevelModalItemLiquidID(levelModalItemLiquidID + 1);
  };

  const HandleAddModalStatsItem = () => {
    setStatsModalTagItems([
      ...statsModalTagItems,
      {
        id: statsModalItemLiquidID,
        content: (
          <>
            <div className="statsname-item">
              <input
                type="text"
                id={statsModalItemLiquidID + "statsname"}
                className="statsname-item-input"
                placeholder="Speed"
              />
            </div>
            <div className="statsvalue-item">
              <input
                type="number"
                id={statsModalItemLiquidID + "statsvalue"}
                className="statsvalue-item-input"
                placeholder="0"
              />
            </div>
          </>
        ),
      },
    ]);
    setStatsModalItemLiquidID(statsModalItemLiquidID + 1);
  };

  const HandleRemoveModalPropertyItem = (id) => {
    let tempRemovePropertyModalTagItems = [...propertyModalTagItems];
    setPropertyModalTagItems(
      tempRemovePropertyModalTagItems.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const HandleRemoveModalLevelItem = (id) => {
    let tempRemoveLevelModalTagItems = [...levelModalTagItems];
    setLevelModalTagItems(
      tempRemoveLevelModalTagItems.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const HandleRemoveModalStatsItem = (id) => {
    let tempRemoveStatsModalTagItems = [...statsModalTagItems];
    setStatsModalTagItems(
      tempRemoveStatsModalTagItems.filter((item) => {
        return item.id !== id;
      })
    );
  };

  useEffect(() => {
    if (!selectedLogoFile) {
      setPreviewLogo(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedLogoFile);
    setPreviewLogo(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedLogoFile]);

  const handleChangeLogoFile = async (e) => {
    setFlagLogoFile(true);
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedLogoFile(null);
      setFieldError({
        ...fieldError,
        logoFile: "error",
      });
      setFlagLogoFile(false);
      return;
    }

    if (
      e.target.files[0].type === "image/jpeg" ||
      e.target.files[0].type === "image/gif" ||
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/webp"
    ) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: pinata_api_key,
          pinata_secret_api_key: pinata_secret_api_key,
          "Content-Type": "multipart/form-data",
        },
      })
        .then(async (res) => {
          setLogoFile(res.data.IpfsHash);
          setSelectedLogoFile(e.target.files[0]);
          setFieldError({
            ...fieldError,
            logoFile: "",
          });
          setFlagLogoFile(false);
        })
        .catch((err) => {
          setSelectedLogoFile(null);
          setFieldError({
            ...fieldError,
            logoFile: "error",
          });
          setFlagLogoFile(false);
          toast.error("You can't upload. Network Error!");
          return;
        });
    } else {
      setSelectedLogoFile(null);
      setFieldError({
        ...fieldError,
        logoFile: "error",
      });
      setFlagLogoFile(false);
      toast.error(
        "File type not allowed, Please upload .jpg, .png, .gif, .webp!"
      );
      return;
    }
  };

  const validationField = () => {
    setFieldError({
      ...fieldError,
      logoFile: selectedLogoFile === null ? "error" : "",
      title: title.trim() === "" ? "error" : "",
      collectionName: collectionName.trim() === "" ? "error" : "",
    });

    if (selectedLogoFile === null) {
      toast.error("Validation Error!");
      return false;
    }

    if (title.trim() === "") {
      toast.error("Validation Error!");
      return false;
    }

    if (collectionID.trim() === "") {
      toast.error("Validation Error!");
      return false;
    }

    return true;
  };

  const handleSaveItem = () => {
    if (validationField()) {
      const tempPropertyModalTagItems = [...propertyModalTagItems];
      const tempResultPropertyModalTagItems = tempPropertyModalTagItems.map(
        (item, key) => {
          return {
            id: key,
            type: document
              .getElementById(item.id + "propertytype")
              .value.trim(),
            name: document
              .getElementById(item.id + "propertyname")
              .value.trim(),
          };
        }
      );

      const tempLevelModalTagItems = [...levelModalTagItems];
      const tempResultLevelModalTagItems = tempLevelModalTagItems.map(
        (item, key) => {
          return {
            id: key,
            name: document.getElementById(item.id + "levelname").value.trim(),
            value: document.getElementById(item.id + "levelvalue").value.trim(),
          };
        }
      );

      const tempStatsModalTagItems = [...statsModalTagItems];
      const tempResultStatsModalTagItems = tempStatsModalTagItems.map(
        (item, key) => {
          return {
            id: key,
            name: document.getElementById(item.id + "statsname").value.trim(),
            value: document.getElementById(item.id + "statsvalue").value.trim(),
          };
        }
      );

      const formData = {
        userid: props.auth.user.id,
        logoFile,
        title,
        description,
        supply,
        collectionid: collectionID,
        properties: tempResultPropertyModalTagItems,
        levels: tempResultLevelModalTagItems,
        stats: tempResultStatsModalTagItems,
      };

      props.createNFTData(formData);
    }
  };

  return (
    <div className="create-item-main">
      <div className="create-item-section">
        <p className="item-back" onClick={() => props.setFlag("create")}>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            width="16"
            height="16"
            xlmns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 11.4143L12.7071 6.7072C13.0976 6.31668 13.0976 5.68351 12.7071 5.29299C12.3166 4.90246 11.6834 4.90246 11.2929 5.29299L8 8.58588L4.70711 5.29299C4.31658 4.90246 3.68342 4.90246 3.29289 5.29299C2.90237 5.68351 2.90237 6.31668 3.29289 6.7072L8 11.4143Z"
              fill="currentColor"
            ></path>
          </svg>
          Manage Collection Type
        </p>
        <h2 className="item-title">Create New Item</h2>
        <div className="upload-field">
          <label htmlFor="logofileinput">
            Image, Video, Audio or 3D Model <span>*</span>
          </label>
          <p>
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
            GLB, GLTF. Max size: 100 MB
          </p>
          <div
            className={
              fieldError.logoFile === "" ? "upload-view" : "upload-view error"
            }
          >
            {previewLogo !== null && (
              <img
                className="preview-logo"
                src={previewLogo}
                alt="preview image"
              />
            )}
            <input
              type="file"
              id="logofileinput"
              onChange={handleChangeLogoFile}
            />
            {flagLogoFile ? (
              <img src={LoadingSrc} alt="loading" width="80px" height="80px" />
            ) : (
              <label htmlFor="logofileinput">
                <CropOriginalIcon sx={{ fontSize: 80, cursor: "pointer" }} />
              </label>
            )}
          </div>
        </div>
        <div className="text-field">
          <label>
            Title <span>*</span>
          </label>
          <input
            type="text"
            className={fieldError.title === "" ? "" : "error"}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setFieldError({
                ...fieldError,
                title: e.target.value === "" ? "error" : "",
              });
            }}
            placeholder="e.g. Item Name"
          />
        </div>
        <div className="text-field">
          <label>Description</label>
          <p>
            The description will be included on the item's detail page
            underneath its image.
          </p>
          <textarea
            rows="10"
            name="description"
            placeholder="Provide a detailed description of your item."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="text-field">
          <label>Total Supply</label>
          <input
            type="number"
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
            placeholder="e.g. 10 (Unit is percent %)"
          />
        </div>
        <div className="text-field">
          <label>
            Collection <span>*</span>
          </label>
          <p>This is the collection where your item will appear.</p>
          <input
            type="text"
            className={fieldError.collectionName === "" ? "" : "error"}
            value={collectionName}
            placeholder="Select Collection"
            onFocus={() => setSubCollectionModalFlag(true)}
            onChange={(e) => {
              setCollectionName(e.target.value);
              setSubCollectionModalFlag(true);
              setCollectionID("");
              setFieldError({
                ...fieldError,
                collectionName: collectionID === "" ? "error" : "",
              });
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                setSubCollectionModalFlag(false);
              }
            }}
          />
          {subCollectionModalFlag && (
            <div className="sub-collection-modal">
              {subCollectionModalList.length > 0 &&
              [...subCollectionModalList].filter((item) => {
                return (
                  item.title
                    .toLowerCase()
                    .indexOf(collectionName.trim().toLowerCase()) > -1
                );
              }).length > 0 ? (
                <ul className="sub-collection-modal-list">
                  {[...subCollectionModalList]
                    .filter((item) => {
                      return (
                        item.title
                          .toLowerCase()
                          .indexOf(collectionName.trim().toLowerCase()) > -1
                      );
                    })
                    .map((item, key) => {
                      return (
                        <li
                          key={key}
                          className="sub-collection-modal-item"
                          onClick={() => handleSelectCollectionItem(item)}
                        >
                          {item.title}
                        </li>
                      );
                    })}
                </ul>
              ) : (
                <div className="sub-collection-modal-empty">No results</div>
              )}
            </div>
          )}
          <div className="sub-collection-modal-arrow">
            <svg
              className={subCollectionModalFlag ? "rotate-180" : ""}
              viewBox="0 0 16 16"
              fill="none"
              width="16"
              height="16"
              xlmns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 11.4143L12.7071 6.7072C13.0976 6.31668 13.0976 5.68351 12.7071 5.29299C12.3166 4.90246 11.6834 4.90246 11.2929 5.29299L8 8.58588L4.70711 5.29299C4.31658 4.90246 3.68342 4.90246 3.29289 5.29299C2.90237 5.68351 2.90237 6.31668 3.29289 6.7072L8 11.4143Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
        <div className="add-attribute-field">
          <div className="add-attribute-field-content">
            <p className="add-attribute-field-text">Properties</p>
            <p className="add-attribute-field-text">
              Textual traits that show up as retangles
            </p>
          </div>
          <div className="add-attribute-field-addview">
            <button type="button" onClick={showPropertyModal}>
              +
            </button>
          </div>
        </div>
        <div className="add-attribute-field">
          <div className="add-attribute-field-content">
            <p className="add-attribute-field-text">Levels</p>
            <p className="add-attribute-field-text">
              Numerical traits that show as a progress bar
            </p>
          </div>
          <div className="add-attribute-field-addview">
            <button type="button" onClick={showLevelModal}>
              +
            </button>
          </div>
        </div>
        <div className="add-attribute-field">
          <div className="add-attribute-field-content">
            <p className="add-attribute-field-text">Stats</p>
            <p className="add-attribute-field-text">
              Numerical traits that just show as numbers
            </p>
          </div>
          <div className="add-attribute-field-addview">
            <button type="button" onClick={showStatsModal}>
              +
            </button>
          </div>
        </div>
        <div className="submit-section">
          <button type="button" onClick={handleSaveItem}>
            Save Item
          </button>
        </div>
      </div>
      <Modal
        title={[
          <p key="back" style={{ fontSize: 24 }}>
            Add Properties
          </p>,
        ]}
        centered
        className="create-property-modal"
        open={isPropertyModalOpen}
        onOk={handlePropertyModalSave}
        onCancel={handlePropertyModalCancel}
        footer={[
          <button
            key="back"
            className="footer-btn"
            type="button"
            onClick={handlePropertyModalSave}
          >
            SAVE
          </button>,
        ]}
      >
        <div className="property-modal-content">
          <p className="property-title">
            Properties show up underneath your item, are clickable, and can be
            filtered in your collection's sidebar.
          </p>
          <div className="property-main">
            {propertyModalTagItems.length > 0 ? (
              <div className="property-item">
                <div className="close-item"></div>
                <div className="type-item">Type</div>
                <div className="name-item">Name</div>
              </div>
            ) : null}
            {propertyModalTagItems.length > 0
              ? propertyModalTagItems.map((item, key) => {
                  return (
                    <div className="property-item" key={key}>
                      <div className="close-item">
                        <button
                          type="button"
                          onClick={() => HandleRemoveModalPropertyItem(item.id)}
                          className="type-item-button"
                        >
                          <CloseIcon />
                        </button>
                      </div>
                      {item.content}
                    </div>
                  );
                })
              : null}
            <div className="add-property-view">
              <button
                type="button"
                onClick={() => HandleAddModalPropertyItem()}
              >
                Add more
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title={[
          <p key="back" style={{ fontSize: 24 }}>
            Add Levels
          </p>,
        ]}
        centered
        className="create-level-modal"
        open={isLevelModalOpen}
        onOk={handleLevelModalSave}
        onCancel={handleLevelModalCancel}
        footer={[
          <button
            key="back"
            className="footer-btn"
            type="button"
            onClick={handleLevelModalSave}
          >
            SAVE
          </button>,
        ]}
      >
        <div className="level-modal-content">
          <p className="level-title">
            Levels show up underneath your item, are clickable, and can be
            filtered in your collection's sidebar.
          </p>
          <div className="level-main">
            {levelModalTagItems.length > 0 ? (
              <div className="level-item">
                <div className="close-item"></div>
                <div className="name-item">Name</div>
                <div className="value-item">Value</div>
              </div>
            ) : null}
            {levelModalTagItems.length > 0
              ? levelModalTagItems.map((item, key) => {
                  return (
                    <div className="level-item" key={key}>
                      <div className="close-item">
                        <button
                          type="button"
                          onClick={() => HandleRemoveModalLevelItem(item.id)}
                          className="type-item-button"
                        >
                          <CloseIcon />
                        </button>
                      </div>
                      {item.content}
                    </div>
                  );
                })
              : null}
            <div className="add-level-view">
              <button type="button" onClick={() => HandleAddModalLevelItem()}>
                Add more
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title={[
          <p key="back" style={{ fontSize: 24 }}>
            Add Stats
          </p>,
        ]}
        centered
        className="create-stats-modal"
        open={isStatsModalOpen}
        onOk={handleStatsModalSave}
        onCancel={handleStatsModalCancel}
        footer={[
          <button
            key="back"
            className="footer-btn"
            type="button"
            onClick={handleStatsModalSave}
          >
            SAVE
          </button>,
        ]}
      >
        <div className="stats-modal-content">
          <p className="stats-title">
            Stats show up underneath your item, are clickable, and can be
            filtered in your collection's sidebar.
          </p>
          <div className="stats-main">
            {statsModalTagItems.length > 0 ? (
              <div className="stats-item">
                <div className="close-item"></div>
                <div className="statsname-item">Name</div>
                <div className="statsvalue-item">Value</div>
              </div>
            ) : null}
            {statsModalTagItems.length > 0
              ? statsModalTagItems.map((item, key) => {
                  return (
                    <div className="stats-item" key={key}>
                      <div className="close-item">
                        <button
                          type="button"
                          onClick={() => HandleRemoveModalStatsItem(item.id)}
                          className="type-item-button"
                        >
                          <CloseIcon />
                        </button>
                      </div>
                      {item.content}
                    </div>
                  );
                })
              : null}
            <div className="add-stats-view">
              <button type="button" onClick={() => HandleAddModalStatsItem()}>
                Add more
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

CreateItem.propTypes = {
  createNFTData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  thememode: state.thememode,
  auth: state.auth,
});

export default connect(mapStateToProps, { createNFTData })(CreateItem);
