class Login extends ViewComponent {

    isPublic = true;
    
    username = null;
    password = null;

    template = `
    <div class="containerAuth">
        <div class="container">
    
        <div class="container-login100">
        <div class="">
            <form onsubmit="javascript: return false;">
                <div class="login100-form">
                    
                    <h2>Login</h2>
                    
                    <div class="wrap-input100">
                        <input class="input100" type="text" (value)="username" placeholder="username">
                    </div>
                    
                    <div class="wrap-input100 validate-input" data-validate="Password is required">
                        <input class="input100" type="password" (value)="password" placeholder="password">
                    </div>

                    <div class="flex-sb-m w-full p-t-15 p-b-20">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="checkbox" value=""> Remember me
                                <span class="form-check-sign">
                                    <span class="check"></span>
                                </span>
                            </label>
                        </div>

                        <div>
                            <a href="#" (click)="gotoRetrieve()" class="txt1">
                                Esqueceu a palavra-passe?
                            </a>
                        </div>
                    </div>        

                    <div class="">
                        <button class="btn btn-default" (click)="logar()">
                            ENTRAR
                        </button>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>
</div>
</div>
    `
    constructor() {
        super();
    }

    gotoRetrieve(){
        Router.goto('AuthBase');
    }

    logar() {

        console.log(">>>>>>>>>>>>>>> ", this.username.value);
        console.log(">>>>>>>>>>>>>>> ", this.password.value);

        const payload = {
            username: this.username.value,
            password: this.password.value
        };

        if(payload.password == '1234' && payload.username == 'sony'){
            AppTemplate.get().store('logged', true);
            Router.goto('Home');
        }else{
            Router.goto('init');
        }

        /* $still.HTTPClient.post(
            "http://localhost:3000/api/v1/login",
            JSON.stringify(payload),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((r) => {
                console.log(`login criado com sucesso: `, r.data);
            })
            .catch((err) => {
                console.log(`Erro ao login colaborador: `, err);
            }); */

    }

}