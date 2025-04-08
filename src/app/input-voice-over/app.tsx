import { MascotClient } from "@mascotbot-sdk/react";
import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import VoiceOverSidebar from "./components/sidebar";

export default function InputVoiceOver() {
  const rive = useRive(
    {
      src: "/demo_mascots/bear.riv",
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
  const { RiveComponent } = rive;

  return (
    <MascotClient rive={rive}>
      <div
        style={{
          position: "relative",
          display: "flex",
          height: "100%",
        }}
      >
        <aside
          style={{
            width: "30%",
            background: "#efefef",
            borderRight: "3px solid #efefef",
          }}
        >
          <VoiceOverSidebar />
        </aside>

        <RiveComponent role="img" aria-label="Mascot" />
      </div>
    </MascotClient>
  );
}
