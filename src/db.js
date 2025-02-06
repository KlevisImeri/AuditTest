import git from 'isomorphic-git'
import LightningFS from '@isomorphic-git/lightning-fs'
import initSqlJs from 'sql.js'
import http from 'https://unpkg.com/isomorphic-git@beta/http/web/index.js'

let db // holds our SQL.js Database instance
const fs = new LightningFS('fs')


// Initialize the DB: clone the repo and load the SQLite file from IndexedDB
export const DBInit = async () => {
  if(db) return;
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  })

  try {
    await git.clone({
      fs,
      http,
      dir: '/db',
      depth: 1,
      url: 'https://github.com/KlevisImeri/AuditDB',
      token : process.env.DB_ACCESS_TOKEN,
    })

    const dbFile = await fs.promises.readFile('/db/audit.db')
    db = new SQL.Database(new Uint8Array(dbFile))
  } catch (error) {
    console.error("Error during cloning or database initialization:", error)
    // Handle the error appropriately, e.g., throw it or display a message
    throw error // Re-throw the error to be handled by the caller
  }
}

// Pull latest changes from the repo
export const DBPull = async () => {
  await DBInit()
  try {
    const result = await git.pull({
      dir: '/db',
      url: 'https://github.com/KlevisImeri/AuditDB',
      token: DB_ACCESS_TOKEN,
      fs
    })
    return result
  } catch (error) {
    console.error('Error pulling from repository:', error)
    throw error
  }
}

// Query Houses table
export const DBHouses = async () => {
  await DBInit()
  try {
    const stmt = db.prepare('SELECT * FROM Houses')
    const results = []
    while (stmt.step()) {
      results.push(stmt.getAsObject())
    }
    stmt.free()
    return results
  } catch (error) {
    console.error('Error fetching houses:', error)
    throw error
  }
}

// Query CommunicationBooks table
export const DBCommunicationBooks = async () => {
  await DBInit()
  try {
    const stmt = db.prepare('SELECT * FROM CommunicationBooks')
    const results = []
    while (stmt.step()) {
      results.push(stmt.getAsObject())
    }
    stmt.free()
    return results
  } catch (error) {
    console.error('Error fetching communication books:', error)
    throw error
  }
}

// Query Entries table with a parameter
export const DBEntries = async (CommunicationBookID) => {
  await DBInit()
  try {
    const stmt = db.prepare('SELECT * FROM Entries WHERE BookID = ?')
    stmt.bind([CommunicationBookID])
    const results = []
    while (stmt.step()) {
      results.push(stmt.getAsObject())
    }
    stmt.free()
    return results
  } catch (error) {
    console.error('Error fetching entries:', error)
    throw error
  }
}

// Push changes to the repo
export const DBPush = async () => {
  await DBInit()
  try {
    const result = await git.push({
      dir: '/db',
      url: 'https://github.com/KlevisImeri/AuditDB',
      token: DB_ACCESS_TOKEN,
      fs
    })
    return result
  } catch (error) {
    console.error('Error pushing to repository:', error)
    throw error
  }
}
