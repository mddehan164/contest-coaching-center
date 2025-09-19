import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux-rtk/store/store.jsx";
import { Suspense } from "react";
import InitialLoader from "./components/InitialLoader.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<InitialLoader />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>
);
