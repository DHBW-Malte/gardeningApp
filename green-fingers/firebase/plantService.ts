// firebase/plantService.ts

import { db } from "./firebaseConfig";
import { collection, addDoc, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { AddGarden, Plant } from "../types/models";
import { AddUserPlant } from "../types/models";

// Define the `plants` collection
const plantsCollection = collection(db, "plant-catalog");
const userPlantsCollection = collection(db, "user-plants");
const gardenCollection = collection(db, "gardens")

// Add a new plant species
export const addPlant = async (plantData: AddUserPlant): Promise<string | undefined> => {
  try {
    const docRef = await addDoc(userPlantsCollection, plantData);
    console.log("Plant added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding plant: ", error);
  }
};

// Update User Plant
export const updateUserPlant = async (plantId: string, updatedData: Partial<AddUserPlant>): Promise<void> => {
  try {
    const docRef = doc(db, "user-plants", plantId);
    await updateDoc(docRef, updatedData);
    console.log("Plant updated");
  } catch (error) {
    console.error("Error updating plant: ", error);
  }
};

export const addGarden = async (gardenData: AddGarden): Promise<string | undefined> => {
  try {
    const docRef= await addDoc(gardenCollection, gardenData);
    console.log("Garden add with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding plant: ", error);
  }
}

// Update Garden
export const updateGarden = async (gardenId: string, updatedData: Partial<AddGarden>): Promise<void> => {
  try {
    const docRef = doc(db, "gardens", gardenId);
    await updateDoc(docRef, updatedData);
    console.log("Garden updated");
  } catch (error) {
    console.error("Error updating garden: ", error);
  }
}


// Retrieve a plant species by ID
export const getPlant = async (plantId: string): Promise<Plant | undefined> => {
  try {
    const docRef = doc(db, "plant-catalog", plantId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Plant;
    } else {
      console.log("No such plant document!");
    }
  } catch (error) {
    console.error("Error fetching plant: ", error);
  }
};

// Update plant information
export const updatePlant = async (plantId: string, updatedData: Partial<Plant>): Promise<void> => {
  try {
    const docRef = doc(db, "plant-catalog", plantId);
    await updateDoc(docRef, updatedData);
    console.log("Plant updated");
  } catch (error) {
    console.error("Error updating plant: ", error);
  }
};

// Delete a plant species
export const deleteCatalogPlant = async (plantId: string): Promise<void> => {
  try {
    const docRef = doc(db, "plant-catalog", plantId);
    await deleteDoc(docRef);
    console.log("Plant deleted");
  } catch (error) {
    console.error("Error deleting plant: ", error);
  }
};

// Delete a user plant
export const deletePlant = async (plantId: string): Promise<void> => {
  try {
    const docRef = doc(db, "user-plants", plantId);
    await deleteDoc(docRef);
    console.log("Plant deleted");
  } catch (error) {
    console.error("Error deleting plant: ", error);
  }
}

// Delete a garden
export const deleteGarden = async (gardenId: string): Promise<void> => {
  try {
    const docRef = doc(db, "gardens", gardenId);
    await deleteDoc(docRef);
    console.log("Garden deleted");
  } catch (error) {
    console.error("Error deleting garden: ", error);
  }
}