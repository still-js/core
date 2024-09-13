class ClientForm extends ViewComponent {

    template = `
    <div class="row clearfix">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="header">
                    <h2><strong>Cadastro</strong> de cliente</h2>
                    <ul class="header-dropdown m-r--5">
                        <li class="dropdown">
                            <a href="#" onClick="return false;" class="dropdown-toggle" data-toggle="dropdown"
                                role="button" aria-haspopup="true" aria-expanded="false">
                                <i class="material-icons">more_vert</i>
                            </a>
                            <ul class="dropdown-menu pull-right">
                                <li>
                                    <a href="#" onClick="return false;">Action</a>
                                </li>
                                <li>
                                    <a href="#" onClick="return false;">Another action</a>
                                </li>
                                <li>
                                    <a href="#" onClick="return false;">Something else here</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="body">
                    <form id="wizard_with_validation" method="POST">
                        <h3>Dados Pessoais</h3>
                        <fieldset>

                            <h2 class="card-inside-title">Detalhes do cliente</h2>
                            <div class="row clearfix">
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <div class="input-field col s12">
                                            <select>
                                                <option value="" disabled selected>Selecione o tipo de cliente</option>
                                                <option value="1">Empresa</option>
                                                <option value="2">Particular</option>
                                                <option value="3">Ministério</option>
                                                <option value="4">Instituto Público</option>
                                                <!--<option value="5">Associação</option>
                                                <option value="6">Outro</option>-->
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">person</i>
                                        </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" placeholder="Sobre nome">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">group</i>
                                        </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" placeholder="Sobrenome">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row clearfix">
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">location_city</i>
                                        </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" placeholder="Endereço">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">receipt</i>
                                        </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" placeholder="NIF">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">person_outline</i>
                                        </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" placeholder="Pessoa de Contacto">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>
                                        <input class="with-gap" name="group1" type="radio" checked />
                                        <span>Masculino</span>
                                    </label>
                                    <label>
                                        <input class="with-gap" name="group1" type="radio" />
                                        <span>Femenino</span>
                                    </label>
                                </div>

                            </div>

                        </fieldset>

                        <h3>Contactos</h3>
                        <fieldset>
                            <h2 class="card-inside-title">Dados de contactos</h2>
                            <div class="row clearfix">
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">phone</i>
                                        </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" placeholder="Telefone">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">email</i>
                                        </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" placeholder="Email">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">contact_phone</i>
                                        </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" placeholder="Contacto para cobrança">
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </fieldset>
                        <h3>Nota</h3>
                        <fieldset>
                            <!-- TinyMCE -->
                            <div class="row clearfix">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="card">
                                        <div class="header">
                                            <h2>
                                                <strong>Nota</strong>
                                            </h2>
                                            <ul class="header-dropdown m-r--5">
                                                <li class="dropdown">
                                                    <a href="#" onClick="return false;" class="dropdown-toggle" data-toggle="dropdown"
                                                        role="button" aria-haspopup="true" aria-expanded="false">
                                                        <i class="material-icons">more_vert</i>
                                                    </a>
                                                    <ul class="dropdown-menu pull-right">
                                                        <li>
                                                            <a href="#" onClick="return false;">Action</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onClick="return false;">Another action</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onClick="return false;">Something else here</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="body">
                                            <textarea id="tinymce1">
                                                    <h2>Título</h2>
                                                <p>Descrição</p>
                                                <h3>Ponto</h3>
                                                <ul>
                                                    <li>Suspendisse tincidunt urna ut velit ullamcorper fermentum.</li>
                                                    <li>Nullam mattis sodales lacus, in gravida sem auctor at.</li>
                                                    <li>Praesent non lacinia mi.</li>
                                                    <li>Mauris a ante neque.</li>
                                                    <li>Aenean ut magna lobortis nunc feugiat sagittis.</li>
                                                </ul>
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;

    constructor(){
        super();
        this.setup({
            includs: [
                /* ClientsGrid */
            ],
            scripts: [
                'assets/js/form.min.js',
                'assets/js/bundles/jquery-steps/jquery.steps.min.js',
                'assets/js/pages/forms/form-wizard.js',
                'assets/js/bundles//multiselect/js/jquery.multi-select.js',
                'assets/js/bundles/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js',
                'assets/js/pages/forms/advanced-form-elements.js',
                'assets/js/bundles/tinymce/tinymce.min.js',
                'assets/js/bundles/ckeditor/ckeditor.js',
                'assets/js/pages/forms/editors.js',
            ],
        });
    }
    

}