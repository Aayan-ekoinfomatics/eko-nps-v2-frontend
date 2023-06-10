import { atom } from "recoil";

const adminAtom = atom({
  key: "adminAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default adminAtom;
