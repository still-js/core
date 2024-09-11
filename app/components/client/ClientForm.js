class ClientForm extends ViewComponent {

    template = `
    <div class="row clearfix">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="header">
                    <h2>
                        <strong>Input</strong> Group</h2>
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
                    <h2 class="card-inside-title">With Icon</h2>
                    <div class="row clearfix">
                        <div class="col-md-4">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">person</i>
                                </span>
                                <div class="form-line">
                                    <input type="text" class="form-control date" placeholder="Username">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="input-group">
                                <div class="form-line">
                                    <input type="text" class="form-control date" placeholder="Message">
                                </div>
                                <span class="input-group-addon">
                                    <i class="material-icons">send</i>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">person</i>
                                </span>
                                <div class="form-line">
                                    <input type="text" class="form-control date" placeholder="Recipient's username">
                                </div>
                                <span class="input-group-addon">
                                    <i class="material-icons">send</i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <h2 class="card-inside-title">With Text</h2>
                    <div class="row clearfix">
                        <div class="col-md-4">
                            <div class="input-group">
                                <span class="input-group-addon">@</span>
                                <div class="form-line">
                                    <input type="text" class="form-control" placeholder="Username">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="input-group">
                                <div class="form-line">
                                    <input type="text" class="form-control" placeholder="Recipient's username">
                                </div>
                                <span class="input-group-addon">@example.com</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="input-group">
                                <span class="input-group-addon">$</span>
                                <div class="form-line">
                                    <input type="text" class="form-control date">
                                </div>
                                <span class="input-group-addon">.00</span>
                            </div>
                        </div>
                    </div>
                    <h2 class="card-inside-title">
                        Different Sizes
                        <small>You can use the
                            <code>.input-group-sm, .input-group-lg</code> classes for sizing.
                        </small>
                    </h2>
                    <div class="row clearfix">
                        <div class="col-md-4">
                            <p>
                                <b>Input Group Large</b>
                            </p>
                            <div class="input-group input-group-lg">
                                <span class="input-group-addon">
                                    <i class="material-icons">person</i>
                                </span>
                                <div class="form-line">
                                    <input type="text" class="form-control" placeholder="Username">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <p>
                                <b>Input Group Default</b>
                            </p>
                            <div class="input-group">
                                <div class="form-line">
                                    <input type="text" class="form-control" placeholder="Message">
                                </div>
                                <span class="input-group-addon">
                                    <i class="material-icons">send</i>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <p>
                                <b>Input Group Small</b>
                            </p>
                            <div class="input-group input-group-sm">
                                <span class="input-group-addon">
                                    <i class="material-icons">person</i>
                                </span>
                                <div class="form-line">
                                    <input type="text" class="form-control" placeholder="Recipient's username">
                                </div>
                                <span class="input-group-addon">
                                    <i class="material-icons">send</i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row clearfix">
                        <div class="col-md-4">
                            <div class="input-group input-group-lg">
                                <span class="input-group-addon">@</span>
                                <div class="form-line">
                                    <input type="text" class="form-control" placeholder="Username">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="input-group">
                                <div class="form-line">
                                    <input type="text" class="form-control" placeholder="Recipient's username">
                                </div>
                                <span class="input-group-addon">@example.com</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="input-group input-group-sm">
                                <span class="input-group-addon">$</span>
                                <div class="form-line">
                                    <input type="text" class="form-control">
                                </div>
                                <span class="input-group-addon">.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    constructor(){
        super();
        this.setup({
            
        });
    }
    

}