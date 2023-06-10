import { atom } from "recoil";

const ProviderNSSAtom = atom({
  key: "ProviderNSSAtom", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default ProviderNSSAtom;
