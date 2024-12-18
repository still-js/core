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
        <img 
        src="assets/images/julaw-logo.png" 
        style="width: 42px;"
        alt="" 
    />
    <span class="logo-name" style="color: #555">SOFTLAW</span>
        </div>
    </div>
            <form onsubmit="javascript: return false;">
                <div class="login100-form">

                    <span class="login-text">
                        <h2>Login</h2>
                    </span>
                    
                    <div class="wrap-input100">
                        <input 
                        required
                        class="input100" autofocus type="text" (value)="username" placeholder="usuario">
                    </div>
                    
                    <div class="wrap-input100 validate-input" data-validate="Password is required">
                        <input 
                        required
                        class="input100" type="password" (value)="password" placeholder="senha">
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
                    <div id="erroAuth" style="display:none">
                        <p style="color: red; text-align: center">Usuário e/ou senha, incorrectos</p>
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

        AppTemplate.showLoading();

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
                    if (response.status !== 200) {
                        document.getElementById('erroAuth').style.display = 'block'
                        AppTemplate.hideLoading();
                        //  Router.goto('init');
                    } else {
                        localStorage.setItem('_user', JSON.stringify(response.data));
                        localStorage.setItem('logged', true);
                        AppTemplate.get().store('logged', true);
                        AppTemplate.get().store('userName', response.data.nome_completo);
                        AppTemplate.get().store('persmissions', { canSeeGrid: false });
                        AppTemplate.get().setAuthN(true);

                        if(response.data.funcao == "cliente") {
                            Router.goto("ClienteDetalhes", {
                                data: response.data.id
                              });
                            
                        }else{
                            Router.goto('ColaboradorDashboard');
                        }
                    }

                })
                .catch((err) => {
                    AppTemplate.hideLoading();
                    alert(err);
                });
        } else {
            // AppTemplate.toast({ status: 'error', message: 'usuário e/ou senha, devem ser preenchidos' })
            
            AppTemplate.hideLoading();
        }
    }

    isValidatedInputForm() {
        if (this.username.value == "" || this.password.value == "") return false;
        return true;
    }
}
