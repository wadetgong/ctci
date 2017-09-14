const { expect } = require('chai')
const {
  isUnique,
  checkPermutation,
  urlify,
  palindromePermutation,
  oneAway,
  stringCompress,
  rotateMatrix,
  zeroMatrix,
  isSubstring,
} = require('./problems')


describe('Chapter 1: Arrays and Strings', () => {
  // 1.1 isUnique
  describe('isUnique', () => {
    it('returns true for an empty string', () => {
      const testString = ''
      expect(isUnique(testString)).to.be.equal(true)
    })

    it('returns true for a string with unique characters', () => {
      const testString = 'asdfghjkl'
      expect(isUnique(testString)).to.be.equal(true)
    })

    it('returns false for a string with non-unique characters', () => {
      const testString = 'asdfghjkla'
      expect(isUnique(testString)).to.be.equal(false)
    })
  })

  // 1.2 checkPermutation
  describe('checkPermutation', () => {
    it('returns true if string1 is a permutation of string2', () => {
      const string1 = 'asdf'
      const string2 = 'fdas'
      expect(checkPermutation(string1, string2)).to.be.equal(true)
    })

    it('accounts for permutations with multiples of the same character (true case)', () => {
      const string1 = 'aaassdf'
      const string2 = 'fasdsaa'
      expect(checkPermutation(string1, string2)).to.be.equal(true)
    })

    it('accounts for permutations with multiples of the same character (false case)', () => {
      const string1 = 'aasdf'
      const string2 = 'asdff'
      expect(checkPermutation(string1, string2)).to.be.equal(false)
    })

    it('returns false if string1 is not a permutation of string2', () => {
      const string1 = 'wade'
      const string2 = 'ctci'
      expect(checkPermutation(string1, string2)).to.be.equal(false)
    })
  })

  // 1.3 urlify
  describe('urlify', () => {
    it('converts spaces to %20 characters in resulting string', () => {
      const string = 'The quick brown fox jumps over the lazy dog'
      expect(urlify(string)).to.be.equal('The%20quick%20brown%20fox%20jumps%20over%20the%20lazy%20dog')
    })
  })

  // 1.4 palindromePermutation
  describe('palindromePermutation', () => {
    it('returns false if a palindrome cannot be made', () => {
      const string = 'pool'
      expect(palindromePermutation(string)).to.be.equal(false)
    })

    it('removes spaces from initial string', () => {
      const string = 'ta co cat'
      expect(palindromePermutation(string)).to.be.equal(true)
    })

    it('returns true if a palindrome can be made, with string permutations included', () => {
      const string = 'caocaot'
      expect(palindromePermutation(string)).to.be.equal(true)
    })

  })

  // 1.5 oneAway
  describe('oneAway', () => {
    it('allows for one removal', () => {
      const str1 = 'pale'
      const str2 = 'ple'
      expect(oneAway(str1, str2)).to.be.equal(true)
    })

    it('allows for one insertion', () => {
      const str1 = 'pale'
      const str2 = 'pales'
      expect(oneAway(str1, str2)).to.be.equal(true)
    })

    it('allows for one substitution', () => {
      const str1 = 'pale'
      const str2 = 'bale'
      expect(oneAway(str1, str2)).to.be.equal(true)
    })

    it('does not allow 2 changes', () => {
      const str1 = 'pale'
      const str2 = 'bake'
      expect(oneAway(str1, str2)).to.be.equal(false)
    })

    it('returns true for unchanged strings', () => {
      const str1 = 'pale'
      const str2 = 'pale'
      expect(oneAway(str1, str2)).to.be.equal(true)
    })
  })

  // 1.6 stringCompress
  describe('stringCompress', () => {
    it('compresses a string correctly', () => {
      const string = 'aabcccccaaa'
      expect(stringCompress(string)).to.be.equal('a2b1c5a3')
    })

    it('returns the original string if the compressed string is longer', () => {
      const string = 'abccdddef'
      expect(stringCompress(string)).to.be.equal('abccdddef')
    })
  })

  // 1.7 rotateMatrix
  describe('rotateMatrix', () => {
    it('rotates a 2 x 2 matrix 90 degrees correctly', () => {
      const matrix = [[1, 2], [3, 4]]
      expect(rotateMatrix(matrix)).to.deep.equal([[3, 1], [4, 2]])
    })

    it('rotates a 3 x 3 matrix 90 degrees correctly', () => {
      const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      expect(rotateMatrix(matrix)).to.deep.equal([
        [7, 4, 1], [8, 5, 2], [9, 6, 3]
      ])
    })

    it('rotates a 4 x 4 matrix 90 degrees correctly', () => {
      const matrix = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
      ]
      expect(rotateMatrix(matrix)).to.deep.equal([
        [13, 9, 5, 1],
        [14, 10, 6, 2],
        [15, 11, 7, 3],
        [16, 12, 8, 4]
      ])
    })
  })

  // 1.8 zeroMatrix
  describe('zeroMatrix', () => {
    it('sets the entire row and column of a matrix to 0 for a given location containing 0 (2 x 2) matrix', () => {
      const matrix = [[1, 2], [0, 3]]
      expect(zeroMatrix(matrix)).to.deep.equal([[0, 2], [0, 0]])
    })

    it('sets the entire row and column of a matrix to 0 for a given location containing 0 (3 x 3) matrix', () => {
      const matrix = [[1, 2, 3], [0, 4, 5], [6, 7, 8]]
      expect(zeroMatrix(matrix)).to.deep.equal([
        [0, 2, 3], [0, 0, 0], [0, 7, 8]
      ])
    })

    it('sets the entire row and column of a matrix to 0 for a given location containing 0 (3 x 3) matrix (2 instances of 0)', () => {
      const matrix = [[1, 2, 0], [0, 4, 5], [6, 7, 8]]
      expect(zeroMatrix(matrix)).to.deep.equal([
        [0, 0, 0], [0, 0, 0], [0, 7, 0]
      ])
    })

    it('leaves matrices with no 0\'s unchanged', () => {
      const matrix = [[1, 2], [3, 4]]
      expect(zeroMatrix(matrix)).to.deep.equal(matrix)
    })
  })

  // 1.9 stringRotation - isSubstring
  describe('stringRotation - isSubstring', () => {
    it('returns true if str1 is a rotation of str2', () => {
      const str1 = 'waterbottle'
      const str2 = 'erbottlewat'
      expect(isSubstring(str1, str2)).to.be.equal(true)
    })

    it('returns false if str1 is not a rotation of str2 (1)', () => {
      const str1 = 'waterbottle'
      const str2 = 'asdfasdfasd'
      expect(isSubstring(str1, str2)).to.be.equal(false)
    })

    it('returns false if str1 is not a rotation of str2 (2)', () => {
      const str1 = 'waterbottle'
      const str2 = 'erbotltewat'
      expect(isSubstring(str1, str2)).to.be.equal(false)
    })

    it('returns true if str1 is equal to str2 initially', () => {
      const str1 = 'waterbottle'
      const str2 = 'waterbottle'
      expect(isSubstring(str1, str2)).to.be.equal(true)
    })
  })
})
