import { StyleSheet, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#323B76',
    padding: 20,
  },
  header: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#323B76',
    padding: 30,
    textTransform: 'uppercase',
    width: windowWidth / 1,
  },
  item: {
    backgroundColor: '#FFF',
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-between',
    borderColor: '#FFF',
    borderWidth: 1,
    borderBottomColor: '#DADBDF',
    borderTopColor: '#DADBDF',
    borderRadius: 5,
  },
  image: {
    width: 46,
    height: 46,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    width: windowWidth / 1.6,
    textAlign: 'right',
    paddingRight: 20,
    color: 'black',
  },
  date: {
    textAlign: 'right',
    fontSize: 17,
    width: windowWidth / 1.15,
    color: 'grey',
    paddingRight: 20,
    paddingBottom: 3,
  },
  host: {
    textAlign: 'right',
    fontSize: 16,
    width: windowWidth / 1.15,
    color: 'grey',
    paddingRight: 20,
  },
})

export default styles
