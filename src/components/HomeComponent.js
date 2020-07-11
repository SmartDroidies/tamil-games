import React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";

const HomeComponent = ({navigation}) => {
  return <View>
    <Text style={styles.text}>My Home Screen - Dynamic Changes </Text>
    <Button
      onPress={() => navigation.navigate('Jumble')}
      title="Jumble" />

  </View>

};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default HomeComponent;
