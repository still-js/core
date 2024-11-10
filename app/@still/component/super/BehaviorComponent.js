class BehaviorComponent {

    $stillClassLvlSubscribers = [];

    onChange(callback = (newState) => { }) {
        this.$stillClassLvlSubscribers.push(callback);
    }

    notifySubscribers(state) {
        this.$stillClassLvlSubscribers.forEach(
            subscriber => subscriber(state)
        );
    }

    onValueInput(field, value, inpt = null) {
        this[field] = value;
    }

    changeState(input, value) { }

    showLoading() {
        document.getElementById('stllAppGlobalLoadingCurtain').style.display = 'flex';
    }

    hideLoading() {
        const hideTimeout = setTimeout(() => {
            const elm = document.getElementById('stllAppGlobalLoadingCurtain');
            if (elm) {
                elm.style.display = 'none';
                clearTimeout(hideTimeout);
            }
        }, 100)
    }

}