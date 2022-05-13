import React from "react";
import { createRoot } from "react-dom/client";

import { Color } from "@ds.e/react";

import "@ds.e/scss/lib/Utilities.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<Color hexCode="#000" width="lg" height="xxxl" />);
