const fs = require('fs')
const path = require('path')
const difference = require('lodash/difference')

const SRC_PATH = path.resolve(__dirname, '../../src')
const TEST_CASE_FILENAME = 'test-cases.json'

/**
 * Returns array of directories (problem names) inside of SRC_PATH dir
 * @param {Array.<string>} problemNames List of problem dir names
 * @returns {Promise}
 */
async function fetchProblemNames(problemNames) {

    return new Promise((resolve, reject) => {

        fs.readdir(SRC_PATH, (err, files) => {

            if (err) return reject(err)

            if (Array.isArray(problemNames)) {

                const fileListDiff = difference(problemNames, files)

                if (fileListDiff.length === 0) {

                    return resolve(problemNames)

                }

                return reject(new Error(`Paths not found: ${fileListDiff.join(', ')}`))

            }

            return resolve(files)

        })

    })

}

/**
 * Returns problem data by name
 * @param {string} problemName
 * @returns {Promise}
 */
async function fetchProblem(problemName) {

    return new Promise((resolve, reject) => {

        try {

            const solutionFilepath = path.resolve(SRC_PATH, problemName, problemName)
            const testCaseFilepath = path.resolve(SRC_PATH, problemName, TEST_CASE_FILENAME)

            return resolve({
                name: problemName,
                solution: require(solutionFilepath),
                testCases: require(testCaseFilepath),
            })

        } catch(err) {

            return reject(err)

        }

    })

}

/**
 * Returns array of problems data
 * @param {Array.<string>} filter List of problem names to fetch
 * @returns {Promise} Promise resolves with problem object
 */
async function fetchProblems(filter) {

    const problemNames = await fetchProblemNames(filter)
    const problems = []

    for (const problemName of problemNames) {

        problems.push(await fetchProblem(problemName))

    }

    return problems

}

/**
 * Runs test cases on problems
 * @param problems
 * @returns {Object}
 */
function runTestCases(problems) {

    const totalTimeStart = Date.now()
    const result = {
        time: 0,
        problems: [],
    }

    for (const problem of problems) {

        const problemResult = {
            time: 0,
            testCases: [],
        }
        const problemTimeStart = Date.now()

        for (const testCase of problem.testCases) {

            const testCaseResult = {
                isPassed: false
            }
            const callResult = problem.solution.apply(null, testCase.input)

            testCaseResult.outputExpected = testCase.output
            testCaseResult.outputActual = callResult

            if (callResult === testCase.output) {

                testCaseResult.isPassed = true

            }

            problemResult.testCases.push(testCaseResult)

        }

        problemResult.time = Date.now() - problemTimeStart
        result.problems.push(problemResult)

    }

    result.time = Date.now() - totalTimeStart

    return result

}

/**
 * Renders report
 * @param {Array.<Object>} testData
 */
function renderReport(testData) {

    return JSON.stringify(testData, null, 4)

}

module.exports = { fetchProblems, runTestCases, renderReport }