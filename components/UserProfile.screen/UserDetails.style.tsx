import { StyleSheet, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginBottom: 60,
  },
  avatar: {
    borderRadius: 100,
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginVertical: 15,
  },
  detailsContainer: {
    width: windowWidth / 1.05,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  detailsField: {
    borderBottomWidth: 1,
    borderColor: '#DADBDF',
    marginTop: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    textAlign: 'left',
    width: windowWidth / 3,
    fontSize: 17,
  },
  detailsValue: {
    borderBottomWidth: 1,
    borderColor: '#DADBDF',
    marginTop: 10,
    paddingBottom: 5,
    paddingRight: 10,
    textAlign: 'right',
    width: windowWidth / 3,
    fontSize: 15,
  },

  editButton: {
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#DADBDF',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 5,
    width: windowWidth / 1.8,
    alignSelf: 'center',
  },
  buttonTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'whitesmoke',
  },
})
