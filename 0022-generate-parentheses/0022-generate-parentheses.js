var generateParenthesis = function(n) {
    let ans = [];

    const generate = (s, open, close) => {
        if (open === n && close === n) {
            ans.push(s);
            return;
        }
        if (open > close)
            generate(s + ")", open, close + 1);
        if (open < n)
            generate(s + "(", open + 1, close);
    };

    generate("", 0, 0);
    return ans;
};