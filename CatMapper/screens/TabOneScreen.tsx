import * as React from "react";
import { Button, StyleSheet } from "react-native";
import * as Location from "expo-location";

import EditScreenInfo from "../components/EditScreenInfo";
import MapComponent from "../components/MapComponent";

import { Text, View } from "../components/Themed";

import { addCoords, getCoords } from "../api/database";
import { useEffect, useState } from "react";

export default function TabOneScreen() {
  const [location, setLocation] = useState(Object);
  const [errorMsg, setErrorMsg] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    (async () => {
      fetchLocation();
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
      <MapComponent latitude={latitude} longitude={longitude} />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <Button
        title={"Press me"}
        color="#841584"
        onPress={() => {
          fetchLocation();
          addCoords("hello", { latitude }, { longitude }, "test");
        }}
      />
      <Button title={"Press me2"} color="#841584" onPress={() => getCoords()} />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <Text style={styles.title}>
        Coords are: {text}
        {"\n"}
      </Text>
    </View>
  );

  async function fetchLocation() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);

    return true;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
