@echo off
rem Builds and starts the NestJS backend on http://localhost:8080 using the project-local Node 24 in .node\
setlocal
set "PATH=%~dp0.node\node-v24.22.3-win-x64;%PATH%"
cd /d "%~dp0recipe-book-nest"
if not exist node_modules call npm install
call npm run build && call npm start
