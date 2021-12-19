export const updateCheckBox = (title: string, setStateFunction) => {
  setStateFunction((prevIsChecked) => {
    const newIsChecked = { ...prevIsChecked }
    newIsChecked[title] = newIsChecked[title] !== true
    return newIsChecked
  })
}

export const resetSelection = (setStateFunction) => {
  setStateFunction((prevIsChecked) => {
    const newIsChecked = { ...prevIsChecked }
    for (const category in newIsChecked) {
      newIsChecked[category] = false
    }
    return newIsChecked
  })
}

export const applyFilter = (refObject, query, setStateFunction) => {
  // to do
  // api call based on the current categoryIsChecked objects's booleans
  const noSelection: boolean = Object.values(refObject).every((value) => {
    return value === false
  })
  if (noSelection) {
    query().then((res: any) => {
      setStateFunction(res)
    })
  } else {
    query().then((res: any) => {
      const filteredEventData: Array<object> = res.filter((event: any) => {
        return refObject[event.category]
      })
      setStateFunction(filteredEventData)
    })
  }
}
