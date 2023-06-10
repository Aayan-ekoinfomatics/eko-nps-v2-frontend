import { atom } from "recoil";

const endDateValue = atom({
  key: "endDateValue", // unique ID (with respect to other atoms/selectors)
  default: 2022, // default value (aka initial value)
});

export default endDateValue;
