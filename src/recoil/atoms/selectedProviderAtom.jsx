import { atom } from "recoil";

const selectedProviderAtom = atom({
  key: "selectedProviderAtom", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default selectedProviderAtom;
