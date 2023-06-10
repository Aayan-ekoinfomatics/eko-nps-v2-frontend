import { atom } from "recoil";

const startMonthValueProvider = atom({
  key: "startMonthValueProvider", // unique ID (with respect to other atoms/selectors)
  default: "1", // default value (aka initial value)
});

export default startMonthValueProvider;
