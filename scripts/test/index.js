#!/usr/bin/env node

const program = require('commander')
const { fetchProblems } = require('./utils')

program
    .version('0.0.1')
    .description('Test cases runner for leetcode problems')
    .parse(process.argv);

(async function() {

    const problems = await fetchProblems(program.args.length > 0 ? program.args : null)

    console.time('benchmark')

    for (const problem of problems) {

        for (const testCase of problem.testCases) {

            const result = problem.solution.apply(null, testCase.input)

            if (result === testCase.output) {

                console.log('OK: ', result, testCase.output)

            } else {

                console.log('ERR: ', result, testCase.output)

            }

        }

    }

    console.timeEnd('benchmark')

}())
