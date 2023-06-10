import { atom } from "recoil";

const adminTypeAtom = atom({
  key: "adminTypeAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default adminTypeAtom;
