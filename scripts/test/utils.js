const fs = require('fs')
const path = require('path')
const difference = require('lodash/difference')

const SRC_PATH = path.resolve(__dirname, '../../src')
const TEST_CASE_FILENAME = 'test-cases.json'

/**
 *
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

module.exports = { fetchProblems }