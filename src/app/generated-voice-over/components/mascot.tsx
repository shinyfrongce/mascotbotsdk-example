import { useRef } from "react";
import { useMascot, useMascotPlayback } from "@mascotbot-sdk/react";

export function Mascot() {
  const { RiveComponent } = useMascot();
  const mascotPlayback = useMascotPlayback();

  const audioRef = useRef<HTMLAudioElement>(null);

  async function play() {
    const visemes = await fetch("/mascotbot/example_1/visemes.json").then(
      (res) => res.json()
    );

    mascotPlayback.add(visemes);

    if (audioRef.current) {
      audioRef.current.src = "/mascotbot/example_1/audio.mp3";

      audioRef.current.oncanplay = () => {
        if (!audioRef.current) return;

        mascotPlayback.play();
        audioRef.current.play();
      };

      audioRef.current.onended = () => {
        mascotPlayback.reset();
      };
    }
  }

  function reset() {
    mascotPlayback.reset();

    if (audioRef.current) {
      audioRef.current.pause();
    }
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <RiveComponent />

      <audio playsInline ref={audioRef} />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          display: "flex",
          width: "100%",
          paddingBlock: ".5rem",
          backgroundColor: "white",
        }}
      >
        <div
          style={{ display: "flex", columnGap: "1rem", marginInline: "auto" }}
        >
          <button onClick={play}>Play</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}
