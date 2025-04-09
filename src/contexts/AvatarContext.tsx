// src/context/AvatarContext.tsx
import React, { createContext, useContext, useState } from "react";

export const avatars = {
  cat: {
    name: "Cat",
    src: "/demo_mascots/cat.riv",
    voice: "af_heart",
  },
  woman: {
    name: "Woman",
    src: "/demo_mascots/notionGuys.riv",
    voice: "af_heart",
  },
  robot: {
    name: "Robot",
    src: "/demo_mascots/bear.riv",
    voice: "af_heart",
  },
};

// 1. Define the types of the avatars
export type AvatarType = "cat" | "woman" | "robot" | null;

// 2. Define the context type
interface AvatarContextType {
  selected: AvatarType;
  setSelected: React.Dispatch<React.SetStateAction<AvatarType>>;
}

// 3. Create the context with the correct type (null as initial, to be filled later)
const AvatarContext = createContext<AvatarContextType | null>(null);

// 4. Provider that sets up the state and provides it
export const AvatarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selected, setSelected] = useState<AvatarType>(null);

  return (
    <AvatarContext.Provider value={{ selected, setSelected }}>
      {children}
    </AvatarContext.Provider>
  );
};

// 5. Hook to use the context safely
export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatar must be used within an AvatarProvider");
  }
  return context;
};
