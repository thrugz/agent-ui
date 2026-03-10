# Agent UI — Claude Context

## Project
Next.js 15 + TypeScript chat UI for the Agno API. Branded as **Skarnlabs**. Deployed via Coolify (auto-deploys on push to `main`).

## Stack
- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS + shadcn/ui
- State: Zustand (`src/store`)
- URL state: nuqs (`useQueryState`)
- Icons: lucide-react
- Toasts: sonner
- Package manager: **pnpm**

## Key commands
```
pnpm dev          # dev server on :3000
pnpm build        # production build
pnpm validate     # lint + format + typecheck (run before pushing)
```

## Architecture
- `src/hooks/useAIStreamHandler.ts` — core streaming hook; accepts `string | FormData`
- `src/hooks/useVoiceRecorder.ts` — MediaRecorder lifecycle for voice input
- `src/components/chat/ChatArea/ChatInput/ChatInput.tsx` — main chat input with text + voice
- `src/store` — Zustand global state (isStreaming, chatInputRef, messages, …)

## Voice input
Mic button in ChatInput toggles recording. On stop, sends `FormData { message, audio }` to the stream handler. The API returns `response_audio` (transcript + audio player). Mic hidden on browsers without MediaRecorder support (old Safari, HTTP).

## Conventions
- Commits follow conventional commits (`feat:`, `fix:`, `chore:`, …)
- No force-push to `main`
- Keep components focused; avoid premature abstraction
