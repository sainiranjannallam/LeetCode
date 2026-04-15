var sortByBits = function(arr) {

    // create 15 buckets
    let lst = Array.from({ length: 15 }, () => []);

    // fill buckets
    for (let num of arr) {
        let bits = num.toString(2)
                      .split('1').length - 1;
        lst[bits].push(num);
    }

    // build answer
    let ans = [];

    for (let bucket of lst) {
        bucket.sort((a, b) => a - b);
        for (let num of bucket) {
            ans.push(num);
        }
    }

    return ans;
};