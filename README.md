# From the Other Side

A small Node.js web app for collecting and sharing paranormal sightings. Visitors can browse a haunted stories archive, submit their own ghostly encounters.

## Overview

This project uses a lightweight custom HTTP server instead of a full framework. It serves static pages from the `public` folder and exposes JSON API endpoints for reading and posting sightings.

The app stores data in `data/data.json` and sanitizes incoming submission text before writing it to disk.

## Features

- Homepage for the site
- "Read" page to browse paranormal sightings
- "Upload" form to submit a new sighting
- JSON API for GET and POST requests
- Live news feed endpoint using Server-Sent Events
- Simple static site hosting with custom 404 handling
- Basic input sanitization for user submissions

## Tech Stack

- Node.js
- JavaScript (ES modules)
- Custom HTTP server
- `sanitize-html` for protecting submitted content

## Project Structure

```text
.
├── data/
│   ├── data.json
│   └── stories.js
├── events/
│   └── sightingEvents.js
├── handlers/
│   └── routeHandlers.js
├── public/
│   ├── 404.html
│   ├── index.css
│   ├── index.html
│   ├── news.html
│   ├── news.js
│   ├── sightings.html
│   ├── upload-sighting.html
│   ├── upload-sighting.js
│   └── images/
├── utils/
│   ├── addNewSighting.js
│   ├── createAlert.js
│   ├── getContentType.js
│   ├── getData.js
│   ├── parseJSONBody.js
│   ├── sanitizeInput.js
│   ├── sendResponse.js
│   └── serveStatic.js
├── package.json
├── server.js
└── README.md
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm start
```

3. Open the app in your browser:

```text
http://localhost:8000
```

## API Endpoints

### GET /api
Returns all stored sightings as JSON.

### POST /api
Adds a new sighting to the data file.

Expected JSON body:

```json
{
  "location": "Exeter, UK",
  "timeStamp": "7 May 2025 at 09:26",
  "title": "The Ghost in Accounting",
  "text": "A mysterious office apparition kept sending emails..."
}
```


## Notes

- The app runs on port `8000` by default.
- If port `8000` is already in use, stop the other process or change the `PORT` value in `server.js`.
- Submission data is sanitized before it is stored.

