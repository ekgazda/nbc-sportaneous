import { StyleSheet, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 10,
    marginTop: 10,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-between',
    borderColor: '#DADBDF',
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    width: windowWidth / 3,
    textAlign: 'left',
    paddingBottom: 5,
  },
  location: {
    textAlign: 'left',
    fontSize: 17,
    textTransform: 'capitalize',
    width: windowWidth / 3,
  },
  date: {
    textAlign: 'right',
    fontSize: 17,
    textTransform: 'capitalize',
    width: windowWidth / 2,
  },
  time: { textAlign: 'right', fontSize: 17, width: windowWidth / 2 },
  user: { textAlign: 'right', fontSize: 17, width: windowWidth / 3 },
  description: {
    fontSize: 15,
    width: windowWidth / 1.5,
    flexWrap: 'wrap',
    textAlign: 'left',
  },
  category: {
    textAlign: 'left',
    fontSize: 16,
    textTransform: 'capitalize',
    width: windowWidth / 3,
  },
})

export default styles
