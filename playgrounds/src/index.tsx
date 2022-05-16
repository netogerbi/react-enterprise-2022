import React from "react";
import { createRoot } from "react-dom/client";

import { Spacing, FontSize } from "@ds.e/foundation";
import { Color, Image, Text, Margin } from "@ds.e/react";

import "@ds.e/scss/lib/Utilities.css";
import "@ds.e/scss/lib/Text.css";
import "@ds.e/scss/lib/Margin.css";

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
    <br />
    <div>
      <Margin top space="lg">
        <Text children="This is a text" size={FontSize.xl} />
      </Margin>
    </div>
  </>
);
