import { useRef, useState } from "react";
import { useMascotPlayback } from "@mascotbot-sdk/react";

function base64ToBlob(base64Data: string, mimeType: string): Blob {
  const byteString = atob(base64Data);
  const byteArray = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([byteArray], { type: mimeType });
}

const API_DOMAIN = "https://mascotbot-seven.vercel.app"; 
// Temporary domain for testing/example of elevenlabs integration purposes
// You can find server-side of this at ./self-host/voice-over


export default function VoiceOverSidebar() {
  const mascotPlayback = useMascotPlayback();

  const [text, setText] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div>
      <audio ref={audioRef} playsInline />

      <textarea
        value={text}
        className="text-black bg-white text-sm w-full"
        onChange={({ target }) => setText(target.value)}
      />

      <button
        type="button"
        className="border border-black"
        onClick={async () => {
          const response = await fetch(`${API_DOMAIN}/api/voice-over`, {
            method: "POST",
            body: JSON.stringify({
              text,
            }),
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
          }

          const { audio, visemes } = await response.json();

          // Convert base64 string to binary Blob
          const audioBlob = base64ToBlob(audio, "audio/wav");
          const audioUrl = URL.createObjectURL(audioBlob);

          mascotPlayback.add(visemes);

          // Play audio
          if (audioRef.current) {
            audioRef.current.src = audioUrl;

            audioRef.current.play();

            audioRef.current.oncanplay = () => {
              mascotPlayback.play();
            };

            audioRef.current.onended = () => {
              mascotPlayback.reset();
            };
          }
        }}
      >
        Play
      </button>
    </div>
  );
}
