#!/usr/bin/env node

const program = require('commander')
const { fetchProblems, runTestCases, renderReport } = require('./utils')

program
    .version('0.0.1')
    .description('Test cases runner for leetcode problems')
    .parse(process.argv);

(async function() {

    const problems = await fetchProblems(program.args.length > 0 ? program.args : null)
    const testResultsData = runTestCases(problems)
    const report = renderReport(testResultsData)

    console.log(report)

}())
