import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import App from "./App";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import { MouseFollower } from "react-mouse-follower";
import { FaviconChanger } from "components";

const container = document.getElementById("root");
const root = createRoot(container);

// Thêm đường dẫn của favicon vào document.head
const link = document.createElement("link");
link.setAttribute("rel", "icon");
link.setAttribute("type", "image/png"); // Thay đổi type nếu bạn sử dụng .ico hoặc loại file khác
link.setAttribute("href", "/favicon.png"); // Thay đổi tên file favicon nếu cần thiết

document.head.appendChild(link);

root.render(
  <Provider store={store}>
    <Router>
      <FaviconChanger />
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={250}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
        />
      </PersistGate>
    </Router>
  </Provider>
);
