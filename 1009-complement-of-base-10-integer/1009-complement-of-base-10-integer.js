// Added using AI
var bitwiseComplement = function(n) {
    if (n === 0) return 1;
    const bitLength = Math.floor(Math.log2(n)) + 1;
    const mask = (1 << bitLength) - 1;
    return n ^ mask;
};