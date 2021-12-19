import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  view: {
    backgroundColor: '#FFF',
    flex: 1,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 25,
    marginTop: 10,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: '#DADBDF',
  },
  text: {
    fontSize: 18,
    margin: 5,
  },
  touchOpacity: {
    marginBottom: 10,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#323B76',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#323B76',
    padding: 8,
    alignSelf: 'center',
  },
  touchOpacityText: {
    padding: 4,
    fontSize: 18,
    textAlign: 'center',
    color: 'whitesmoke',
  },
})
