import { atom } from "recoil";

const selectedClientProvider = atom({
  key: "selectedClientProvider", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default selectedClientProvider;
