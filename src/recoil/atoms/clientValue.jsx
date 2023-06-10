import { atom } from "recoil";

const clientValue = atom({
  key: "clientValue", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export default clientValue;
