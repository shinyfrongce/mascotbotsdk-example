import { MascotCall, MascotClient, MascotRive } from "@mascotbot-sdk/react";
import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import { useState } from "react";

const MASCOT_CALL_API_URL = "https://api.mascot.bot/v1/bots/start";
// Currenly, for a limited time/preview purposes, doesn't have authorization
// Will be accessible via API Key with per usage billing
// Soon will have call transcripts, function calling, conversation flows support
// Right now feel free to use for testing/integration

// Define the system prompt for the LLM
const mainPrompt = `You are a friendly and helpful AI assistant. Your goal is to be helpful, harmless, and honest.
- Be concise and clear in your responses
- Admit when you don't know something
- Be friendly and conversational`;

export default function Call() {
  const rive = useRive(
    {
      src: "/demo_mascots/notionGuys.riv",
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

  // Define both TTS and LLM configurations
  const config = {
    tts: {
      engine: "kokoro" as const,
      voice: "af_heart",
    },
    llm: {
      engine: "groq" as const,
      model: "llama-3.3-70b-versatile",
      system_prompt: mainPrompt
    }
  };

  return (
    <MascotClient rive={rive} inputs={["thumbs_up"]}>
      <div
        style={{
          position: "relative",
          height: "100%",
        }}
      >
        <MascotCall
          apiUrl={MASCOT_CALL_API_URL}
          tts={config.tts}
          llm={config.llm}
          debug={false}
        >
          {(provided) => (
            <>
              <MascotRive
                onClick={({ inputs }) => {
                  inputs?.thumbs_up && inputs.thumbs_up.fire();
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  insetInline: 0,
                  paddingBottom: 16,
                  zIndex: 50,
                }}
              >
                {/* 
                  Call Control Buttons
                  - These buttons use props provided by MascotCall (via the `provided` object)
                  - You can fully customize the appearance of these buttons with your own styles
                  - You can conditionally show/hide buttons based on your UI requirements
                  - You only need to spread the provided props (startProps, endProps, muteProps) 
                    onto your custom button elements to maintain functionality
                  - The provided.state and provided.muted values can be used for conditional rendering
                */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 6,
                    width: "max-content",
                    marginInline: "auto",
                  }}
                >
                  {/* 
                    State-aware buttons that change based on call state
                    You can replace these with your own styled components while keeping the props
                  */}
                  {provided.state === "disconnected" ? (
                    <button {...provided.startProps}>Start Voice Mode</button>
                  ) : provided.state === "ready" ? (
                    <button
                      {...provided.endProps}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        borderColor: "red",
                      }}
                    >
                      End
                    </button>
                  ) : (
                    <button
                      className="opacity-50 pointer-events-none"
                      style={{
                        opacity: 0.5,
                        pointerEvents: "none",
                      }}
                    >
                      Connecting…
                    </button>
                  )}
                  {/* 
                    Mute button - spreads the muteProps which contain click handlers
                    You can style this button however you'd like while maintaining functionality
                  */}
                  <button {...provided.muteProps}>
                    {provided.muted ? "Unmute" : "Mute"}
                  </button>
                </div>
              </div>
            </>
          )}
        </MascotCall>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            insetInline: 0,
            height: 150,
            background:
              "linear-gradient(to top,rgb(255, 255, 255) 15%, rgba(255, 255, 255, 0))",
          }}
        />
      </div>
    </MascotClient>
  );
}
