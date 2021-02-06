import * as firebase from "firebase";
import "firebase/firestore";
import { db } from "../config/keys";

export const addCoords = (name: any, latitude: any, longitude: any, description: any) => {
  db.ref("/cats").push({
    name: name,
    latitude: latitude,
    longitude: longitude,
    description: description,
    createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
  });
};

// export const getCoords = () => {
//   db.ref("/cats").once({
//     name: name,
//     log: log,
//     lat: lat,
//     description: description,
//     createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
//   });
// };
