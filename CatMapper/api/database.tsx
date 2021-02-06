import * as firebase from "firebase";
import "firebase/firestore";
import { db } from "../config/keys";

export const addCoords = (
  name: any,
  latitude: any,
  longitude: any,
  description: any
) => {
  db.ref("/cats").push({
    name: name,
    latitude: latitude,
    longitude: longitude,
    description: description,
    createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
  });
};

export const getCoords = () => {
  const cats: { [index: string]: never[] } = [];
  const ref = db.ref("/cats");
  ref.once("value", (snapshot) => {
    snapshot.forEach((snapshotchild) => {
      snapshotchild.forEach((data) => {
        const obj = {};
        Object.keys(cats).forEach((item) => {
          obj[cats[item].name] = {
            latitude: cats[item].latitude,
            longitude: cats[item].longitude,
          };
        });
        console.log(obj);
      });
    });
  });
};
