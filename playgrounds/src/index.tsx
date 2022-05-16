import React from "react";
import { createRoot } from "react-dom/client";

import { Spacing } from "@ds.e/foundation";
import { Color, Image } from "@ds.e/react";

import "@ds.e/scss/lib/Utilities.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <>
    <Color hexCode="#000" width={Spacing.sm} height={Spacing.sm} />
    <br />
    <Image
      src="https://avatars.githubusercontent.com/u/39864019?v=4"
      width={Spacing.md}
      height={Spacing.md}
    />
  </>
);
