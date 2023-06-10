import { atom } from "recoil";

const providerComponentAPIData = atom({
  key: "providerComponentAPIData", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default providerComponentAPIData;
