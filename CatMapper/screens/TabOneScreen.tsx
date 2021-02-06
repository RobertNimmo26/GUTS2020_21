import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as Location from 'expo-location';

import EditScreenInfo from '../components/EditScreenInfo';
import MapComponent from '../components/MapComponent';
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';


export default function TabOneScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location){
    text = latitude + " " + longitude;
  }


  return (
    <View style={styles.container}>
      <MapComponent/>
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <Text style={styles.title}>
        Coords are: {text}{"\n"}
       
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
