class Login extends ViewComponent {
    isPublic = true;

    username = null;
    password = null;

    template = `
    <div class="containerAuth">
        <div class="container">
          
        <div class="container-login100">
        <div class="">
        <div>
        <div class="center">
            <p class="logo">
                <span class="logo-first">Ju</span><span class="logo-second">law</span>
            </p>
        </div>
    </div>
            <form onsubmit="javascript: return false;">
                <div class="login100-form">

                    <span class="login-text">
                        <h2>Login</h2>
                    </span>
                    
                    <div class="wrap-input100">
                        <input class="input100" autofocus type="text" (value)="username" placeholder="usuario">
                    </div>
                    
                    <div class="wrap-input100 validate-input" data-validate="Password is required">
                        <input class="input100" type="password" (value)="password" placeholder="senha">
                    </div>

                    <div class="flex-sb-m w-full p-t-15 p-b-20">
                            <a href="#" (click)="gotoRetrieve()" class="txt1">
                                Esqueceu a palavra-passe?
                            </a>
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
    `;
    constructor() {
        super();
    }

    gotoRetrieve() {
        Router.goto("AuthBase");
    }

    logar() {

        const payload = {
            username: this.username.value,
            password: this.password.value,
        };

        if (this.isValidatedInputForm()) {
            $still.HTTPClient.post(
                "http://localhost:3000/api/v1/login",
                JSON.stringify(payload),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => {
                    console.log(`login criado com sucesso: `, response);
                    if (response.status !== 200) {
                        alert(response.errors);
                        Router.goto('Init');
                    } else {
                        localStorage.setItem('_user', JSON.stringify(response.data));
                        localStorage.setItem('logged', true);
                        alert("Bem-vindo (a), a plataforma JuLAW");
                        AppTemplate.get().store('logged', true);
                        AppTemplate.get().store('persmissions', { canSeeGrid: false });
                        AppTemplate.get().setAuthN(true);
                        Router.goto('ColaboradorDashboard');
                        // aonde guardar os dados do user logado com seguranca
                    }

                })
                .catch((err) => {
                    console.log(`Erro ao login colaborador: `, err);
                });
        } else {
            alert("Campo usuário e/ou senha, devem ser preenchidos")
        }
    }

    isValidatedInputForm() {
        if (this.username.value == "" || this.password.value == "") return false;
        return true;
    }
}
