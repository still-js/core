export const sleepForSec = (sec) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(null), sec);
    });
}

window.sleepForSec = sleepForSec;