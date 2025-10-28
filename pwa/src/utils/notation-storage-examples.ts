/**
 * Usage Examples for Notation Storage API
 *
 * This file demonstrates how to use the notation storage API in your application.
 */

import { notationStorage, type SavedNotation } from "./notation-storage.js";

// Example usage functions

/**
 * Save a new notation
 */
async function saveExampleNotation() {
  try {
    const notation: SavedNotation = {
      name: "Sample V-Sharp Angle",
      notation: "mm=>15dps-2h,0.25w@3h,0.5w@5cp",
      lastModified: new Date(),
    };

    const id = await notationStorage.saveNotation(notation);
    console.log(`Notation saved with ID: ${id}`);
  } catch (error) {
    console.error("Failed to save notation:", error);
  }
}

/**
 * Load all saved notations
 */
async function loadAllNotations() {
  try {
    const notations = await notationStorage.getAllNotations();
    console.log("All saved notations:", notations);
    return notations;
  } catch (error) {
    console.error("Failed to load notations:", error);
    return [];
  }
}

/**
 * Search for notations by name
 */
async function searchNotations(searchTerm: string) {
  try {
    const results = await notationStorage.searchNotations(searchTerm);
    console.log(`Search results for "${searchTerm}":`, results);
    return results;
  } catch (error) {
    console.error("Failed to search notations:", error);
    return [];
  }
}

/**
 * Get storage statistics
 */
async function getStorageInfo() {
  try {
    const stats = await notationStorage.getStorageStats();
    console.log("Storage statistics:", stats);
    console.log(
      `Storage: ${stats.count} notations, ~${Math.round(
        stats.totalSize / 1024
      )}KB`
    );
    return stats;
  } catch (error) {
    console.error("Failed to get storage stats:", error);
    return null;
  }
}

/**
 * Export all notations for backup
 */
async function exportNotations() {
  try {
    const exportData = await notationStorage.exportNotations();
    console.log("Export data:", exportData);

    // You could save this to a file or copy to clipboard
    // For web apps, you might create a download link:
    const blob = new Blob([exportData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vsa-notations-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    return exportData;
  } catch (error) {
    console.error("Failed to export notations:", error);
    return null;
  }
}

/**
 * Import notations from backup
 */
async function importNotations(jsonData: string) {
  try {
    const count = await notationStorage.importNotations(jsonData);
    console.log(`Successfully imported ${count} notations`);
    return count;
  } catch (error) {
    console.error("Failed to import notations:", error);
    return 0;
  }
}

/**
 * Delete a specific notation
 */
async function deleteNotation(id: number) {
  try {
    await notationStorage.deleteNotation(id);
    console.log(`Notation ${id} deleted successfully`);
  } catch (error) {
    console.error("Failed to delete notation:", error);
  }
}

// Example batch operations

/**
 * Save multiple example notations for testing
 */
async function seedExampleNotations() {
  const examples: Omit<SavedNotation, "id">[] = [
    {
      name: "Basic V-Sharp 15°",
      notation: "mm=>15dps-2h,0.25w@3h",
      lastModified: new Date(),
    },
    {
      name: "Complex Profile",
      notation: "mm=>12dps-1.5h,0.3w@2.5h,0.45w@4cp,0.6w@6acp",
      lastModified: new Date(),
    },
    {
      name: "Imperial Measurements",
      notation: "in=>10dps-0.08h,0.01w@0.12h,0.018w@0.2cp",
      lastModified: new Date(),
    },
  ];

  for (const example of examples) {
    try {
      await notationStorage.saveNotation(example);
      console.log(`Saved example: ${example.name}`);
    } catch (error) {
      console.error(`Failed to save ${example.name}:`, error);
    }
  }
}

// Export functions for use in other modules
export {
  saveExampleNotation,
  loadAllNotations,
  searchNotations,
  getStorageInfo,
  exportNotations,
  importNotations,
  deleteNotation,
  seedExampleNotations,
};

// Example of how to use in a component:
/*
import { notationStorage } from './utils/notation-storage.js';

class MyComponent {
  async handleSaveNotation() {
    const notation = {
      name: "My Custom Profile",
      notation: this.buildCurrentNotation(),
      lastModified: new Date()
    };
    
    try {
      const id = await notationStorage.saveNotation(notation);
      this.showSuccessMessage(`Notation saved with ID: ${id}`);
    } catch (error) {
      this.showErrorMessage('Failed to save notation');
    }
  }
  
  async handleLoadNotations() {
    try {
      this.savedNotations = await notationStorage.getAllNotations();
    } catch (error) {
      this.showErrorMessage('Failed to load saved notations');
    }
  }
}
*/
