import React from "react";
import { createRoot } from "react-dom/client";

import { Button } from "@ds.e/react";

import "@ds.e/scss/lib/Button";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<Button label="Example Button" />);
