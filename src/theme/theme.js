import { extendTheme } from "@chakra-ui/react";
import { CardComponent } from "./additions/card/card";
import { buttonStyles } from "./components/button";
import { badgeStyles } from "./components/badge";
import { inputStyles } from "./components/input";
import { progressStyles } from "./components/progress";
import { linkStyles } from "./components/link";
import { breakpoints } from "./foundations/breakpoints";
import { globalStyles } from "./styles";
export default extendTheme(
  { breakpoints },
  globalStyles,
  badgeStyles,
  buttonStyles,
  linkStyles,
  progressStyles,
  inputStyles,
  CardComponent
);
