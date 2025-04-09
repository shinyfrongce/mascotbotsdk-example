// src/pages/Chat.tsx
import { useAvatar, avatars } from "../contexts/AvatarContext";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { MascotClient, MascotCall, MascotRive, MascotProvider } from "@mascotbot-sdk/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Chat() {
  const { selected } = useAvatar();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selected) {
      navigate("/");
    }
  }, [selected, navigate]);

  const avatar = avatars[selected ?? "cat"]; // fallback for hook to work

  const rive = useRive(
    {
      src: avatar.src,
      artboard: "Character",
      animations: "IDLE",
      stateMachines: "InLesson",
      autoplay: true,
      layout: new Layout({
        fit: Fit.FitHeight,
        alignment: Alignment.Center,
      }),
    },
    {
      shouldResizeCanvasToContainer: true,
    }
  );

  const config = {
    tts: {
      engine: "kokoro" as const,
      voice: avatar.voice,
    },
    llm: {
      engine: "groq" as const,
      model: "llama-3.3-70b-versatile",
      system_prompt: `You are a friendly and helpful AI assistant. Your goal is to be helpful, harmless, and honest.
      - Be concise and clear in your responses
      - Admit when you don't know something
      - Be friendly and conversational`,
    },
  };

  if (!selected) {
    return null; // avoid rendering UI while redirecting
  }

  return (
    <MascotProvider>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "repeat(2, minmax(0, 1fr))",
          width: "100vw",
          height: "100dvh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            position: "relative"
          }}
        >
            <MascotClient rive={rive} inputs={["thumbs_up"]}>
              <MascotCall
                apiUrl="https://api.mascot.bot/v1/bots/start"
                tts={config.tts}
                llm={config.llm}
              >
                {(provided) => (
                  <>
                    <MascotRive
                      onClick={({ inputs }) => {
                        inputs?.thumbs_up?.fire();
                      }}
                    />
                    <div style={{ position: "absolute", bottom: -40, width: "100%", textAlign: "center" }}>
                      {provided.state === "disconnected" ? (
                        <button {...provided.startProps}>Start</button>
                      ) : (
                        <button {...provided.endProps}>End</button>
                      )}
                      <button {...provided.muteProps}>
                        {provided.muted ? "Unmute" : "Mute"}
                      </button>
                    </div>
                  </>
                )}
              </MascotCall>
            </MascotClient>
        </div>
      </div>
    </MascotProvider>
  );
}
