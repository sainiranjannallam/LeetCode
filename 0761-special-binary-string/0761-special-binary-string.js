/**
 * @param {string} s
 * @return {string}
 */
var makeLargestSpecial = function (s) {
    let start = 0;
    let specialString = [];
    let sum = 0;

    for (let i = 0; i < s.length; i++) {
        sum += s[i] === '1' ? 1 : -1

        if (sum === 0) {
            innerString = s.substring(start + 1, i);
            specialString.push('1' + makeLargestSpecial(innerString) + '0');
            start = i + 1;
        }
    }

    specialString.sort((a, b) => b.localeCompare(a));

    return specialString.join('');

};