import * as React from "react";
import { Button, StyleSheet } from "react-native";
import * as Location from "expo-location";

import EditScreenInfo from "../components/EditScreenInfo";
import MapComponent from "../components/MapComponent";

import { Text, View } from "../components/Themed";

import { addCoords } from "../api/database";
import { useEffect, useState } from "react";

export default function TabOneScreen() {
  const [location, setLocation] = useState(Object);
  const [errorMsg, setErrorMsg] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

  let text = <Text>Waiting...</Text>;
  if (errorMsg != "") {
    text = <Text>Error</Text>;
  } else if (location) {
    text = 
    <Text>
      {latitude}   {longitude}
    </Text>;
  }



  return (
    <View style={styles.container}>
      <MapComponent />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <Button
        title={"Floof found"}
        color="#FF0000"
        onPress={() => addCoords("hello", {latitude}, {longitude}, "test")}
      />

      
      <Text style={styles.title}>
        Coords are: {text}
        {"\n"}
      </Text>
    </View>
  );
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
