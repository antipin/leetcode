class NumArray {

    /**
     * @constructor
     * @param {number[]} nums
     */
    constructor(nums) {

        let sumAccum = 0

        this.sums = nums.map(item => {

            sumAccum += item

            return sumAccum

        })

    }

    /**
     * @param {number} i
     * @param {number} j
     * @return {number}
     */
    sumRange(i, j) {

        const decValue = (i > 0) ? this.sums[i - 1] : 0

        return this.sums[j] - decValue

    }

}

/**
 * Your NumArray object will be instantiated and called as such:
 * var numArray = new NumArray(nums);
 * numArray.sumRange(0, 1);
 * numArray.sumRange(0, 2);
 */

module.exports = NumArray
