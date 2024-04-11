export const mapOrderedArr = (originArr, orderArr, key) => {
  const clonedArr = [...originArr]
  return clonedArr.sort(
    (a, b) => orderArr.indexOf(a[key]) - orderArr.indexOf(b[key])
  )
}
