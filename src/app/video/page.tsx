"use client"
import { CallService} from "@/services/call-service";
import { WsService } from "@/services/ws";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react"

export default function VideoTest() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  useEffect(() => {
    const cs = new CallService({
      connectionUrl: "ws://localhost:8443/ws",
      groupName: "example",
      password: "secret",
      username: "bob"
    })
    // })
  }, []);
  return (
    <div>
      <h1>sfu-ws</h1>
      <div>
        <h2>Local Video</h2>
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          style={{ width: '160px', height: '120px' }}
        />
      </div>
      <div>
        <h2>Remote Videos</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {remoteStreams.map((stream, index) => (
            <video
              key={index}
              autoPlay
              playsInline
              ref={(video) => {
                if (video) video.srcObject = stream;
              }}
              style={{ width: '160px', height: '120px', margin: '5px' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}