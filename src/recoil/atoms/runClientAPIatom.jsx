import { atom } from "recoil";

const runClientAPIatom = atom({
  key: "runClientAPIatom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default runClientAPIatom;
