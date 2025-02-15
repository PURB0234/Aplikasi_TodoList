import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    width: '100%',
    padding: 10,
    height: '100%'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderRadius: 90,
    padding: 15,
    backgroundColor: 'rgb(232, 232, 232)',
    marginTop: 20,
    fontSize: 15.5,
    fontWeight: '600',
    flexDirection: 'row'
  },
  searchButton: {
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 5,
    marginTop: 20
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 3,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 0.1,
    borderWidth: 0.4,
    borderColor: 'gray',
    maxWidth: '48%',
    margin: 3,
    flex: 1
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 10,
    color: 'gray',
  },
  noResultText: {
    textAlign: 'center',
    marginVertical: 10,
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    maxHeight: '70%'
  },
  modalContentTanggal: {
    backgroundColor: '#fff',
    padding: 5,
    width: '90%',
    maxHeight: '30%',
    maxWidth: '50%',
    height: 700,
    borderRadius: 25
  },
  modalConatinerTanggal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 18.5,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    flex: 1
  },
  modalSubTitle: {
    fontSize: 15.5,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTugasItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  subTugasText: {
    fontSize: 14,
    flexDirection: 'row'
  },
  closeButton: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20
  },
  tutupText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  hapus: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  floatingButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginEnd: 6
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
  },
  subTugasList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    padding: 10
  },
  subTeskText: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1
  },
  buttonTime: {
    backgroundColor: 'rgba(62, 122, 132, 0.5)',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonSwitch: {
    justifyContent: 'center',
    marginTop: 20,
    padding: 5,
    marginEnd: 10
  },
  v1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  v2: {
    backgroundColor: '#fff',
    width :'100%',
    height:'100%'
  },
  v3: {
    padding: 20,
    flexDirection: 'column'
  },
  v4: {
    width: '100%',
    flexDirection: 'row'
  },
  v5: {
    flexDirection: 'column',
    marginStart: 10
  },
  buttonLogout: {
    marginRight: 20,
    marginLeft: 20,
    alignItems: 'flex-end',
    padding: 5
  },
  v6: {
    height: 1,
    borderWidth: 0,
    marginVertical: 1,
    borderColor: '#ccc',
    backgroundColor: 'black',
    marginTop: 5
  },
  buttonPriority: {
    width: 25,
    height: 25,
    borderRadius: 12.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 10,
    marginEnd: 10
  },
  buttonEdit: {
    width: 25,
    height: 25,
    borderRadius: 12.1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
    
export default styles;
