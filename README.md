# Petal Booth

A responsive, private browser photobooth. Solo sessions capture and compose photos entirely on-device. Paired mode uses WebRTC for peer-to-peer video and a tiny WebSocket service only to exchange connection metadata.

Decorative SVG assets are from [OpenMoji](https://openmoji.org/), licensed under CC BY-SA 4.0. All emojis designed by OpenMoji — the open-source emoji and icon project.

## Run locally

```bash
npm install
npm run dev
```

For paired mode during local Vite development, open another terminal:

```bash
cd signaling-server
npm install
npm start
```

Copy `.env.example` to `.env` if the signaling server is not at `ws://localhost:8787`. Run tests with `npm test` and make a production build with `npm run build`.

## Production

Deploy the repository directly to Vercel. `vercel.json` builds the Vite frontend and exposes `/api/signal` as a Vercel WebSocket Function, so no second host or signaling URL is required. Camera APIs require HTTPS, which Vercel provides automatically. The signaling Function relays WebRTC metadata only; camera media and captured photos travel peer-to-peer and are never stored.

If signaling is unavailable, the app presents a clear connection error and solo mode remains fully functional. WebSocket connections are bounded by the Vercel Function duration, so long idle paired sessions may need to reconnect. For difficult corporate/mobile networks, configure a TURN server in addition to the included STUN servers.
