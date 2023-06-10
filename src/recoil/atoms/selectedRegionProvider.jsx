import { atom } from "recoil";

const selectedRegionProvider = atom({
  key: "selectedRegionProvider", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default selectedRegionProvider;
