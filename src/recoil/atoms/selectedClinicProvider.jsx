import { atom } from "recoil";

const selectedClinicProvider = atom({
  key: "selectedClinicProvider", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default selectedClinicProvider;
