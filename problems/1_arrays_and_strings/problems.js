// 1.1 isUnique
const isUnique = string => {
  const hash = {}
  for (let i = 0; i < string.length; i++) {
    let char = string[i]
    if (hash[char]) return false
    hash[char] = true
  }
  return true
}


// 1.2 checkPermutation
const getCharHash = str => {
  const strHash = {}
  for (let i = 0; i < str.length; i++) {
    let char = str[i]
    if (char in strHash) strHash[char] += 1
    else strHash[char] = 1
  }
  return strHash
}

const subSetCheck = (subStringHash, mainStringHash) => {
  for (let key in subStringHash) {
    if (mainStringHash.hasOwnProperty(key)) {
      if (subStringHash[key] !== mainStringHash[key]) {
        return false
      }
    } else {
      return false
    }
  }
  return true
}

const checkPermutation = (str1, str2) => {
  const str1Hash = getCharHash(str1)
  const str2Hash = getCharHash(str2)
  return subSetCheck(str1Hash, str2Hash)
}

// 1.3 urlify
const urlify = str => str.replace(/\s/g, '%20')

// 1.4 palindromePermutation
const palindromePermutation = str => {
  const strHash = getCharHash(str.replace(/ /g, ''))
  let oddCount = 0
  for (let char in strHash) {
    if (strHash[char] % 2 === 1) {
      oddCount++
      if (oddCount > 1) return false
    }
  }
  return true
}

// 1.5 oneAway
const charsIn = (str1, str2) => {
  if (str2.length - str1.length > 1) return false
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      return str1.slice(i) === str2.slice(i + 1)
    }
  }
  return true
}

const oneAway = (startStr, endStr) => {
  let startStrLen = startStr.length
  let endStrLen = endStr.length
  if (startStrLen === endStrLen) {
    let diffs = 0
    for (let i = 0; i < startStrLen; i++) {
      if (startStr[i] !== endStr[i]) diffs++
      if (diffs > 1) return false
    }
    return true
  }
  if (startStrLen > endStrLen) return charsIn(endStr, startStr)
  return charsIn(startStr, endStr)
}

// 1.6 stringCompress
const stringCompress = str => {
  let tempStr = str
  let currentChar = tempStr[0]
  let currentCount = 0
  let compressed = ''
  while (tempStr.length) {
    if (tempStr[0] === currentChar) {
      currentCount++
    } else {
      compressed += `${currentChar}${currentCount}`
      currentChar = tempStr[0]
      currentCount = 1
    }
    tempStr = tempStr.slice(1)
  }
  compressed += `${currentChar}${currentCount}`

  if (compressed.length < str.length) return compressed
  return str
}

// 1.7 rotateMatrix
const initMatrix = n => {
  let newMatrix = []
  for (let i = 0; i < n; i++) {
    newMatrix.push([])
  }
  return newMatrix
}

const rotateMatrix = matrix => {
  let rowCount = matrix.length
  let colCount = matrix[0].length
  if (rowCount !== colCount) {
    throw new Error('Not an n x n matrix.')
  }

  let newMatrix = initMatrix(rowCount)

  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      newMatrix[j][colCount - i - 1] = matrix[i][j]
    }
  }
  return newMatrix
}

// 1.8 zeroMatrix
const zeroMatrix = matrix => {
  let rowCount = matrix.length
  let colCount = matrix[0].length
  if (rowCount !== colCount) {
    throw new Error('Not an n x n matrix.')
  }

  let zeroRows = {}
  let zeroCols = {}
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      if (matrix[i][j] === 0) {
        zeroRows[i] = true
        zeroCols[j] = true
      }
    }
  }

  let newMatrix = initMatrix(rowCount)
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      if (zeroRows[i] || zeroCols[j]) newMatrix[i][j] = 0
      else newMatrix[i][j] = matrix[i][j]
    }
  }
  return newMatrix
}

// 1.9 stringRotation - isSubstring
const isSubstring = (str1, str2) => {
  if (str1.length !== str2.length) return false
  const rotString = str2 + str2
  for (let i = 0; i < rotString.length - str1.length; i++) {
    for (let j = 0; j < str1.length; j++) {
      if (rotString[i + j] !== str1[j]) break
      if (j === str1.length - 1) return true
    }
  }
  return false
}

module.exports = {
  isUnique,
  checkPermutation,
  urlify,
  palindromePermutation,
  oneAway,
  stringCompress,
  rotateMatrix,
  zeroMatrix,
  isSubstring,
}

