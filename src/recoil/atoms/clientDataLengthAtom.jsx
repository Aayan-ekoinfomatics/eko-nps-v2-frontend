import { atom } from "recoil";

const clientDataLengthAtom = atom({
  key: "clientDataLengthAtom", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export default clientDataLengthAtom;
