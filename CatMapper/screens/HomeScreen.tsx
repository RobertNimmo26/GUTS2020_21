import * as React from "react";
import { StyleSheet } from "react-native";
import * as Location from "expo-location";

import { Button } from "react-native-paper";

import MapComponent from "../components/MapComponent";
import AddCat from "../components/AddCat";
import ClosestCat from "../components/ClosestCat";

import { Text } from "../components/Themed";
import { View } from "react-native";

import { GetNearestCat, getCoords, GetCat } from "../api/database";
import { useEffect, useState } from "react";

const LOCATION_SETTINGS = {
  accuracy: Location.Accuracy.Balanced,
  timeInterval: 200,
  distanceInterval: 0,
};

export default function HomeScreen() {
  const [location, setLocation] = useState(Object);
  const [errorMsg, setErrorMsg] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [nearestCatDes, setNearestCatdes] = useState("");
  const [nearestCatLoc, setNearestCatLoc] = useState("");
  const [catLatitude, setCatLatitude] = useState(0);
  const [catLongitude, setCatLongitude] = useState(0);

  useEffect(() => {
    (async () => {
      fetchLocation();
      fetchCatLocations();
    })();
  }, []);

  let text = <Text>Waiting...</Text>;
  if (errorMsg != "") {
    text = <Text>Error</Text>;
  } else if (location) {
    text = (
      <Text>
        {latitude} {longitude}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <MapComponent latitude={latitude} longitude={longitude} />
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.separator} />
        <Text style={styles.title}>Are there any cats here?</Text>
        <AddCat latitude={latitude} longitude={longitude}></AddCat>
        <ClosestCat
          Description={nearestCatDes}
          Location={nearestCatLoc}
          catLatitude={catLatitude}
          catLongitude={catLongitude}
        ></ClosestCat>
        {/* <Button
          mode="contained"
          onPress={() => {
            fetchLocation();
            fetchNearestCatLocation(latitude, longitude);
          }}
          theme={{ roundness: 40 }}
          style={{
            width: 300,
            margin: 5,
            alignSelf: "center",
          }}
        >
          Nearest Cat
        </Button> */}
        <Text style={styles.normal}>
          Coords are: {text}
          {"\n"}
        </Text>
      </View>
    </View>
  );

  async function fetchLocation() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    await Location.watchPositionAsync(LOCATION_SETTINGS, (Location) => {
      let coords = Location.coords;
      setLocation(location);
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);

      fetchNearestCatLocation(latitude, longitude);
    });

    return true;
  }

  async function fetchCatLocations() {
    let locs = await getCoords();
  }

  async function fetchNearestCatLocation(latitude: number, longitude: number) {
    let loc = await GetNearestCat(latitude, longitude);
    loc.sort((a, b) =>
      a.distance > b.distance
        ? 1
        : a.distance === b.distance
        ? a.distance > b.distance
          ? 1
          : -1
        : -1
    );
    // console.log(loc[0]);

    const closestCatObject: object = await GetCat(loc[0].catId);
    // console.log(closestCatObject);
    setNearestCatdes(closestCatObject.description);
    setNearestCatLoc(closestCatObject.location);
    setCatLatitude(closestCatObject.latitude);
    setCatLongitude(closestCatObject.longitude);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  normal: {
    fontSize: 15,
    textAlign: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
