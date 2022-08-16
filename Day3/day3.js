// Importing the filesystem module
const fs = require('fs');

const nums = fs.readFileSync('day3.txt', { encoding: 'utf-8'})
            .split('\n')

let binNums = [];
for (let i in nums) {
    binNums.push(nums[i].replace('\r', ''))
}

// PART 1
function findMostandLeastCommon (arr) {
    const data = {
        mostCommon: '',
        leastCommon: ''
    }
    for (let i = 0; i < arr[0].length; i++) {
        let ones = 0
        let zeros = 0
        for (let j = 0; j < arr.length; j++) {
            if (parseInt(arr[j][i]) === 1) {
                ones++
                continue
            }
            if (parseInt(arr[j][i]) === 0) {
                zeros++
            }
        }
        if (ones > zeros || ones === zeros) {
            data['mostCommon'] += 1
            data['leastCommon'] += 0
            continue
        }
        if (ones < zeros) {
            data['mostCommon'] += 0
            data['leastCommon'] += 1
        }
    }
    return data
}
const data = findMostandLeastCommon(binNums)

console.log('Gamma x Epsilon:', parseInt(data['mostCommon'], 2) * parseInt(data['leastCommon'], 2))


// PART 2

const findOxigenRating = () => {
let oxigenGenRating = [...binNums]

    for (let i = 0; i < binNums[0].length; i++) {
        if (oxigenGenRating.length === 1) return parseInt(oxigenGenRating[0], 2)
        const oneCount = oxigenGenRating.filter(el => Number(el[i]) === 1).length
        const zeroCount = oxigenGenRating.filter(el => Number(el[i]) === 0).length

        if (oneCount >= zeroCount) {
            oxigenGenRating = oxigenGenRating.filter(num => num[i] === "1")
        } else {
            oxigenGenRating = oxigenGenRating.filter(num => num[i] === "0")
        }
    }
    return parseInt(oxigenGenRating[0], 2)
}

const findCo2ScrubberRating = () => {
    let co2ScrubberRating = [...binNums]
    
        for (let i = 0; i < binNums[0].length; i++) {
            if (co2ScrubberRating.length === 1) return parseInt(co2ScrubberRating[0], 2)
            
            const oneCount = co2ScrubberRating.filter(el => Number(el[i]) === 1).length
            const zeroCount = co2ScrubberRating.filter(el => Number(el[i]) === 0).length
            if (zeroCount <= oneCount) {
                co2ScrubberRating = co2ScrubberRating.filter(num => num[i] === "0")
            } else {
                co2ScrubberRating = co2ScrubberRating.filter(num => num[i] === "1")
            }
        }
        return parseInt(co2ScrubberRating[0], 2)
    }

console.log("Life support rating: ", findOxigenRating() * findCo2ScrubberRating())