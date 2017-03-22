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
                JSON.stringify({
                    functionName: func.name,
                    testCases: spy.cases.dump
                }, null, 4)
            )

            return null
        }

        return result

    }

}

spy.cases = {
    total: 151,
    current: 0,
    dump: []
}