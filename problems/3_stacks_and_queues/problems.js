// 3.1 threeInOne
class threeInOne {
  constructor() {
    this.array = []
    this.length1 = 0
    this.length2 = 0
    this.length3 = 0
    this.headLoc1 = 0
    this.headLoc2 = 1
    this.headLoc3 = 2
  }

  push1(value) {
    this.array[this.headLoc1 + 3 * this.length1] = value
    this.length1++
  }
  push2(value) {
    this.array[this.headLoc2 + 3 * this.length2] = value
    this.length2++
  }
  push3(value) {
    this.array[this.headLoc3 + 3 * this.length3] = value
    this.length3++
  }

  pop1() {
    if (!this.length1) return null
    let value = this.array[this.headLoc1]
    this.headLoc1 += 3
    this.length1--
    return value
  }
  pop2() {
    if (!this.length2) return null
    let value = this.array[this.headLoc2]
    this.headLoc2 += 3
    this.length2--
    return value
  }
  pop3() {
    if (!this.length3) return null
    let value = this.array[this.headLoc3]
    this.headLoc3 += 3
    this.length3--
    return value
  }
}

module.exports = {
  threeInOne
}
