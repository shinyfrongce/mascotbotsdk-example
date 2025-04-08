import { MascotProvider } from "@mascotbot-sdk/react";
import GeneratedVoiceOver from "./app/generated-voice-over/app";
import InputVoiceOver from "./app/input-voice-over/app";
import Call from "./app/call/app";

export default function App() {
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
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            borderBottom: "3px solid #efefef",
          }}
        >
          <section style={{ borderRight: "3px solid #efefef" }}>
            <GeneratedVoiceOver />
          </section>

          <section>
            <InputVoiceOver />
          </section>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
          }}
        >
          <section>
            <Call />
          </section>
        </div>
      </div>
    </MascotProvider>
  );
}
