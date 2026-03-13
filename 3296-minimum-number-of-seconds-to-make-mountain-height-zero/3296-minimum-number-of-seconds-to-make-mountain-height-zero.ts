function minNumberOfSeconds(mountainHeight: number, workerTimes: number[]): number {
    let minTime = Math.min(...workerTimes), l = 1, r = minTime * ((mountainHeight * (mountainHeight + 1)) / 2);

    const workerHeightReduction = (workTime: number, T: number): number => {
        const heightReduced = Math.floor((-1 + Math.sqrt(1 + (8 * T) / workTime)) / 2);
        return heightReduced > 0 ? heightReduced : 0;
    }

    const canDestroyMountainInTime = (T: number): boolean => {
        let totalReduction = 0;

        for(let workTime of workerTimes) {
            totalReduction += workerHeightReduction(workTime, T);
        }

        return totalReduction >= mountainHeight;
    }

    let res = r;

    while(l <= r) {
        let mid = Math.floor((l + r) / 2);

        if(canDestroyMountainInTime(mid)) {
            res = mid;
            r = mid - 1;
        }
        else {
            l = mid + 1;
        }
    }

    return res;
};