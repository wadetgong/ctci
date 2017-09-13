const { expect } = require('chai')
const {
  isUnique,
  checkPermutation,
  urlify,
  palindromePermutation,
  oneAway,
} = require('./problems')

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
