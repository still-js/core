class Login extends ViewComponent {
    isPublic = true;

    username = null;
    password = null;

    template = `
    <div class="containerAuth" style="background-color: #495057;    position: absolute;
top: 0;
bottom: 0;
left: 0;
right: 0;">
  <div class="container">
  <div style="
    width: 450px;
    margin: 0 auto;
    justify-content: center;
    margin-top: 20%;
  ">
    <div class="login">
      <div style="
        justify-content: center;
        align-items: center;
        display: flex;
        margin-bottom: 25px;
        gap: 20px;
        ">

        <img src="assets/images/julaw-logo.png" style="width: 42px;" alt="" />
        <span style="color: #fff;  font-size: 2rem;">SOFTLAW</span>
      </div>
      <form onsubmit="javascript: return false;">
        <input 
            style="
                width: 100%;
                margin-bottom: 10px;
                background: rgba(0,0,0,0.3);
                border: none;
                outline: none;
                padding: 10px;
                font-size: 13px;
                color: #fff;
                text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
                border: 1px solid rgba(0,0,0,0.3);
                border-radius: 4px;
                box-shadow: inset 0 -5px 45px rgba(100,100,100,0.2), 0 1px 1px rgba(255,255,255,0.2);
                -webkit-transition: box-shadow .5s ease;
                -moz-transition: box-shadow .5s ease;
                -o-transition: box-shadow .5s ease;
                -ms-transition: box-shadow .5s ease;
                transition: box-shadow .5s ease;
                }" 
            type="text" 
            name="u" 
            (value)="username"
            placeholder="Usuário" 
            required="required" />

        <input 
            style="
                width: 100%;
                margin-bottom: 10px;
                background: rgba(0,0,0,0.3);
                border: none;
                outline: none;
                padding: 10px;
                font-size: 13px;
                color: #fff;
                text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
                border: 1px solid rgba(0,0,0,0.3);
                border-radius: 4px;
                box-shadow: inset 0 -5px 45px rgba(100,100,100,0.2), 0 1px 1px rgba(255,255,255,0.2);
                -webkit-transition: box-shadow .5s ease;
                -moz-transition: box-shadow .5s ease;
                -o-transition: box-shadow .5s ease;
                -ms-transition: box-shadow .5s ease;
                transition: box-shadow .5s ease;
                }" 
            type="password" 
            name="p"
            (value)="password"
            placeholder="Palavra-passe" 
            required="required" />

            <button style="margin:0;" class="btn btn-primary julaw-submit-button btn-large"
            (click)="logar()">Entrar</button>

            <div id="erroAuth" style="display:none; margin-top: 25px">
            <p style="color: red; text-align: center">Usuário e/ou palavra-passe, incorrectos</p>
        </div>
      </form>
    </div>
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
                "/api/v1/login",
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

                        if (response.data.funcao == "cliente") {
                            Router.goto("ClienteDetalhes", {
                                data: response.data.id
                            });

                        } else {
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
