import { atom } from "recoil";

const callClinicProvider = atom({
  key: "callClinicProvider", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default callClinicProvider;
