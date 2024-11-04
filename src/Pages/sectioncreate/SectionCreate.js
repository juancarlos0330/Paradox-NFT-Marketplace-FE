import React, { useState } from "react";
import Creation from "./Creation";
import CreateCollection from "./CreateCollection";
import CreateItem from "./CreateItem";

const SectionCreate = () => {
  const [pageFlag, setPageFlag] = useState("create");

  return (
    <div className="create-detail">
      {pageFlag === "create" ? (
        <Creation setFlag={setPageFlag} />
      ) : pageFlag === "collection" ? (
        <CreateCollection setFlag={setPageFlag} />
      ) : (
        <CreateItem setFlag={setPageFlag} />
      )}
    </div>
  );
};

export default SectionCreate;
