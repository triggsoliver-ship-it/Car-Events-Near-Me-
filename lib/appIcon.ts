import React from "react";
import { ImageResponse } from "next/og";

// Builds the app icon as a React element tree using only Satori-supported SVG
// primitives (gradients, rect, path, circle) so next/og can rasterise it to a
// PNG at any size. No binary asset or base64 lives in the repo.
const CAR_PATH =
  "M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256V368c0 17.7 14.3 32 32 32H65.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H385.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7 0 32-14.3 32-32V320c0-65.2-48.8-119-111.8-127zM160 320a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z";

const e = React.createElement;

function iconSvg(size: number) {
  return e(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", width: size, height: size },
    e(
      "defs",
      {},
      e(
        "linearGradient",
        { id: "bg", x1: "0", y1: "0", x2: "1", y2: "1" },
        e("stop", { offset: "0", "stop-color": "#ff5118" }),
        e("stop", { offset: "1", "stop-color": "#ffb800" })
      ),
      e(
        "linearGradient",
        { id: "inner", x1: "0", y1: "0", x2: "1", y2: "1" },
        e("stop", { offset: "0", "stop-color": "#ff6a2b" }),
        e("stop", { offset: "1", "stop-color": "#ffc62e" })
      )
    ),
    e("rect", { x: 0, y: 0, width: 512, height: 512, rx: 114, fill: "url(#bg)" }),
    e("path", {
      fill: "#ffffff",
      d: "M256 432 C 150 312, 126 282, 126 200 A 130 130 0 1 1 386 200 C 386 282, 362 312, 256 432 Z",
    }),
    e("circle", { cx: 256, cy: 200, r: 92, fill: "url(#inner)" }),
    e(
      "g",
      { transform: "translate(181,150) scale(0.234)", fill: "#ffffff" },
      e("path", { d: CAR_PATH })
    )
  );
}

export function iconResponse(size: number) {
  return new ImageResponse(
    e("div", { style: { display: "flex", width: "100%", height: "100%" } }, iconSvg(size)),
    { width: size, height: size }
  );
}
