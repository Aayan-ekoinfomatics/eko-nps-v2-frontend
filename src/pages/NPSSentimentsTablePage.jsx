import React from "react";
import NSSDetailedCard from "../components/individual-components/NSSDetailedCard";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SecondaryHeader from "../components/global-components/SecondaryHeader";
import NPSSentiment from "../components/individual-components/NPSSentiment";

const NPSSentimentsTablePage = () => {
  return (
    <div>
      <SecondaryHeader />
      <div className="p-4">
        <NSSDetailedCard />
      </div>
      <div className="p-4">
        <NPSSentiment />
      </div>
    </div>
  );
};

export default NPSSentimentsTablePage;
