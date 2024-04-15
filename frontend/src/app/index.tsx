// eslint-disable-next-line @conarti/feature-sliced/public-api
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Button } from "@/shared/ui/button";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Button>
      Hi
    </Button>
  </React.StrictMode>,
);
