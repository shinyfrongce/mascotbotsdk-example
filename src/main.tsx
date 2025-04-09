import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AvatarProvider } from "./contexts/AvatarContext";
import SelectAvatar from "./pages/SelectAvatar";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <AvatarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SelectAvatar />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </AvatarProvider>
  );
}
