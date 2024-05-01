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
