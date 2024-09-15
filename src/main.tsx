import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App.tsx";
import { store } from "../src/lib/store.ts";
import { Provider } from "react-redux";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <main className="custom">
          <App />
        </main>
      </NextUIProvider>
    </Provider>
  </StrictMode>
);
