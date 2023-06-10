import { atom } from "recoil";

const inputFieldNull = atom({
  key: "inputFieldNull", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default inputFieldNull;
