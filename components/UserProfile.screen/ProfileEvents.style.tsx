import { StyleSheet, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width

export const styles = StyleSheet.create({
  eventHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 5,
    paddingTop: 5,
    paddingLeft: 35,
    paddingRight: 35,
    borderTopWidth: 2,
  },
  joinSubHeader: {
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingLeft: 15,
    textDecorationLine: 'underline',
  },

  container: {
    flex: 1,
    marginVertical: 5,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 10,
    marginTop: 10,
    marginHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-between',
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: '#DADBDF',
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
  time: { textAlign: 'right', fontSize: 18, width: windowWidth / 2 },
  user: { textAlign: 'right', fontSize: 18, width: windowWidth / 3 },
  description: {
    fontSize: 15,
    width: windowWidth,
    marginTop: 5,
    marginLeft: 15,
  },
  category: {
    textAlign: 'left',
    fontSize: 16,
    textTransform: 'capitalize',
    width: windowWidth / 3,
  },

  requestsButton: {
    borderWidth: 2,
    borderColor: '#DADBDF',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 5,
    width: windowWidth / 1.085,
    alignSelf: 'center',
  },
  deleteButton: {
    borderWidth: 2,
    borderColor: '#DADBDF',
    borderRadius: 8,
    padding: 5,
    marginTop: 5,
    width: windowWidth / 1.085,
    alignSelf: 'center',
  },
  buttonTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'whitesmoke',
  },
})
