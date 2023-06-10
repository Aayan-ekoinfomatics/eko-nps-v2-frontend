import { atom } from "recoil";

const flushClientFilter = atom({
  key: "flushClientFilter", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default flushClientFilter;
