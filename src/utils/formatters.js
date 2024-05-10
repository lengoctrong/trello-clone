export const retrieveSpecificAttr = (obj, key) => {
  let titles = []
  for (let i in obj) {
    if (typeof obj[i] === 'object') {
      titles = titles.concat(retrieveSpecificAttr(obj[i], key))
    } else if (i === key) {
      titles.push(obj[i])
    }
  }
  return titles
}

export const mapOrderedArr = (originArr, orderArr, key) => {
  if (!Array.isArray(originArr)) originArr = []

  const clonedArr = [...originArr]
  return clonedArr.sort(
    (a, b) => orderArr.indexOf(a[key]) - orderArr.indexOf(b[key])
  )
}

export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    columnId: `${column._id}`,
    boardId: `${column.boardId}`,
    fe_placeholderCard: true
  }
}

export const timeAgo = (timestamp) => {
  const secondsAgo = Math.floor((new Date() - timestamp) / 1000)

  if (secondsAgo < 60) {
    return 'vài giây trước'
  } else if (secondsAgo < 3600) {
    return `${Math.floor(secondsAgo / 60)} phút trước`
  } else if (secondsAgo < 86400) {
    return `${Math.floor(secondsAgo / 3600)} giờ trước`
  } else {
    return 'hôm qua'
  }
}
