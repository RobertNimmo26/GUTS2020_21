import * as firebase from "firebase";
import "firebase/firestore";
import { useState } from "react";
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
        createdAt: firebase.database.ServerValue.TIMESTAMP
    });
};

export const getCats = () => {
    var cats: Object[] = [];

    const ref = db.ref("/cats"); 
    ref.on("value", function(snapshot){
        // Array of Cats
        
        // Array of Coordinates
        
        snapshot.forEach((cat) => {
            // Pushing the Cat object one by one to the array
            cats.push(cat.val());
            // console.log(typeof (cat.val().latitude));
            console.log((cat.val()));
        })
        

    }, function (errorObject: { code: string; }) {
        console.log("The read failed: " + errorObject.code);
    });
    
    return cats;

    // const cats: { [index: string]: never[] } = [];
    // const ref = db.ref("/cats");
    // ref.once("value", (snapshot) => {
    //   snapshot.forEach((snapshotchild) => {
    //     snapshotchild.forEach((data) => {
    //       const obj = {};
    //       Object.keys(cats).forEach((item) => {
    //         obj[cats[item].name] = {
    //           latitude: cats[item].latitude,
    //           longitude: cats[item].longitude,
    //         };
    //       });
    //       console.log(obj);
    //     });
    //   });
    // });
};


export const getCoords = () => {
    // Array of Coordinates
    var coords: number[][] = [[0,0]];

    const ref = db.ref("/cats");
    ref.on("value", function (snapshot) {
        // Array of Cats

        
        snapshot.forEach((cat) => {
            // Pushing the Latitude and Longitude objects pair by pair to the array
            coords.push([cat.val().latitude, cat.val().longitude]);
            //console.log(cat.val().latitude);
        })


    }, function (errorObject: { code: string; }) {
        console.log("The read failed: " + errorObject.code);
    });

    return coords;
    
};

export const GetCoordsObject = () => {
    // Array of Coordinates
    var coords: Object[] = [];

    const ref = db.ref("/cats");
    ref.on("value", function (snapshot) {
        // Array of Cats


        snapshot.forEach((cat) => {
            // Pushing the Latitude and Longitude objects pair by pair to the array
            coords.push({ latitude: cat.val().latitude, longitude: cat.val().longitude, weight: 1 });
            //console.log(cat.val().latitude);
        })


    }, function (errorObject: { code: string; }) {
        console.log("The read failed: " + errorObject.code);
    });

    console.log("DB: c" + coords);
    return coords;

};