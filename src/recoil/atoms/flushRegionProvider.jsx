import { atom } from "recoil";

const flushRegionProvider = atom({
  key: "flushRegionProvider", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default flushRegionProvider;
