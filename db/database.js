const DB_NAME =
  "swimRouletteDB";

const DB_VERSION = 4;

const STATE_STORE =
  "stateStore";

const STATE_KEY =
  "main_state";

let dbInstance = null;

// =========================
// OPEN DB
// =========================
async function openDB(){

  if(dbInstance){

    return dbInstance;
  }

  return new Promise(
    (resolve,reject)=>{

      const request =
        indexedDB.open(
          DB_NAME,
          DB_VERSION
        );

      request.onupgradeneeded =
        event=>{

          const db =
            event.target.result;

          if(
            !db.objectStoreNames.contains(
              STATE_STORE
            )
          ){

            db.createObjectStore(
              STATE_STORE
            );
          }
        };

      request.onsuccess =
        ()=>{

          dbInstance =
            request.result;

          resolve(
            dbInstance
          );
        };

      request.onerror =
        ()=>reject(
          request.error
        );
    }
  );
}

// =========================
// SAVE
// =========================
export async function saveState(state){

  const db =
    await openDB();

  return new Promise(
    (resolve,reject)=>{

      const tx =
        db.transaction(
          STATE_STORE,
          "readwrite"
        );

      const store =
        tx.objectStore(
          STATE_STORE
        );

      const request =
        store.put(
          state,
          STATE_KEY
        );

      request.onsuccess =
        ()=>resolve(true);

      request.onerror =
        ()=>reject(
          request.error
        );
    }
  );
}

// =========================
// LOAD
// =========================
export async function loadState(){

  const db =
    await openDB();

  return new Promise(
    (resolve,reject)=>{

      const tx =
        db.transaction(
          STATE_STORE,
          "readonly"
        );

      const store =
        tx.objectStore(
          STATE_STORE
        );

      const request =
        store.get(
          STATE_KEY
        );

      request.onsuccess =
        ()=>resolve(
          request.result || null
        );

      request.onerror =
        ()=>reject(
          request.error
        );
    }
  );
}
