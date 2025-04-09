import React from "react";
import { useAvatar } from "../contexts/AvatarContext";
import { useNavigate } from "react-router-dom";

const avatars = [
  { id: "cat", label: "Cat" },
  { id: "woman", label: "Woman" },
  { id: "robot", label: "Robot" },
];

export default function SelectAvatar() {
  const { selected, setSelected } = useAvatar();
  const navigate = useNavigate();

  const handleSelect = (id: "cat" | "woman" | "robot") => {
    setSelected(id);
    navigate("/chat"); // Navigate to call screen after selecting
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Choose Your Avatar</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 20 }}>
        {avatars.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => handleSelect(avatar.id as "cat" | "woman" | "robot")}
            style={{
              padding: "20px 30px",
              borderRadius: 12,
              fontSize: 18,
              border: selected === avatar.id ? "3px solid blue" : "1px solid #ccc",
              cursor: "pointer",
              backgroundColor: selected === avatar.id ? "#eef6ff" : "#fff",
            }}
          >
            {avatar.label}
          </button>
        ))}
      </div>
    </div>
  );
}
