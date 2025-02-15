import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 30
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        fontSize: 25
    },
    subTugasContainer: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputSubTugas: {
        flex: 1,
        padding: 10,
    },
    addButton: {
        marginLeft: 5,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    button: {
        width: '100%',
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    subTugasItem: {
        flexDirection: 'row',
        marginBottom: 10,
        width: '100%',
        marginTop: 15
    },
    subTugasText: {
        marginLeft: 10,
        fontSize: 16,
        flex: 1
    },
});
export default styles;