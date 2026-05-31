var asteroidsDestroyed = function(mass, asteroids) {
    asteroids.sort((a, b) => a - b);

    let currMass = mass;

    for (const asteroid of asteroids) {
        if (currMass < asteroid) {
            return false;
        }
        currMass += asteroid;
    }

    return true;
};