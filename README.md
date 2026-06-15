# Planos Falíveis

Reveal.js presentation built with Vue 3 and Vite, served locally by Fastify.

## Commands

```bash
npm run build
npm start
```

The local Fastify server detects the asset prefix recorded in the generated
`index.html`. It can therefore serve both a local build using `/assets/` and a
GitHub Pages build using `/seti_presentation2026/assets/`.

For client development with live reload:

```bash
npm run start:dev
```

## Presentation Controls

- Press `?` or `F1` to display the built-in shortcut help.
- Arrow keys or Reveal.js controls navigate the deck.
- Press `T` to cycle through projector, dark, and light themes.
- Press `S` to open the speaker view with presenter notes.
- A connected gamepad can navigate with the D-pad, face buttons, or left stick.

See `DELIVERY_GUIDE.md` for timing, transitions, story prompts, and likely
audience questions.

## Audience Synchronization

The optional server in `multiplex_client` relays navigation to audience devices.
The live ngrok URL is configured at presentation time and does not require a
GitHub Pages deployment.

### Live session setup

1. Copy `multiplex_client/.env.example` to `multiplex_client/.env` and set:

```dotenv
ADMIN_SECRET=use-a-different-long-random-value
MASTER_SECRET=use-a-long-random-value
PORT=3005
```

2. Start the server:

```bash
cd multiplex_client
npm start
```

3. Expose port `3005` through ngrok:

```bash
ngrok http 3005
```

4. Open the session administration page:

```text
https://junglebadger.github.io/seti_presentation2026/?admin=1
```

5. Enter the HTTPS ngrok URL and `ADMIN_SECRET` to unlock the controls.
6. Select the presentation theme, then enter the room and `MASTER_SECRET`.
   Test the connection and select **Abrir modo apresentador**.

The administration page configures both parts of the live experience:

- `ADMIN_SECRET` is validated by the multiplex server before the controls are
  displayed. It is not stored by the browser.
- The presenter connects to the multiplex server using the secret stored only
  in the browser session.
- The selected theme is included in both presenter and audience URLs.
- When a socket URL is configured, the first slide generates a QR code at
  runtime containing the GitHub Pages URL, room, and ngrok socket URL. Without
  a socket URL, the QR slide is omitted. The master secret is never included.

People who join after the talk has started receive the current slide and
fragment state automatically.

GitHub Pages is static, so `ADMIN_SECRET` protects access to the controls, not
the delivery of the public `?admin=1` HTML itself. Use a long, unique value and
do not reuse `MASTER_SECRET`.

`VITE_PUBLIC_URL`, `VITE_ROOM`, and `VITE_SOCKET_ORIGIN` remain available as
optional build-time defaults. See `.env.example`.

## GitHub Pages

The presentation is deployed from `main` through
`.github/workflows/deploy-pages.yml`.

The public URL is:

```text
https://junglebadger.github.io/seti_presentation2026/
```

Before the first deployment, open the repository on GitHub and select:

```text
Settings → Pages → Build and deployment → Source → GitHub Actions
```

Every subsequent push to `main` will build and deploy the presentation
automatically. The static Pages deployment includes the presentation and QR
code, but not the optional Socket.IO multiplex server.
