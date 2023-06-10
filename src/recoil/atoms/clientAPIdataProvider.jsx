import { atom } from "recoil";

const clientAPIdataProvider = atom({
  key: "clientAPIdataProvider", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default clientAPIdataProvider;
