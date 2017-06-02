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

    /**
     * @param {number} index
     * @param {number} value
     * @return {void}
     */
    update(index, value) {

        // Restore original value from precalculated sums array
        const originalValue = (index > 0) ? this.sums[index] - this.sums[index - 1] : this.sums[index]
        const diff = value - originalValue

        // Increase all values right to the index (inclusive) on diff value
        for (let i = index; i < this.sums.length; ++i) {

            this.sums[i] += diff

        }

    }

}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = Object.create(NumArray).createNew(nums)
 * obj.update(i,val)
 * var param_2 = obj.sumRange(i,j)
 */

module.exports = NumArray
