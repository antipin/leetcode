/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
const getHint = (function() {

    const PLACEHOLDER = '_'

    function buildNumersFrequencyTable(input) {

        const frequencyTable = {}

        for (const item of input) {

            if (item === PLACEHOLDER) continue;

            frequencyTable[item] = frequencyTable[item] === undefined ? 0 : frequencyTable[item]
            frequencyTable[item] += 1

        }

        return frequencyTable

    }

    function getHint(secret, guess) {

        let bullsCount = 0
        let cowsCount = 0
        const secretArr = Array.from(secret)
        const guessArr = Array.from(guess)

        // Count Bulls
        for (let i = 0; i < secretArr.length; ++i) {

            if (secretArr[i] === guessArr[i]) {

                bullsCount += 1
                secretArr[i] = PLACEHOLDER
                guessArr[i] = PLACEHOLDER

            }

        }

        // Count Cows
        const secretCowsFrequencyTable = buildNumersFrequencyTable(secretArr)
        const guessCowsFrequencyTable = buildNumersFrequencyTable(guessArr)

        for (const key in guessCowsFrequencyTable) {

            if (guessCowsFrequencyTable[key] && secretCowsFrequencyTable[key]) {

                cowsCount += Math.min(guessCowsFrequencyTable[key], secretCowsFrequencyTable[key])

            }

        }

        return `${bullsCount}A${cowsCount}B`
    }

    return getHint

})()
