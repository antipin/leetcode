/**
 * Update this number according to correspondent value
 * (you should know number of test cases in order to fetch all of them)
 * @type {number}
 */
const TOTAL_NUMBER_OF_TEST_CASES = 151

/**
 * It spies for test cases that were passed to problem solutios and allows to dump it
 * @param {Function} func
 * @returns {Function}
 */
function spy(func) {

    return function() {

        const result = func.apply(null, arguments)

        spy.cases.current += 1
        spy.cases.dump.push({
            input: Array.from(arguments),
            output: result,
        })

        if (spy.cases.current === spy.cases.total) {

            console.log(
                JSON.stringify(spy.cases.dump, null, 4)
            )

            return null
        }

        return result

    }

}

spy.cases = {
    total: TOTAL_NUMBER_OF_TEST_CASES,
    current: 0,
    dump: []
}