import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PlaybackProvider } from "./contexts/PlayTrackContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { TraductionDictionaryProvider } from "./custom/TraductionDictionary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TraductionDictionaryProvider>
      <PlaybackProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </PlaybackProvider>
    </TraductionDictionaryProvider>
  </StrictMode>
);
