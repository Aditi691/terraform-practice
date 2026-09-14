import db from "./db.js"

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS sightings (
        uuid VARCHAR(36) PRIMARY KEY,
        location VARCHAR(255) NOT NULL,
        timeStamp DATETIME NOT NULL,
        title VARCHAR(255) NOT NULL,
        text TEXT NOT NULL
    )
`

export async function createTable() {
    await db.execute(createTableQuery)
    console.log("Sightings table is ready")
}