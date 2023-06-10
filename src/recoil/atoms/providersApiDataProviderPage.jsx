import { atom } from "recoil";

const providersApiDataProviderPage = atom({
  key: "providersApiDataProviderPage", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default providersApiDataProviderPage;
