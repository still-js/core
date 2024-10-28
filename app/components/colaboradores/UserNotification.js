class UserNotification extends ViewComponent {
  template = `
    <section class="content">    
    <div class="container-fluid">
    <br/>
    <div class="block-header">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <ul class="breadcrumb breadcrumb-style ">
                    <li class="breadcrumb-item">
                        <h4 class="page-title">Profile</h4>
                    </li>
                    <li class="breadcrumb-item bcrumb-1">
                        <a href="../../index.html">
                            <i class="fas fa-home"></i> Home</a>
                    </li>
                    <li class="breadcrumb-item bcrumb-2">
                        <a href="#" onClick="return false;">Extra</a>
                    </li>
                    <li class="breadcrumb-item active">Profile</li>
                </ul>
            </div>
        </div>
    </div>
       
                <!-- Your content goes here  -->
                <div class="row clearfix">
                    <p> Notificações </p>
                </div>
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

  onRender() {
    loadWizard();
    tinymce.init({
      selector: "textarea#tinymce1",
      theme: "modern",
      height: 300,
      plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor colorpicker textpattern imagetools",
      ],
    });
    document.getElementById("input-taxa-horaria").disabled = true;
  }

  stAfterInit() {
    console.log(`Cliend Form foi initializado`);
  }
}
