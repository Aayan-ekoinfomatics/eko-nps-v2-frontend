import { atom } from "recoil";

const regionGlobalProvider = atom({
  key: "regionGlobalProvider", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default regionGlobalProvider;
