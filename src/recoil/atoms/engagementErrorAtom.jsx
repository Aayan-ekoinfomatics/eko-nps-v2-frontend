import { atom } from "recoil";

const engagementErrorAtom = atom({
  key: "engagementErrorAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default engagementErrorAtom;
