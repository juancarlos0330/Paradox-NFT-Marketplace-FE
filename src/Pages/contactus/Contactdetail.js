import React, { useState } from "react";

const Contactdetail = (props) => {
  const [filtertext, setFiltertext] = useState("");
  const [searchflag, setSearchflag] = useState(false);

  const changeText = (e) => {
    if (e.target.value !== "") {
      setSearchflag(true);
    } else {
      setSearchflag(false);
    }
    setFiltertext(e.target.value.trim());
  };

  const clearfiltertext = () => {
    setFiltertext("");
    setSearchflag(false);
  };

  return (
    <div className="contact-detail">
      <div className="search-text-field">
        <svg
          className="searchicon"
          viewBox="0 0 14 14"
          width="16"
          height="16"
          xlmns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.2496 6.125C12.2496 3.70875 10.291 1.75 7.87494 1.75C5.45886 1.75 3.50024 3.70875 3.50024 6.125C3.50024 8.54125 5.45886 10.5 7.87494 10.5C10.291 10.5 12.2496 8.54125 12.2496 6.125ZM7.87494 0C11.2574 0 13.9995 2.74226 13.9995 6.125C13.9995 9.50774 11.2574 12.25 7.87494 12.25C6.4961 12.25 5.22369 11.7943 4.20005 11.0253C4.17557 11.0579 4.14853 11.0891 4.11892 11.1187L1.4941 13.7437C1.15241 14.0854 0.59843 14.0854 0.256745 13.7437C-0.08494 13.402 -0.08494 12.848 0.256745 12.5063L2.88156 9.88127C2.91118 9.85165 2.94239 9.8246 2.97492 9.80012C2.206 8.77641 1.75036 7.50392 1.75036 6.125C1.75036 2.74226 4.49243 0 7.87494 0Z"
            fill="currentColor"
          ></path>
        </svg>
        <input
          placeholder="Search Rarible"
          value={filtertext}
          onChange={(e) => changeText(e)}
        />
        <button
          className={searchflag ? "" : "search_clear_button"}
          type="button"
          onClick={() => clearfiltertext()}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            width="16"
            height="16"
            xlmns="http://www.w3.org/2000/svg"
          >
            <path d="M2 14L14 2" stroke="currentColor" strokeWidth="2"></path>
            <path d="M14 14L2 2" stroke="currentColor" strokeWidth="2"></path>
          </svg>
        </button>
      </div>
      <h2 className="contact-title">Submit a request</h2>
      <div className="search-text-field">
        <i className="searchicon fas fa-exclamation-circle"></i>
        <input
          type="text"
          placeholder="Providing as much information your request will allow us to help you faster"
          readOnly
        />
      </div>
      <div className="text-field">
        <label>Please choose the reason for contacting us</label>
        <select>
          <option value="1">Support for community marketplaces</option>
          <option value="2">test2</option>
          <option value="3">test3</option>
          <option value="4">test4</option>
        </select>
      </div>
      <div className="text-field">
        <label>Your Email Address *</label>
        <input type="text" placeholder="" />
      </div>
      <div className="text-field">
        <label>Marketplace (optional)</label>
        <input type="text" placeholder="" />
      </div>
      <div className="text-field">
        <label>Wallet Address *</label>
        <input type="text" placeholder="" />
      </div>
      <div className="text-field">
        <label>Issue Subject *</label>
        <input type="text" placeholder="" />
      </div>
      <div className="text-field">
        <label>
          Please describe the problem in as much detail as possible *
        </label>
        <textarea rows="16" name="description"></textarea>
      </div>
      <div className="text-field">
        <label>What do you need help with? *</label>
        <input type="text" placeholder="" />
      </div>
      <div className="text-field">
        <label>Attachments (optional)</label>
        <label htmlFor="attachfile" className="addfile-label">
          Add files
        </label>
        <input type="file" id="attachfile" style={{ display: "none" }} />
      </div>
      <div className="submit-section">
        <button type="button">Submit</button>
      </div>
    </div>
  );
};

export default Contactdetail;
