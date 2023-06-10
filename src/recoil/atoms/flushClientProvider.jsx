import { atom } from "recoil";

const flushClientProvider = atom({
  key: "flushClientProvider", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default flushClientProvider;
