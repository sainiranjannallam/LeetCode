const closestTarget = (words, target, s) => {
    const n = words.length;
    for (let i = 0; i <= n >> 1; i++)
        if (words.at((s + i) % n) === target |
            words.at((s - i) % n) === target)
            return i;

    return -1;
};