import { Dimensions, StyleSheet } from 'react-native'

const windowWidth = Dimensions.get('window').width

export const theme = {}

export const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 10,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#323B76',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
    marginBottom: 5,
    width: windowWidth / 1.089,
    alignSelf: 'center',
  },
  lowerButtonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  lowerButtonClear: {
    borderWidth: 0.5,
    borderColor: '#323B76',
    borderBottomLeftRadius: 10,
    padding: 8,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 5,
    width: windowWidth / 2.25,
  },
  lowerButtonApply: {
    borderWidth: 0.5,
    borderColor: '#323B76',
    borderBottomRightRadius: 10,
    padding: 8,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 5,
    width: windowWidth / 2.25,
  },
  refreshButton: {
    borderWidth: 1,
    borderColor: '#323B76',
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    padding: 8,
    // marginBottom: 8,
    alignSelf: 'center',
    width: windowWidth / 1.089,
  },
  buttonTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'whitesmoke',
  },
  checkBoxContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkBox: {
    backgroundColor: '#FFF',
    width: windowWidth / 2.75,
    borderWidth: 1,
    borderColor: '#323B76',
    borderRadius: 5,
    paddingLeft: 9,
    paddingTop: 7,
    padding: 5,
    margin: 3,
  },
  checkBoxText: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
})
