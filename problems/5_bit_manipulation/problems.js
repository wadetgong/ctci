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
const flipBitToWin = binaryNum => {

}

module.exports = {
  insertion,
  binaryToString,
  flipBitToWin,
}
