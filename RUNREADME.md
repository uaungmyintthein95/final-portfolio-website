# Run this project

This project is a Vite + React portfolio site.

## 1) Open a terminal

Open Command Prompt or PowerShell and go to the project folder:

```bash
cd C:\Users\aungm\Desktop\3DinteractiveWeb\portfolioupdate\i\portfolio-site
```

## 2) Install dependencies

```bash
npm install
```

If you are in PowerShell and `npm` is blocked by the execution policy, use Command Prompt instead:

```cmd
cd /d C:\Users\aungm\Desktop\3DinteractiveWeb\portfolioupdate\i\portfolio-site
npm install
```

## 3) Start the dev server

### Recommended on Windows

```cmd
cd /d C:\Users\aungm\Desktop\3DinteractiveWeb\portfolioupdate\i\portfolio-site
npm run dev
```

### If using PowerShell

```powershell
cd C:\Users\aungm\Desktop\3DinteractiveWeb\portfolioupdate\i\portfolio-site
npm run dev
```

If PowerShell still refuses to run `npm.ps1`, use the command-prompt method above.

## 4) Open the site

After the server starts, Vite will print a local URL such as:

```text
http://localhost:5173/
```

Open that in your browser.

## 5) Production build (optional)

```bash
npm run build
```

This creates the production files in the `dist` folder.

## 6) Common issue on Windows

If you see an error like:

```text
npm.ps1 cannot be loaded because running scripts is disabled on this system
```

then run the project from `cmd.exe` instead of PowerShell:

```cmd
cd /d C:\Users\aungm\Desktop\3DinteractiveWeb\portfolioupdate\i\portfolio-site
npm run dev
```

## Quick copy-paste version

```cmd
cd /d C:\Users\aungm\Desktop\3DinteractiveWeb\portfolioupdate\i\portfolio-site
npm install
npm run dev
```

Then open:

```text
http://localhost:5173/
```
