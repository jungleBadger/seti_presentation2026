<template>
  <main class="session-admin">
    <header>
      <p class="admin-eyebrow">Planos Falíveis · controle da sessão</p>
      <h1>
        {{
          adminAuthorized
            ? "Configurar apresentação ao vivo"
            : "Acesso administrativo"
        }}
      </h1>
      <p>
        {{
          adminAuthorized
            ? "Configure o multiplex e o QR code sem realizar um novo deploy."
            : "Conecte-se ao servidor multiplex e autorize este navegador."
        }}
      </p>
    </header>

    <form v-if="!adminAuthorized" @submit.prevent="authorizeAdmin">
      <label>
        <span>URL do Socket.IO via ngrok</span>
        <input
          v-model.trim="socketOrigin"
          type="url"
          inputmode="url"
          placeholder="https://exemplo.ngrok-free.app"
          required
        />
      </label>

      <label>
        <span>Senha administrativa</span>
        <input
          v-model="adminSecret"
          type="password"
          autocomplete="current-password"
          placeholder="O valor de ADMIN_SECRET"
          required
        />
        <small>
          A senha é validada pelo servidor e não é armazenada neste navegador.
        </small>
      </label>

      <div class="admin-actions">
        <button type="submit" class="primary">Autorizar acesso</button>
      </div>
    </form>

    <form v-else @submit.prevent="launchPresenter">
      <label>
        <span>URL do Socket.IO via ngrok</span>
        <input
          v-model.trim="socketOrigin"
          type="url"
          inputmode="url"
          required
          readonly
        />
      </label>

      <label>
        <span>Sala</span>
        <input v-model.trim="room" type="text" required />
      </label>

      <label>
        <span>Tema da apresentação</span>
        <select v-model="theme">
          <option value="projector">Projetor · alto contraste</option>
          <option value="dark">Escuro</option>
          <option value="light">Claro</option>
        </select>
        <small>O mesmo tema será usado pelo apresentador e pela audiência.</small>
      </label>

      <label>
        <span>Chave mestre</span>
        <input
          v-model="masterKey"
          type="password"
          autocomplete="off"
          placeholder="A mesma chave do multiplex_client/.env"
          required
        />
        <small>
          A chave é salva apenas no sessionStorage e nunca entra no QR code.
        </small>
      </label>

      <div class="admin-actions">
        <button type="button" class="secondary" @click="testConnection">
          Testar servidor
        </button>
        <button type="submit" class="primary">Abrir modo apresentador</button>
      </div>
    </form>

    <section v-if="adminAuthorized" class="session-preview">
      <h2>URL que será compartilhada</h2>
      <code>{{ audienceUrl }}</code>
      <button type="button" class="text-button" @click="copyAudienceUrl">
        {{ copied ? "URL copiada" : "Copiar URL da audiência" }}
      </button>
    </section>

    <p class="admin-status" :class="statusType" aria-live="polite">
      {{ statusMessage }}
    </p>
  </main>
</template>

<script setup>
import { computed, ref } from "vue";

defineOptions({ name: "SessionAdmin" });

const props = defineProps({
  defaultRoom: {
    type: String,
    required: true
  },
  defaultSocketOrigin: {
    type: String,
    default: ""
  }
});

const STORAGE_KEY = "planos-faliveis:session-config";
const MASTER_KEY_STORAGE = "planos-faliveis:master-key";
const ADMIN_AUTH_STORAGE = "planos-faliveis:admin-authorized-socket";

function loadSavedConfig() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function normalizedSocketOrigin(value) {
  return value.trim().replace(/\/$/, "");
}

function presentationUrl() {
  const url = new URL(window.location.href);
  for (const key of [
    "admin",
    "master",
    "key",
    "status",
    "socket",
    "room",
    "theme"
  ]) {
    url.searchParams.delete(key);
  }
  return url;
}

const savedConfig = loadSavedConfig();
const socketOrigin = ref(
  savedConfig.socketOrigin || props.defaultSocketOrigin || ""
);
const room = ref(savedConfig.room || props.defaultRoom);
const theme = ref(savedConfig.theme || "projector");
const adminSecret = ref("");
const adminAuthorized = ref(
  window.sessionStorage.getItem(ADMIN_AUTH_STORAGE) ===
    normalizedSocketOrigin(socketOrigin.value)
);
const masterKey = ref("");
const copied = ref(false);
const statusMessage = ref("");
const statusType = ref("");

const audienceUrl = computed(() => {
  const url = presentationUrl();
  const socket = normalizedSocketOrigin(socketOrigin.value);
  if (socket) url.searchParams.set("socket", socket);
  if (room.value) url.searchParams.set("room", room.value);
  url.searchParams.set("theme", theme.value);
  return url.toString();
});

function validateConfig() {
  const socket = normalizedSocketOrigin(socketOrigin.value);
  validateSocketOrigin(socket);
  if (!room.value) throw new Error("Informe uma sala.");
  if (!masterKey.value) throw new Error("Informe a chave mestre.");
  return socket;
}

function validateSocketOrigin(socket) {
  const socketUrl = new URL(socket);
  if (
    window.location.protocol === "https:" &&
    socketUrl.protocol !== "https:"
  ) {
    throw new Error("Use a URL HTTPS do ngrok para evitar conteúdo misto.");
  }
}

function savePublicConfig(socket) {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      socketOrigin: socket,
      room: room.value,
      theme: theme.value
    })
  );
}

async function testConnection() {
  statusType.value = "";
  statusMessage.value = "Testando conexão...";

  try {
    const socket = normalizedSocketOrigin(socketOrigin.value);
    if (!socket) throw new Error("Informe a URL do ngrok.");
    const response = await fetch(`${socket}/health`, {
      headers: { "ngrok-skip-browser-warning": "true" }
    });
    if (!response.ok)
      throw new Error(`Servidor respondeu HTTP ${response.status}.`);
    const payload = await response.json();
    if (payload.status !== "ok")
      throw new Error("Resposta inesperada do servidor.");
    statusType.value = "success";
    statusMessage.value = "Servidor acessível.";
  } catch (error) {
    statusType.value = "error";
    statusMessage.value =
      error?.message || "Não foi possível acessar o servidor.";
  }
}

async function authorizeAdmin() {
  statusType.value = "";
  statusMessage.value = "Validando acesso...";

  try {
    const socket = normalizedSocketOrigin(socketOrigin.value);
    if (!socket) throw new Error("Informe a URL do ngrok.");
    validateSocketOrigin(socket);
    if (!adminSecret.value) throw new Error("Informe a senha administrativa.");

    const response = await fetch(`${socket}/admin/authorize`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "ngrok-skip-browser-warning": "true"
      },
      body: JSON.stringify({ secret: adminSecret.value })
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok || !payload.authorized) {
      if (response.status === 401) throw new Error("Senha administrativa inválida.");
      if (response.status === 503) {
        throw new Error("ADMIN_SECRET não está configurado no servidor.");
      }
      throw new Error("Não foi possível autorizar o acesso.");
    }

    savePublicConfig(socket);
    window.sessionStorage.setItem(ADMIN_AUTH_STORAGE, socket);
    adminSecret.value = "";
    adminAuthorized.value = true;
    statusType.value = "success";
    statusMessage.value = "Acesso autorizado neste navegador.";
  } catch (error) {
    statusType.value = "error";
    statusMessage.value =
      error?.message || "Não foi possível autorizar o acesso.";
  }
}

async function copyAudienceUrl() {
  try {
    await navigator.clipboard.writeText(audienceUrl.value);
    copied.value = true;
    statusType.value = "success";
    statusMessage.value = "URL da audiência copiada.";
    window.setTimeout(() => {
      copied.value = false;
    }, 1800);
  } catch {
    statusType.value = "error";
    statusMessage.value = "Não foi possível copiar a URL neste navegador.";
  }
}

function launchPresenter() {
  try {
    const socket = validateConfig();
    savePublicConfig(socket);
    window.sessionStorage.setItem(MASTER_KEY_STORAGE, masterKey.value);

    const url = presentationUrl();
    url.searchParams.set("master", "1");
    url.searchParams.set("status", "1");
    url.searchParams.set("socket", socket);
    url.searchParams.set("room", room.value);
    url.searchParams.set("theme", theme.value);
    window.location.assign(url.toString());
  } catch (error) {
    statusType.value = "error";
    statusMessage.value = error?.message || "Revise a configuração.";
  }
}
</script>

<style scoped>
.session-admin {
  box-sizing: border-box;
  min-height: 100%;
  padding: clamp(2rem, 6vw, 5rem);
  background:
    linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    #161616;
  background-size: 32px 32px;
  color: #f4f4f4;
  font-family: "IBM Plex Sans", "Helvetica Neue", Arial, sans-serif;
}

header,
form,
.session-preview,
.admin-status {
  width: min(760px, 100%);
}

.admin-eyebrow {
  color: #78a9ff;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  max-width: 12ch;
  margin: 1.5rem 0 1rem;
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 0.95;
}

header > p:last-child {
  max-width: 54ch;
  color: #c6c6c6;
  line-height: 1.5;
}

form {
  display: grid;
  gap: 1px;
  margin-top: 3rem;
  background: #525252;
  border: 1px solid #525252;
}

label {
  display: grid;
  gap: 0.65rem;
  padding: 1rem;
  background: #262626;
}

label > span {
  font-size: 0.875rem;
  font-weight: 500;
}

label small {
  color: #a8a8a8;
  font-size: 0.75rem;
}

input,
select {
  box-sizing: border-box;
  width: 100%;
  padding: 0.9rem 0;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #8d8d8d;
  border-radius: 0;
  color: #f4f4f4;
  font: inherit;
  outline: none;
}

select {
  color-scheme: dark;
}

input:focus,
select:focus {
  border-bottom-color: #78a9ff;
  box-shadow: 0 2px 0 #78a9ff;
}

.admin-actions {
  display: flex;
  justify-content: flex-end;
  background: #161616;
}

button {
  min-height: 3rem;
  padding: 0.8rem 1rem;
  border: 0;
  color: #ffffff;
  cursor: pointer;
  font: inherit;
  font-weight: 500;
}

.primary {
  background: #0f62fe;
}

.primary:hover {
  background: #0353e9;
}

.secondary {
  background: #393939;
}

.secondary:hover {
  background: #4c4c4c;
}

.session-preview {
  box-sizing: border-box;
  margin-top: 2rem;
  padding: 1rem;
  background: #262626;
  border-top: 4px solid #0f62fe;
}

.session-preview h2 {
  margin: 0 0 0.8rem;
  font-size: 1rem;
  font-weight: 500;
}

.session-preview code {
  display: block;
  overflow-wrap: anywhere;
  color: #c6c6c6;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.8rem;
  line-height: 1.5;
}

.text-button {
  min-height: auto;
  margin-top: 0.8rem;
  padding: 0;
  background: transparent;
  color: #78a9ff;
}

.admin-status {
  min-height: 1.5rem;
  color: #c6c6c6;
}

.admin-status.success {
  color: #42be65;
}

.admin-status.error {
  color: #ff8389;
}

@media (max-width: 600px) {
  .admin-actions {
    flex-direction: column;
  }
}
</style>
