class BehaviorComponent {

    $stillClassLvlSubscribers = [];
    
    onChange(callback = (newState) => {}){
        this.$stillClassLvlSubscribers.push(callback);
    }

    notifySubscribers(state){
        this.$stillClassLvlSubscribers.forEach(
            subscriber => subscriber(state)
        );
    }

    onValueInput(field, value, inpt = null){
        this[field] = value;
    }

    changeState(input, value){}

    showLoading(){
        document.getElementById('stllAppGlobalLoadingCurtain').style.display = 'flex';
    }

    hideLoading(){
        document.getElementById('stllAppGlobalLoadingCurtain').style.display = 'none';
    }

}