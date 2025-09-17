import {
  collection,
  query,
  getDocs,
  orderBy,
  where,
  QuerySnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./firebaseConnection";

export interface CarImagesProps {
  name: string;
  uid: string;
  url: string;
}

export interface CarProps {
  id: string;
  name: string;
  model: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  whatsapp: string;
  description: string;
  images: CarImagesProps[];
  created: string;
  owner: string;
}

// Utility: Firestore snapshot → CarProps[]
function mapDocsToCars(snapshot: QuerySnapshot<DocumentData>): CarProps[] {
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name as string,
      model: data.model as string,
      year: data.year as string,
      price: data.price as string | number,
      km: data.km as string,
      city: data.city as string,
      whatsapp: data.whatsapp as string,
      description: data.description as string,
      images: data.images as CarImagesProps[],
      uid: data.uid as string,
      created: data.created as string,
      owner: data.owner as string,
    };
  });
}

// Fetch all cars (ordered by created)
export async function fetchAllCars(): Promise<CarProps[]> {
  const carsRef = collection(db, "cars");
  const queryRef = query(carsRef, orderBy("created", "desc"));
  const snapshot = await getDocs(queryRef);
  return mapDocsToCars(snapshot);
}

// Fetch cars by name (prefix search)
export async function fetchCarsByName(name: string): Promise<CarProps[]> {
  const carsRef = collection(db, "cars");
  const term = name.toUpperCase();
  const queryRef = query(
    carsRef,
    where("name", ">=", term),
    where("name", "<=", term + "\uf8ff")
  );
  const snapshot = await getDocs(queryRef);
  return mapDocsToCars(snapshot);
}
