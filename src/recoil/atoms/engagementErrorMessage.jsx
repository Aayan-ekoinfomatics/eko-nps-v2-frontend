import { atom } from "recoil";

const engagementErrorMessage = atom({
  key: "engagementErrorMessage", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default engagementErrorMessage;
