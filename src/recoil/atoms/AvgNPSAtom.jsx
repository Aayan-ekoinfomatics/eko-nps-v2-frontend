import { atom } from "recoil";

const AvgNPSAtom = atom({
  key: "AvgNPSAtom", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default AvgNPSAtom;
