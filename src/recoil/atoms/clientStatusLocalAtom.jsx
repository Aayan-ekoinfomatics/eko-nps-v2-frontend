import { atom } from "recoil";

const clientStatusLocalAtom = atom({
  key: "clientStatusLocalAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default clientStatusLocalAtom;
