const sleepForSec = (sec) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(null), sec);
    });
}