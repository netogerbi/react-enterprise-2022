import React from "react";
import Select from "./Select";

import { render, fireEvent } from "@testing-library/react";

const opts = [
  { label: "Neto", value: "neto" },
  { label: "Tati", value: "tati" },
];

test("render all options passed to Select", () => {
  const rendered = render(<Select options={opts} />);

  fireEvent.click(rendered.getByTestId("DseSelectButton"));

  expect(rendered.getAllByRole("menuitemradio")).toHaveLength(opts.length);
});
