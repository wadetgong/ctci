const printBinary = (base10) => {
  return parseInt(base10.toString(2))
}

// 5.1 insertion
const insertion = (N, M, i, j) => {
  let NbinVal = parseInt(N.toString(), 2)
  let MbinVal = parseInt(M.toString(), 2)

  //Replace the relevant bit locations in N with 0's
  let nClear = ~((1 << (j + 1)) - 1) + ((1 << i) - 1)
  let clearedN = NbinVal & nClear

  //Add necessary count of 0's to M
  let shiftedM = MbinVal << i

  //Combine clearedN with shiftedM via OR operation
  return printBinary(clearedN | shiftedM)
}

// 5.2 binaryToString
const binaryToString = float => {
  let binaryString = '0.'
  for (let i = 0; i < 32; i++) {
    float *= 2
    if (float >= 1) {
      binaryString += '1'
      float -= 1
    } else {
      binaryString += '0'
    }
    if (!float) {
      return binaryString
    }
  }
  throw new TypeError('Float does not have a valid binary representation.')
}

// 5.3 flipBitToWin
const findBestPair = arr => {
  if (arr.length === 0) return 0
  if (arr.length === 1) return arr[0]

  let max = arr[0] + arr[1] + 1
  let pairVal
  for (let i = 1; i < arr.length - 1; i++) {
    pairVal = arr[i] + arr[i + 1] + 1
    if (pairVal > max) max = pairVal
  }

  return max
}

const flipBitToWin = binaryNum => {
  let binVal = parseInt(binaryNum.toString(), 2)

  let currentBit = 1 & binVal
  let currentCount = 1
  let oneStreak = []

  let bit
  for (let i = 1; i < 32; i++) {
    bit = ((1 << i) & binVal) > 0 ? 1 : 0
    if (bit !== currentBit) {
      if (currentBit) {
        oneStreak.push(currentCount)
      }
      currentCount = 1
      currentBit = bit
    } else {
      currentCount++
    }
  }
  return findBestPair(oneStreak)
}

module.exports = {
  insertion,
  binaryToString,
  flipBitToWin,
}
