import { MascotClient } from "@mascotbot-sdk/react";
import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import { Mascot } from "./components/mascot";

export default function GeneratedVoiceOver() {
  const rive = useRive(
    {
      src: "https://zmq5pgrp8hzedcr4.public.blob.vercel-storage.com/avatars/Cat_v3.riv",
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

  return (
    <MascotClient rive={rive}>
      <Mascot />
    </MascotClient>
  );
}
