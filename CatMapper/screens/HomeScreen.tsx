import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as Location from "expo-location";

import { Button as PaperButton } from "react-native-paper";

// import EditScreenInfo from "../components/EditScreenInfo";
import MapComponent from "../components/MapComponent";

import { Text } from "../components/Themed";
import { View } from "react-native";

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
      <View style={{ flex: 3 }}>
        <MapComponent latitude={latitude} longitude={longitude} />
      </View>
      <View style={{ flex: 2 }}>
        {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
        <View style={styles.separator} />
        <Text style={styles.title}>Are there any cats here?</Text>
        <PaperButton
          icon="cat"
          mode="contained"
          onPress={() => {
            fetchLocation();
            addCoords("hello", { latitude }, { longitude }, "test");
          }}
          theme={{ roundness: 40 }}
          style={{
            width: 200,
            margin: 22,
            alignSelf: "center",
          }}
        >
          Found a cat!
        </PaperButton>
        <PaperButton
          mode="contained"
          onPress={() => getCoords()}
          theme={{ roundness: 40 }}
          style={{
            width: 200,
            margin: 5,
            alignSelf: "center",
          }}
        >
          getCoords()...
        </PaperButton>
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
