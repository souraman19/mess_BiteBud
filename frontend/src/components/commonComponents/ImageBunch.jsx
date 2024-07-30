import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import Imageinnerbunch from "./ImageInnerBunch";
import "./../../styles/ImageBunch.css";

function Imagebunch() {
  return (
    <div className="imagebunch-outerbox">
      <StyledEngineProvider injectFirst>
        <Imageinnerbunch />
      </StyledEngineProvider>
    </div>
  );
}
export default Imagebunch;
