import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({ setTime, currentTime, setCurrentTime, setIsActive }) {
  const handlePress = (index) => {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15; // El indice de la opción del arreglo options

    setCurrentTime(index); // Se pone la opción de current time correspondiente
    setIsActive(false);
    setTime(newTime * 60); // Asigna una nueva cantidad de minutos
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {options.map(
        (
          item,
          index // Iteramos a través de los elementos de options, index resive el indice del elemento y es definido como el id del elemento en key
        ) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)}
            style={[
              styles.itemStyle,
              currentTime !== index && { borderColor: "transparent" },
            ]} // Se verifica si el la opción almacenada en current time es la misma del elemento sobre el que se itera, si no es así que el color del borde sea transparente
          >
            <Text style={{fontWeight: "bold"}}>{item}</Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    alignItems: "center",
    width: "33.33%",
    borderWidth: 3,
    padding: 5,
    borderColor: "white",
    borderRadius: 10,
    marginVertical: 20,
  },
});
