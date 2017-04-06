function splice(arr, left, right) {

    /**
     * Number of repeated letters to encode
     * @type {number}
     */
    const elemsToSplice = right - left + 1

    if (elemsToSplice === 1) return arr

    /**
     * String representation of number
     * @type {string}
     */
    const strElemsToSplice = elemsToSplice.toString()
    /**
     * Number of elements that will be replaced by number
     * @type {Number}
     */
    const elemsToReplace = strElemsToSplice.length
    /**
     * Number of elements that will be shifted
     * @type {Number}
     */
    const elemsToShift = elemsToSplice - elemsToReplace

    // Replace part of array with correspondent encoding number
    // This step makes the following transformation:
    //
    // Before: AAAAAABBBBBBBBBBC42D9
    //               ^        ^
    //               left     right
    //
    // After:  AAAAAAB10BBBBBBBC42D9
    //               ^        ^
    //               left     right
    for (let i = 1; i <= elemsToReplace; ++i) {

        arr[left + i] = strElemsToSplice[i - 1]

    }

    // Shift right part of the array
    // This step makes the following transformation:
    //
    // Before: AAAAAAB10BBBBBBBC42D9
    //               ^        ^
    //               left     right
    //
    // After:  AAAAAAB10C42D9BBC42D9
    //               ^        ^
    //               left     right
    for (let oldPos = right + 1, newPos = left + elemsToReplace + 1; oldPos < arr.length; ++oldPos, ++newPos) {

        arr[newPos] = arr[oldPos]

    }

    // Cut off unnecessary right elements
    // This step makes the following transformation:
    //
    // Before: AAAAAAB10C42D9BBC42
    //               ^        ^
    //               left     right
    //
    // After:  AAAAAAB10C42D9
    //               ^        ^
    //               left     right
    arr.length = arr.length - elemsToShift + 1

    return arr

}

/**
 *
 * @param {string} input
 * @returns {string}
 */
module.exports = function runLengthEncoding(input) {

    // Convert string to array so we can perform in-place algorithm
    const list = input.split('')
    const len = list.length

    let left = len - 1
    let right = left

    while (left >= 0) {

        // detect edge
        if (left === 0 || list[left] !== list[left - 1]) {

            splice(list, left, right)

            // Update right pointer after splice
            right = left - 1

        }

        left = left - 1

    }

    // Convert array back to string
    return list.join('')

}
