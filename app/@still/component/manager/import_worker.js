self.addEventListener('message', (message) => {
    
    //fetch('../../../components/client/ClientForm.js')
    //.th
    //const script = document.createElement('script');
    console.log(`got message from cliente: `, message);
    postMessage({ completed: true });

});


/* self.onmessage((message) => {
    
    const script = document.createElement('script');
    console.log(`got message from cliente: `, message);
    postMessage({ completed: true });

}); */