import { atom } from "recoil";

const ProviderDateFilterStatus = atom({
  key: "ProviderDateFilterStatus", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default ProviderDateFilterStatus;
