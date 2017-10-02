const printBinary = (base10) => {
  return parseInt(base10.toString(2))
}

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

module.exports = {
  insertion,
}
