let db;

const openDB = () => {
  const dbName = 'mono-stock-DB';
  const dbVersion = 1;

  const request = indexedDB.open(dbName, dbVersion);
  
  request.onerror = (event) => {
    console.error('Failed to open database:', event.target.error);
  };

  request.onsuccess = (event) => {
    db = event.target.result;
  };
  
  request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains('images')) {
      db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
    }
  };
};

const closeDB = () => {
  if (db) {
    db.close();
  }
}

const addImage = (imageData) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['images'], 'readwrite');
    const store = transaction.objectStore('images');
    const request = store.add({ imageData });
  
    request.onerror = (event) => {
      reject(new Error('Failed to add image:', event.target.error));
    };
  
    request.onsuccess = (event) => {
      const imageData = event.target.result;
      resolve(imageData);
    };
  })
};

const getImage = (id) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['images'], 'readonly');
    const store = transaction.objectStore('images');
    const request = store.get(id);

    request.onerror = (event) => {
      reject(new Error('Failed to retrieve image:', event.target.error));
    };

    request.onsuccess = (event) => {
      const imageData = event.target.result;
      resolve(imageData);
    };
  })
};

const updateImage = (id, newImageData) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['images'], 'readwrite');
    const store = transaction.objectStore('images');
    const request = store.put({ id, imageData: newImageData });

    request.onerror = (event) => {
      reject(new Error('Failed to update image:', event.target.error));
    };

    request.onsuccess = (event) => {
    };
  })
};

const deleteImage = (id) => {
  const transaction = db.transaction(['images'], 'readwrite');
  const store = transaction.objectStore('images');
  const request = store.delete(id);

  request.onerror = (event) => {
    console.error('Failed to delete image:', event.target.error);
  };

  request.onsuccess = (event) => {
  };
};


export { openDB, closeDB, addImage, getImage, updateImage, deleteImage  };