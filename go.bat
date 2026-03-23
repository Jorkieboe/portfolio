@echo off
if "%1" == "" (
  npm run start
) else if "%1" == "i" (
  echo Installing packages...
  call npm install
) else if "%1" == "b" (
  npm run build
) else if "%1" == "dev" (
  npm run dev
) else (
  echo Unknown command: %1
  echo Usage:
  echo   go i        # Install packages
  echo   go dev      # Start for dev
  echo   go b        # Build
  echo   go          # Starts in production with caddy
)