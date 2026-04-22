import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const requiredFiles = [
  '.env.local',
  'public/vrm/lollipop_lumina.vrm',
  'public/backgrounds/lumina-room.jpeg',
  'public/presets/preset1.txt',
  'public/presets/preset2.txt',
  'public/presets/preset3.txt',
  'public/presets/preset4.txt',
  'public/presets/preset5.txt',
  'public/presets/idle-ai-prompt-template.txt',
]

let ok = true

for (const file of requiredFiles) {
  const fullPath = path.join(root, file)
  if (!fs.existsSync(fullPath)) {
    console.error(`[missing] ${file}`)
    ok = false
    continue
  }
  const stat = fs.statSync(fullPath)
  console.log(`[ok] ${file} (${stat.size} bytes)`)
}

const envText = fs.existsSync(path.join(root, '.env.local'))
  ? fs.readFileSync(path.join(root, '.env.local'), 'utf8')
  : ''

const expectedEnv = [
  'NEXT_PUBLIC_CHARACTER_NAME="ロリポップ・ルミナ"',
  'NEXT_PUBLIC_MODEL_TYPE="vrm"',
  'NEXT_PUBLIC_SELECTED_VRM_PATH="/vrm/lollipop_lumina.vrm"',
  'NEXT_PUBLIC_SELECT_AI_SERVICE="ollama"',
  'NEXT_PUBLIC_SELECT_VOICE="voicevox"',
  'VOICEVOX_SERVER_URL="http://localhost:50021"',
]

for (const line of expectedEnv) {
  if (!envText.includes(line)) {
    console.error(`[env missing] ${line}`)
    ok = false
  } else {
    console.log(`[env ok] ${line}`)
  }
}

if (!ok) {
  process.exitCode = 1
} else {
  console.log('Lumina AITuberKit setup is ready.')
}
