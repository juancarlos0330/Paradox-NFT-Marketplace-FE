import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSrc from "../../assets/image/loading.gif";
import { pinata_api_key, pinata_secret_api_key } from "../../config/config";
import { createCollectionData } from "../../actions/collectionActions";

const CreateCollection = (props) => {
  const [fieldError, setFieldError] = useState({
    logoImg: "",
    title: "",
    category: "",
  });
  const [previewLogoImg, setPreviewLogoImg] = useState(null);
  const [previewFeaturedImg, setPreviewFeaturedImg] = useState(null);
  const [previewBannerImg, setPreviewBannerImg] = useState(null);
  const [selectedLogoImg, setSelectedLogoImg] = useState(null);
  const [selectedFeaturedImg, setSelectedFeaturedImg] = useState(null);
  const [selectedBannerImg, setSelectedBannerImg] = useState(null);
  const [flagLogoImg, setFlagLogoImg] = useState(false);
  const [flagFeaturedImg, setFlagFeaturedImg] = useState(false);
  const [flagBannerImg, setFlagBannerImg] = useState(false);
  const [logoImg, setLogoImg] = useState("");
  const [featuredImg, setFeaturedImg] = useState("");
  const [bannerImg, setBannerImg] = useState("");
  const [title, setTitle] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [royalty, setRoyalty] = useState("");
  const [website, setWebsite] = useState("");
  const [discordLink, setDiscordLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [mediumLink, setMediumLink] = useState("");
  const [telegramLink, setTelegramLink] = useState("");

  useEffect(() => {
    if (!selectedLogoImg) {
      setPreviewLogoImg(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedLogoImg);
    setPreviewLogoImg(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedLogoImg]);

  useEffect(() => {
    if (!selectedFeaturedImg) {
      setPreviewFeaturedImg(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFeaturedImg);
    setPreviewFeaturedImg(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFeaturedImg]);

  useEffect(() => {
    if (!selectedBannerImg) {
      setPreviewBannerImg(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedBannerImg);
    setPreviewBannerImg(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedBannerImg]);

  const handleChangeLogoImg = async (e) => {
    setFlagLogoImg(true);
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedLogoImg(null);
      setFieldError({
        ...fieldError,
        logoImg: "error",
      });
      setFlagLogoImg(false);
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
          setLogoImg(res.data.IpfsHash);
          setSelectedLogoImg(e.target.files[0]);
          setFieldError({
            ...fieldError,
            logoImg: "",
          });
          setFlagLogoImg(false);
        })
        .catch((err) => {
          setSelectedLogoImg(null);
          setFieldError({
            ...fieldError,
            logoImg: "error",
          });
          setFlagLogoImg(false);
          toast.error("You can't upload. Network Error!");
          return;
        });
    } else {
      setSelectedLogoImg(null);
      setFieldError({
        ...fieldError,
        logoImg: "error",
      });
      setFlagLogoImg(false);
      toast.error(
        "File type not allowed, Please upload .jpg, .png, .gif, .webp!"
      );
      return;
    }
  };

  const handleChangeFeaturedImg = async (e) => {
    setFlagFeaturedImg(true);
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFeaturedImg(null);
      setFlagFeaturedImg(false);
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
          setFeaturedImg(res.data.IpfsHash);
          setSelectedFeaturedImg(e.target.files[0]);
          setFlagFeaturedImg(false);
        })
        .catch((err) => {
          setSelectedFeaturedImg(null);
          setFlagFeaturedImg(false);
          toast.error("You can't upload. Network Error!");
          return;
        });
    } else {
      setSelectedFeaturedImg(null);
      setFlagFeaturedImg(false);
      toast.error(
        "File type not allowed, Please upload .jpg, .png, .gif, .webp!"
      );
      return;
    }
  };

  const handleChangeBannerImg = async (e) => {
    setFlagBannerImg(true);
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedBannerImg(null);
      setFlagBannerImg(false);
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
          setBannerImg(res.data.IpfsHash);
          setSelectedBannerImg(e.target.files[0]);
          setFlagBannerImg(false);
        })
        .catch((err) => {
          setSelectedBannerImg(null);
          setFlagBannerImg(false);
          toast.error("You can't upload. Network Error!");
          return;
        });
    } else {
      setSelectedBannerImg(null);
      setFlagBannerImg(false);
      toast.error(
        "File type not allowed, Please upload .jpg, .png, .gif, .webp!"
      );
      return;
    }
  };

  const validationField = () => {
    setFieldError({
      ...fieldError,
      logoImg: selectedLogoImg === null ? "error" : "",
      title: title.trim() === "" ? "error" : "",
      category: category === "" ? "error" : "",
    });

    if (props.auth.isAutheticated) {
      toast.error("You must connect wallet!");
      return false;
    }

    if (selectedLogoImg === null) {
      toast.error("Validation Error!");
      return false;
    }

    if (title.trim() === "") {
      toast.error("Validation Error!");
      return false;
    }

    if (category === "") {
      toast.error("Validation Error!");
      return false;
    }

    return true;
  };

  const handleSaveCollection = () => {
    if (validationField()) {
      const formData = {
        userid: props.auth.user.id,
        logoImg,
        featuredImg,
        bannerImg,
        title,
        symbol,
        description,
        category,
        royalty,
        website,
        discord: discordLink,
        instagram: instagramLink,
        medium: mediumLink,
        telegram: telegramLink,
      };

      props.createCollectionData(formData);
    }
  };

  return (
    <div className="create-collection-main">
      <div className="create-collection-section">
        <p className="collection-back" onClick={() => props.setFlag("create")}>
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
        <h2 className="collection-title">Create Single Collection</h2>
        <div className="upload-field">
          <label htmlFor="logofileinput">
            Logo Image <span>*</span>
          </label>
          <p>This image will also be used for display purposes.</p>
          <div
            className={
              fieldError.logoImg === "" ? "upload-view" : "upload-view error"
            }
          >
            <input
              type="file"
              id="logofileinput"
              onChange={handleChangeLogoImg}
            />
            <div className="viewimgpreview upload-350-350">
              {previewLogoImg !== null && (
                <img
                  className="preview-img"
                  src={previewLogoImg}
                  alt="preview image"
                />
              )}
              <label className="upload-350-350" htmlFor="logofileinput">
                {flagLogoImg ? (
                  <img
                    src={LoadingSrc}
                    alt="loading"
                    width="50px"
                    height="50px"
                  />
                ) : (
                  "+"
                )}
              </label>
            </div>
            <p>Recommended size: 350 x 350</p>
          </div>
        </div>
        <div className="upload-field">
          <label htmlFor="featuredfileinput">Featured Image</label>
          <p>
            This image will be used for featuring your collection on the
            homepage, category pages, or other display areas of Marketplace.
          </p>
          <div className="upload-view">
            <input
              type="file"
              id="featuredfileinput"
              onChange={handleChangeFeaturedImg}
            />
            <div className="viewimgpreview upload-600-400">
              {previewFeaturedImg !== null && (
                <img
                  className="preview-img"
                  src={previewFeaturedImg}
                  alt="preview image"
                />
              )}
              <label className="upload-600-400" htmlFor="featuredfileinput">
                {flagFeaturedImg ? (
                  <img
                    src={LoadingSrc}
                    alt="loading"
                    width="50px"
                    height="50px"
                  />
                ) : (
                  "+"
                )}
              </label>
            </div>
            <p>Recommended size: 600 x 400</p>
          </div>
        </div>
        <div className="upload-field">
          <label htmlFor="bannerfileinput">Banner Image</label>
          <p>This image will appear at the top of your collection page.</p>
          <div className="upload-view">
            <input
              type="file"
              id="bannerfileinput"
              onChange={handleChangeBannerImg}
            />
            <div className="viewimgpreview upload-1400-350">
              {previewBannerImg !== null && (
                <img
                  className="preview-img"
                  src={previewBannerImg}
                  alt="preview image"
                />
              )}
              <label className="upload-1400-350" htmlFor="bannerfileinput">
                {flagBannerImg ? (
                  <img
                    src={LoadingSrc}
                    alt="loading"
                    width="50px"
                    height="50px"
                  />
                ) : (
                  "+"
                )}
              </label>
            </div>
            <p>Recommended size: 1400 x 350</p>
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
                title: e.target.value.trim() === "" ? "error" : "",
              });
            }}
            placeholder="e.g. Redeemable T-Shirt with logo"
          />
        </div>
        <div className="text-field">
          <label>Symbol</label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.substring(0, 4))}
            placeholder="ONLY 4 CHARACTERS ARE ALLOWED"
          />
        </div>
        <div className="text-field">
          <label>Description</label>
          <textarea
            rows="10"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. After purchasing you'll be able to get the real T-Shirt"
          ></textarea>
        </div>
        <div className="text-field">
          <label>
            Choose category <span>*</span>
          </label>
          <p>
            Adding a category will help make your item discoverable on
            Marketplace.
          </p>
          <select
            className={fieldError.category === "" ? "" : "error"}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setFieldError({
                ...fieldError,
                category: e.target.value === "" ? "error" : "",
              });
            }}
          >
            <option value="">Choose category</option>
            <option value="ART">ART</option>
            <option value="GAMING">GAMING</option>
            <option value="MEMBERSHIP">MEMBERSHIP</option>
            <option value="PFPS">PFPS</option>
            <option value="PHOTOGRAPHY">PHOTOGRAPHY</option>
          </select>
        </div>
        <div className="text-field">
          <label>Royalties</label>
          <input
            type="number"
            placeholder="e.g. 10 (Unit is percent %)"
            value={royalty}
            onChange={(e) => setRoyalty(e.target.value)}
          />
        </div>
        <div className="text-field">
          <label>WebSite</label>
          <input
            type="text"
            placeholder="e.g. yoursite.io"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="text-field">
          <label>Discord Link</label>
          <input
            type="text"
            placeholder="e.g. https://discord.gg/abcdef"
            value={discordLink}
            onChange={(e) => setDiscordLink(e.target.value)}
          />
        </div>
        <div className="text-field">
          <label>Instagram Link</label>
          <input
            type="text"
            placeholder="e.g. https://www.instagram.com/Yourinstagramhandle"
            value={instagramLink}
            onChange={(e) => setInstagramLink(e.target.value)}
          />
        </div>
        <div className="text-field">
          <label>Medium Link</label>
          <input
            type="text"
            placeholder="e.g. https://www.medium.com/@YourMediumHandle"
            value={mediumLink}
            onChange={(e) => setMediumLink(e.target.value)}
          />
        </div>
        <div className="text-field">
          <label>Telegram Link</label>
          <input
            type="text"
            placeholder="e.g. https://t.me/abcdef"
            value={telegramLink}
            onChange={(e) => setTelegramLink(e.target.value)}
          />
        </div>
        <div className="submit-section">
          <button type="button" onClick={handleSaveCollection}>
            SAVE COLLECTION
          </button>
        </div>
      </div>
    </div>
  );
};

CreateCollection.propTypes = {
  createCollectionData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  thememode: state.thememode,
  auth: state.auth,
});

export default connect(mapStateToProps, { createCollectionData })(
  CreateCollection
);
