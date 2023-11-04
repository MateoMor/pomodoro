import { TouchableOpacity, Text, StyleSheet } from "react-native";


// This component is not implemented in the app
function AlarmButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={{ color: "#333333", fontWeight: "bold" }}>
            Hello
          </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#87CEEB",
    alignItems: "center",
    width: "100%",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
});

export default AlarmButton;
