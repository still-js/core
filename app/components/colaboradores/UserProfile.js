class UserProfile extends ViewComponent {
  userName;

  currentPassword;
  newPassword;
  repetePassword;

    /** @type { STForm } */
    updatePasswordForm;

  template = `
    <section class="content">    
    <div class="container-fluid">
    <br/>
    <form>
    <div class="block-header">
    <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <ul class="breadcrumb breadcrumb-style" style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;">
            <li class="breadcrumb-item 	bcrumb-1">
                <a href="/">
                    <i class="material-icons">home</i>
                    Home</a>
            </li>
            <li class="breadcrumb-item bcrumb-1 active">Usuário</li>
            <li class="breadcrumb-item active">Perfil</li>
        </ul>
    </div>
</div>
    </div>
       
                <!-- Your content goes here  -->
                <div class="row clearfix">
                <div class="col-lg-4 col-md-12">
                    <div class="card">
                        <div class="m-b-20">
                            <div class="contact-grid">
                                <div class="profile-header bg-dark">
                                    <div class="user-name" id="userNameInput"></div>
                                    <div class="name-center" id="userFuncaoInput"></div>
                                </div>
                                <img src="../../assets/images/user/usrbig3.jpg" class="user-img" alt="">
                                <div>
                                    <span class="phone">
                                        <i class="material-icons">phone</i><span id="userTelefoneInput"></span></span>
                                </div>
                                <div>
                                    <span class="phone">
                                        <i class="material-icons">email</i><span id="userEmailInput"></span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                <div class="col-lg-8 col-md-12">
                    <div class="card">
                        <div class="profile-tab-box">
                            <div class="p-l-20">
                                <ul class="nav ">
                                    <li class="nav-item tab-all">
                                        <a class="nav-link active show" href="#project" data-toggle="tab">Sobre me</a>
                                    </li>
                                    <li class="nav-item tab-all p-l-20">
                                        <a class="nav-link" href="#usersettings" data-toggle="tab">Definições</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="project" aria-expanded="true">
                            <div class="row clearfix">
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <div class="card project_widget">
                                        <div class="header">
                                            <h2>Sobre me</h2>
                                        </div>
                                        <div class="body">
                                            <div class="row" id="userIdentificacao">
                                            </div>                                           
                                        </div>
                                </div>                               
                                </div>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="timeline" aria-expanded="false">
                        </div>
                        <div role="tabpanel" class="tab-pane" id="usersettings" aria-expanded="false">
                            <div class="card">
                                <div class="header">
                                    <h2>
                                        <strong>Definições</strong> de Segurança</h2>
                                </div>
                                <div class="body">
                                <form id="col_wizard_with_validation" (formRef)="updatePasswordForm" onsubmit="javascript: return false;">
                                    <div class="form-group">
                                        <input (required)="true"  (value)="currentPassword" type="password" class="form-control" placeholder="Current Password">
                                    </div>
                                    <div class="form-group">
                                        <input  (required)="true"  (value)="newPassword" type="password" class="form-control" placeholder="New Password">
                                    </div>
                                    <div class="form-group">
                                        <input (required)="true"  (value)="repetePassword" type="password" class="form-control" placeholder="Repite New Password">
                                    </div>
                                        <button class="btn btn-primary julaw-submit-button" (click)="updatePassword()">Salvar</button>
                                    </form>
                                </div>
                            </div>                           
                        </div>
                    </div>
                </div>
        </div>
        </form>
        </div>
    </section>
    `;

  constructor() {
    super();
    this.setup({
      includs: [
        /* ClientsGrid */
      ],
      scripts: ["assets/js/form.min.js"],
    });
  }

  updatePassword() {

    const isValidForm = this.updatePasswordForm.validate();

    if (isValidForm) {

        if(this.newPassword.value != this.repetePassword.value) {
            AppTemplate.toast({status: 'warning', message: 'As password não coincidem'})
            return;
        }        

        const userLogged = JSON.parse(localStorage.getItem("_user"));       
        
        let payload = {
            "userId": userLogged.uuid,
            "password": this.newPassword.value,
        }
        
        AppTemplate.showLoading();

        $still.HTTPClient.post(
            "/api/v1/update_password",
            JSON.stringify(payload),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                if (response.status != 200) {
                    AppTemplate.hideLoading();
                    if (response.message) {
                        AppTemplate.toast({ status: 'Erro', message: response.message })
                    } else {
                        AppTemplate.toast({ status: 'Erro', message: JSON.stringify(response.errors) })
                    }
                } else {
                    AppTemplate.hideLoading();
                    AppTemplate.toast({ status: 'Sucesso', message: 'Sucesso!, Deve iniciar a Sessão novamente' })
                    setTimeout(() => {
                        localStorage.clear()
                        Router.goto("Login", {
                            data: response.data.id,
                        });
                    },2000)
                }
            })
            .catch((err) => {
                AppTemplate.hideLoading();
                AppTemplate.toast({ status: 'Erro', message: err })
            });


      
    }else{
        AppTemplate.toast({status: 'warning', message: 'Por favor, preencha os campos obrigatórios'})
    }

  }
  onRender() {
    loadWizard();
    const userLogged = JSON.parse(localStorage.getItem("_user"));

    if(userLogged) {

    this.userName = userLogged.nome_completo;

    document.getElementById("userNameInput").innerHTML =
      userLogged.nome_completo;
    document.getElementById("userFuncaoInput").innerHTML =
      userLogged.tipo.description;

    if(userLogged.identificacoes) {
        let templateIdentificacao = ``
        userLogged.identificacoes.forEach((item) => {
            templateIdentificacao += `
                     <div class="col-md-4 col-6 b-r">
                        <strong>Descrição</strong>
                        <br>
                        <p class="text-muted">${item.tipo.code}</p>
                    </div>
                    <div class="col-md-4 col-6 b-r">
                    <strong>N.º do Documento</strong>
                        <br>
                        <p class="text-muted">${item.valor}</p>
                    </div>
                    <div class="col-md-4 col-6 b-r">
                    <strong>Data de Validade </strong>
                        <br>
                        <p class="text-muted">${item.data_validade ?
                            new Date(item.data_validade).toLocaleDateString("PT")
                            : 'N/A'}</p>
                    </div>                 
                `
        })
        document.getElementById('userIdentificacao').innerHTML = templateIdentificacao
    } 
    
    
    if(userLogged.contactos) {
        userLogged.contactos.map((item) => {
            if(item.type === "telefone")
                document.getElementById("userTelefoneInput").innerHTML = item.value

            if(item.type === "e-mail")
                document.getElementById("userEmailInput").innerHTML = item.value

        })
    }

    }

  }

  stAfterInit() {}
}
