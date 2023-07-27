import React from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useRecoilState } from "recoil";
import SidebarAtom from "../../recoil/global-atoms/SidebarAtom";

import { userList } from "../../utils/userIdList";
import { useNavigate } from "react-router-dom";

const SecondaryHeader = () => {
  const [sidebarToggle, setSidebarToggle] = useRecoilState(SidebarAtom);
  const navigate = useNavigate();
  const logout = () => {
    localStorage?.clear();
    navigate("/login");
  };

  return (
    <div className="w-full p-4 border-t-2 border-b-2 flex justify-between  items-center  z-[200] text-sky-600">
      <div className="flex gap-2 items-center">
        <div className="block sm:hidden w-fit pr-4 pl-1">
          <span
            className="cursor-pointer z-[250]"
            onClick={() => setSidebarToggle(!sidebarToggle)}
          >
            <MenuRoundedIcon fontSize="large" className="text-sky-600" />
          </span>
        </div>

        <div>
          <img
            src={userList[Number(localStorage?.getItem("userId")) - 1]?.img}
            alt="ccd logo"
            className="w-full max-w-[150px]"
          />
        </div>
      </div>

      <span onClick={logout} className="cursor-pointer">
        <LogoutOutlinedIcon />
      </span>
    </div>
  );
};

export default SecondaryHeader;
