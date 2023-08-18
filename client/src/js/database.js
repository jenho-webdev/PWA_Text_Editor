import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("JATE database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  initdb();
  console.log("Post to the database");
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .put() method on the store and pass in the new content.
  const newContent = { jate: content };
  store.put(newContent);

  // Wait for the transaction to be fully completed
  await tx.done;

  console.log("Data stored in IndexedDB:", newContent);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  initdb();
  console.log("GET from the database");

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readonly");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .getAll() method to get all data in the database.
  const result = await store.getAll();

  // Wait for the transaction to be fully completed
  // await tx.done;

  console.log("Data retrieved from IndexedDB:", result);
  return result;
};

initdb();
