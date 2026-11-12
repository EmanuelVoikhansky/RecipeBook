@echo off
rem Starts the React dev server using the project-local Node 16 in .node\
setlocal
set "PATH=%~dp0.node\node-v16.20.2-win-x64;%PATH%"
cd /d "%~dp0recipe-book"
call npm start
