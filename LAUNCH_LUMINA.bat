@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo   Lollipop Lumina - AITuberKit
echo ============================================
echo.
echo URL: http://localhost:3000
echo LLM: Ollama qwen2.5:14b on http://localhost:11434
echo Voice: VOICEVOX 小夜/SAYO on http://localhost:50021
echo.

set "VOICEVOX_ENGINE=%LOCALAPPDATA%\Programs\VOICEVOX\vv-engine\run.exe"
if exist "%VOICEVOX_ENGINE%" (
  powershell -NoProfile -ExecutionPolicy Bypass -Command "if (-not (Get-NetTCPConnection -LocalPort 50021 -ErrorAction SilentlyContinue | Where-Object { $_.State -eq 'Listen' })) { Start-Process -FilePath '%VOICEVOX_ENGINE%' -ArgumentList @('--host','127.0.0.1','--port','50021','--cors_policy_mode','all','--output_log_utf8') -WorkingDirectory (Split-Path '%VOICEVOX_ENGINE%') }"
) else (
  echo [warn] VOICEVOX engine not found. Install/start VOICEVOX for speech.
)

if not exist node_modules (
  echo [setup] Installing npm packages...
  call npm install
  if errorlevel 1 (
    echo [error] npm install failed.
    pause
    exit /b 1
  )
)

call npm run lumina:check
if errorlevel 1 (
  echo [error] Lumina setup check failed.
  pause
  exit /b 1
)

start "" "http://localhost:3000"
call npm run lumina:dev
