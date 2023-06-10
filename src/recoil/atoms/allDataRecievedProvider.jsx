import { atom } from "recoil";

const allDataRecievedProvider = atom({
  key: "allDataRecievedProvider", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default allDataRecievedProvider;
