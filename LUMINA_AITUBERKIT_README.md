# Lollipop Lumina on AITuberKit

This folder is a Lumina-ready AITuberKit setup.

## What Is Set Up

- Character name: ロリポップ・ルミナ
- Model type: VRM
- VRM: `public/vrm/lollipop_lumina.vrm`
- Background: `public/backgrounds/lumina-room.jpeg`
- Default LLM: Ollama `qwen2.5:14b`
- Default voice: VOICEVOX 小夜/SAYO
- Presets:
  - ロリポップ・ルミナ
  - お悩み雑談室
  - 初見歓迎まつり
  - 深夜しっとり雑談
  - 小悪魔いじり回

## Start

Double-click:

```bat
LAUNCH_LUMINA.bat
```

Or run:

```powershell
cd "C:\Users\ririk\Desktop\ツイッチAI可動計画\aituber-kit-lumina"
npm install
npm run lumina:check
npm run lumina:dev
```

Then open:

```text
http://localhost:3000
```

If `.env.local` is missing, copy `.env.lumina.example` to `.env.local`.

## Local Services

For the default setup, start these before talking with Lumina:

- Ollama: `http://localhost:11434`
- VOICEVOX Engine: `http://localhost:50021`

The current `.env.local` uses:

```text
NEXT_PUBLIC_SELECT_AI_SERVICE="ollama"
NEXT_PUBLIC_SELECT_AI_MODEL="qwen2.5:14b"
NEXT_PUBLIC_LOCAL_LLM_URL="http://localhost:11434"
NEXT_PUBLIC_SELECT_VOICE="voicevox"
VOICEVOX_SERVER_URL="http://localhost:50021"
NEXT_PUBLIC_VOICEVOX_SPEAKER="46"
```

## Notes

- `.env.local` is local-only and ignored by Git.
- AITuberKit supports YouTube and OneComme. Twitch can be routed through OneComme or handled by the existing Open-LLM-VTuber Twitch bridge later.
- COEIROINK Tsukuyomi is still the production default in the Open-LLM-VTuber setup. This AITuberKit setup uses VOICEVOX 小夜/SAYO because VOICEVOX is already installed on this PC and is directly supported by AITuberKit.
