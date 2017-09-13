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

module.exports = {
  isUnique,
  checkPermutation,
  urlify,
  palindromePermutation,
  oneAway,
}
