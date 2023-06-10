import { atom } from "recoil";

const startDateValueProvider = atom({
  key: "startDateValueProvider", // unique ID (with respect to other atoms/selectors)
  default: 2018,
});

export default startDateValueProvider;
