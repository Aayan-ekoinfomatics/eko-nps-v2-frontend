import { atom } from "recoil";

const flushClient = atom({
  key: "flushClient", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
