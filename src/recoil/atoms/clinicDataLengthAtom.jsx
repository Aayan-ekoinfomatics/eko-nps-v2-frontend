import { atom } from "recoil";

const clinicDataLengthAtom = atom({
  key: "clinicDataLengthAtom", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export default clinicDataLengthAtom;
