# AssetInsightsTest

Issue with installing a package in front end directory, and it installing 7k+ packages. Couldn't commit to github.

//node server.js && cd frontend && npm start

"test": "echo \"Error: no test specified\" && exit 1",
    "dev": "next dev",
    "build": "next build",
    "start": "node server.js",
    "install:frontend": "cd frontend && npm install",
    "install:backend": "npm install",
    "start:frontend": "cd frontend && npm run build && npm start",
    "start:backend": "node server.js",
    "start:fullstack": "npm run install:frontend && npm run install:backend && npm run start:backend"