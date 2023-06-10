import { atom } from "recoil";
import { monthnameList } from "../../utils/MonthNames";

const endMonthValueProvider = atom({
  key: "endMonthValueProvider", // unique ID (with respect to other atoms/selectors)
  default: 11, // default value (aka initial value)
});

export default endMonthValueProvider;
