import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#f8f9fa' 
    },
    card: { 
      width: '90%', 
      backgroundColor: '#fff', 
      padding: 20, 
      borderRadius: 10, 
      elevation: 5 
    },
    title: { 
      fontSize: 30, 
      fontWeight: 'bold', 
      marginBottom: 20, 
      textAlign: 'center', 
    },
    vInput: { 
      flexDirection: 'row', 
      borderWidth: 1, 
      borderColor: '#ccc', 
      borderRadius: 5, 
      marginBottom: 10 
    },
    button: { 
      backgroundColor: 'skyblue', 
      padding: 10, 
      borderRadius: 5, 
      alignItems: 'center' 
    },
    buttonText: { 
      color: '#fff', 
      fontWeight: 'bold' 
    },
    switchContainer: { 
      flexDirection: 'row', 
      justifyContent: 'center', 
      marginTop: 10 
    },
    switchText: { 
      color: 'blue', 
      marginLeft: 5 
    },
  });

  export default styles;