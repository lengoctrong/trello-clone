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
  const conditions = [
    { limit: 15, text: 'vừa xong' },
    { limit: 30, text: '15 giây trước' },
    { limit: 45, text: '30 giây trước' },
    { limit: 60, text: '45 giây trước' },
    { limit: 3600, text: () => `${Math.floor(secondsAgo / 60)} phút trước` },
    { limit: 86400, text: () => `${Math.floor(secondsAgo / 3600)} giờ trước` },
    { limit: 86400 * 2, text: 'hôm qua' },
    {
      limit: Infinity,
      text: () => `${Math.floor(secondsAgo / 86400)} ngày trước`
    }
  ]

  for (let condition of conditions) {
    if (secondsAgo < condition.limit) {
      return typeof condition.text === 'function'
        ? condition.text()
        : condition.text
    }
  }
}
