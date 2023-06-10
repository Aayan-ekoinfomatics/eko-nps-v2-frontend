import { atom } from "recoil";

const AllFilterDataProvider = atom({
  key: "AllFilterDataProvider", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default AllFilterDataProvider;
