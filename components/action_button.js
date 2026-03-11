import { Image, StyleSheet, Text, TouchableOpacity, View ,icon , style , text} from "react-native";
import React from "react";
import { useColors } from "../constants/colors";

export default function ActionButton({
  icon,
  text,
  style = {},
  onPress = () => {},
}) {
  const colors = useColors(); 
  return (
    <View style={[styles.wrapper, style]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={{alignItems:'center'}}>
        <View style={[styles.button, { backgroundColor: colors.amitBlue }]}>
          <Image source={icon} style={{ width: 48, height: 48 }} />
        </View>
        <Text style={{ color: colors.textColor }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    borderRadius: 15,
    padding: 20,
    flexGrow: 0,
  },

});
