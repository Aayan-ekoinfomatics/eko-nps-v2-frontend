import { atom } from "recoil";

const endDateValueProvider = atom({
  key: "endDateValueProvider", // unique ID (with respect to other atoms/selectors)
  default: new Date().getFullYear(), // default value (aka initial value)
});

export default endDateValueProvider;
