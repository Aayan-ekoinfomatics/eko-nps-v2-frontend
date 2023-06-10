import { atom } from "recoil";

const clinicProviderAPI = atom({
  key: "clinicProviderAPI", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default clinicProviderAPI;
