import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method that takes some content and adds it to the IndexedDB database using the idb module
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

// Method that gets content from the IndexedDB database using the idb module
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');
  // Check if a variable is defined and if it is, return it. See MDN Docs on Optional Chaining (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
  return result?.value;
};

initdb();



//indexdb is a powerful local storage that you can save for later for when you are offline and when you come back online you can send the payload to the db
//works like local storage and mongo but it's for larger payloads than you would use for local storage

//server and client working at the same time
//service worker that downloads the manifest.json that you download for the offline functionality like a mini application
//this is set up in the webpack config but it is indeed it's own file

//in the case that you don't have a working indexdb then it uses the local storage to backup the information temporarily in emergencies

// when you npm run build you want to do that in the root so that you can run the client and server simultaneously