const thirdMax = (function() {

    /**
     * @param {number[]} nums
     * @return {number}
     */
    function thirdMax(nums) {

        let max1 = -Infinity
        let max2 = -Infinity
        let max3 = -Infinity

        for (let item of nums) {

            if (item === max1 || item === max2 || item === max3) continue;

            if (item > max1) {

                max3 = max2
                max2 = max1
                max1 = item

            } else if (item > max2) {

                max3 = max2
                max2 = item

            } else if (item > max3) {

                max3 = item

            }

        }

        return max3 === -Infinity ? max1 : max3

    }

    return thirdMax

})()

module.exports = thirdMax
