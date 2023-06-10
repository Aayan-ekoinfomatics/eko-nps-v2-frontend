import { atom } from "recoil";

const flushClinicProvider = atom({
  key: "flushClinicProvider", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default flushClinicProvider;
