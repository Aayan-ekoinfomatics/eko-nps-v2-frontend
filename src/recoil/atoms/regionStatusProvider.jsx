import { atom } from "recoil";

const regionStatusProvider = atom({
  key: "regionStatusProvider", // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

export default regionStatusProvider;
