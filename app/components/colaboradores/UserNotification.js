class UserNotification extends ViewComponent {
  template = `
    <section class="content">
      <br />
  
        <div class="col-xs-12">
          <div class="card">
            <div class="header">
                Suas Notifications
            </div>
            <div class="body">
                <!-- Your content goes here  -->
               
            </div>
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
    this.processoService.on('load', async () => {
      const notifications = await this.processoService.getTarefaByColaboradorId();
      this.parseAndDisplayNotifications(notifications);
  });
  }

  parseAndDisplayNotifications(notifications) {
    
  }
}
