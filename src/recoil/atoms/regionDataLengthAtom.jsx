import { atom } from "recoil";

const regionDataLengthAtom = atom({
  key: "regionDataLengthAtom", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export default regionDataLengthAtom;
