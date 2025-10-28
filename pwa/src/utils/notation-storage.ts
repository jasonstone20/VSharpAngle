/**
 * Notation Storage API
 * Provides persistent storage for VSA notations using IndexedDB
 */

export interface SavedNotation {
  id?: number; // Auto-generated primary key
  name: string;
  notation: string;
  lastModified: Date;
}

export interface NotationStorageStats {
  count: number;
  totalSize: number; // Approximate size in bytes
}

class NotationStorageAPI {
  private dbName = "VSANotationStorage";
  private dbVersion = 1;
  private storeName = "notations";
  private db: IDBDatabase | null = null;

  /**
   * Initialize the IndexedDB database
   */
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        reject(new Error("Failed to open IndexedDB"));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create the notations object store
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, {
            keyPath: "id",
            autoIncrement: true,
          });

          // Create indexes for better querying
          store.createIndex("name", "name", { unique: false });
          store.createIndex("lastModified", "lastModified", { unique: false });
        }
      };
    });
  }

  /**
   * Ensure the database is initialized
   */
  private async ensureDB(): Promise<IDBDatabase> {
    if (!this.db) {
      await this.init();
    }
    if (!this.db) {
      throw new Error("Database not initialized");
    }
    return this.db;
  }

  /**
   * Save a notation (create or update)
   */
  async saveNotation(notation: SavedNotation): Promise<number> {
    const db = await this.ensureDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      // Ensure lastModified is set to current time
      const notationToSave = {
        ...notation,
        lastModified: new Date(),
      };

      const request = store.put(notationToSave);

      request.onsuccess = () => {
        resolve(request.result as number);
      };

      request.onerror = () => {
        reject(new Error("Failed to save notation"));
      };
    });
  }

  /**
   * Get all saved notations, sorted by last modified (newest first)
   */
  async getAllNotations(): Promise<SavedNotation[]> {
    const db = await this.ensureDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const index = store.index("lastModified");

      // Get all records in descending order (newest first)
      const request = index.openCursor(null, "prev");
      const results: SavedNotation[] = [];

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => {
        reject(new Error("Failed to retrieve notations"));
      };
    });
  }

  /**
   * Get a specific notation by ID
   */
  async getNotation(id: number): Promise<SavedNotation | null> {
    const db = await this.ensureDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(new Error("Failed to retrieve notation"));
      };
    });
  }

  /**
   * Delete a notation by ID
   */
  async deleteNotation(id: number): Promise<void> {
    const db = await this.ensureDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error("Failed to delete notation"));
      };
    });
  }

  /**
   * Search notations by name (case-insensitive partial match)
   */
  async searchNotations(searchTerm: string): Promise<SavedNotation[]> {
    const allNotations = await this.getAllNotations();
    const lowerSearchTerm = searchTerm.toLowerCase();

    return allNotations.filter((notation) =>
      notation.name.toLowerCase().includes(lowerSearchTerm)
    );
  }

  /**
   * Get storage statistics
   */
  async getStorageStats(): Promise<NotationStorageStats> {
    const notations = await this.getAllNotations();

    const totalSize = notations.reduce((size, notation) => {
      // Rough estimate of size in bytes
      return (
        size + notation.name.length * 2 + notation.notation.length * 2 + 50
      );
    }, 0);

    return {
      count: notations.length,
      totalSize,
    };
  }

  /**
   * Clear all stored notations (use with caution)
   */
  async clearAll(): Promise<void> {
    const db = await this.ensureDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error("Failed to clear notations"));
      };
    });
  }

  /**
   * Export all notations as JSON (for backup purposes)
   */
  async exportNotations(): Promise<string> {
    const notations = await this.getAllNotations();
    return JSON.stringify(notations, null, 2);
  }

  /**
   * Import notations from JSON (for restore purposes)
   */
  async importNotations(jsonData: string): Promise<number> {
    try {
      const notations: SavedNotation[] = JSON.parse(jsonData);
      let importedCount = 0;

      for (const notation of notations) {
        // Remove ID to avoid conflicts and let auto-increment handle it
        const { id, ...notationWithoutId } = notation;
        await this.saveNotation(notationWithoutId);
        importedCount++;
      }

      return importedCount;
    } catch (error) {
      throw new Error("Invalid JSON data for import");
    }
  }
}

// Create and export a singleton instance
export const notationStorage = new NotationStorageAPI();

// Auto-initialize when the module is imported
notationStorage.init().catch(console.error);
