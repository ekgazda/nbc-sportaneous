import { StyleSheet, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width

export const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center',
    borderColor: '#DADBDF',
    borderWidth: 1,
    width: windowWidth / 1.05
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
    paddingBottom: 5,
  },
  name: {
    textAlign: 'center',
    fontSize: 20,
    padding: 20,
    width: windowWidth / 1,
    textTransform: 'capitalize',
  },
  navigate: {
    marginBottom: 10,
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: 'silver',
    padding: 8,
    alignSelf: 'center',
  },
  accept: {
    marginBottom: 10,
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: '#323B76',
    padding: 8,
    color: '#fff',
    alignSelf: 'center',
  },
  reject: {
    marginBottom: 10,
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: '#6C5DAB',
    padding: 8,
    color: '#fff',
    alignSelf: 'center',
  },
  buttonsText: {
    textAlign: 'center',
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 17,
    textTransform: 'uppercase',
  },
  backButton: {
    padding: 8,
    backgroundColor: 'black',
    borderRadius: 2,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
backButtonText: {
    textAlign: 'center',
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: "uppercase"
  } 
})
