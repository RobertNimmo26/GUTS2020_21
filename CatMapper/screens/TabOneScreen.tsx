import * as React from "react";
import { Alert, Button, StyleSheet } from "react-native";
import * as Location from "expo-location";

import EditScreenInfo from "../components/EditScreenInfo";
import MapComponent from "../components/MapComponent";

import { Text, View } from "../components/Themed";

import { addCoords, getCats, getCoords } from "../api/database";
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
            <MapComponent />
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <EditScreenInfo path="/screens/TabOneScreen.tsx" />
            <Button
                title={"Cat Found (Adds to DB)"}
                color="#FF0000"
                onPress={() => addCoords("hello", latitude, longitude, "test")}
            />
            
            <Button
                title={"Fetch DB entries"}
                color="#841584"
                onPress={() => (
                    fetchCatLocations()
                )}
            />
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

async function fetchCats() {
    let cats = getCats();
    console.log(cats);
}

async function fetchCatLocations(){
    let coords = getCoords();
    console.log(coords);


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
