# Planos Falíveis

Reveal.js presentation built with Vue 3 and Vite, served locally by Fastify.

## Commands

```bash
npm run build
npm start
```

For client development with live reload:

```bash
npm run start:dev
```

## Presentation Controls

- Arrow keys or Reveal.js controls navigate the deck.
- Press `T` to cycle through projector, light, and default themes.
- A connected gamepad can navigate with the D-pad, face buttons, or left stick.

## Audience Synchronization

The optional server in `multiplex_client` relays navigation to audience devices.
Configure the presentation with:

```bash
VITE_PUBLIC_URL=https://example.com/planos-faliveis/
VITE_ROOM=planos-faliveis
VITE_SOCKET_ORIGIN=https://your-ngrok-endpoint.example
```

Start the multiplex server separately:

```bash
cd multiplex_client
npm start
```

Open the presenter URL with:

```text
?master=1&key=YOUR_MASTER_SECRET&room=planos-faliveis&status=1
```

See `.env.example` for the complete configuration.
