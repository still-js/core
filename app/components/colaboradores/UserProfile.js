class UserProfile extends ViewComponent {
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
                <div class="col-lg-4 col-md-12">
                    <div class="card">
                        <div class="m-b-20">
                            <div class="contact-grid">
                                <div class="profile-header bg-dark">
                                    <div class="user-name">John Smith</div>
                                    <div class="name-center">Software Engineer</div>
                                </div>
                                <img src="../../assets/images/user/usrbig3.jpg" class="user-img" alt="">
                                <p>
                                    456, Estern evenue, Courtage area,
                                    <br />New York
                                </p>
                                <div>
                                    <span class="phone">
                                        <i class="material-icons">phone</i>264-625-2583</span>
                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        <h5>564</h5>
                                        <small>Following</small>
                                    </div>
                                    <div class="col-4">
                                        <h5>18k</h5>
                                        <small>Followers</small>
                                    </div>
                                    <div class="col-4">
                                        <h5>565</h5>
                                        <small>Post</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <ul class="nav nav-tabs">
                            <li class="nav-item m-l-10">
                                <a class="nav-link active" data-toggle="tab" href="#about">About</a>
                            </li>
                            <li class="nav-item m-l-10">
                                <a class="nav-link" data-toggle="tab" href="#skills">Skills</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane body active" id="about">
                                <p class="text-default">Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has
                                    been the industry's standard dummy text ever since the 1500s, when an unknown
                                    printer
                                    took a galley of type and scrambled it to make a type specimen book. It has
                                    survived
                                    not only five centuries, but also the leap into electronic typesetting, remaining
                                    essentially
                                    unchanged.</p>
                                <small class="text-muted">Email address: </small>
                                <p>john@gmail.com</p>
                                <hr>
                                <small class="text-muted">Phone: </small>
                                <p>+91 1234567890</p>
                                <hr>
                            </div>
                            <div class="tab-pane body" id="skills">
                                <ul class="list-unstyled">
                                    <li>
                                        <div>Photoshop</div>
                                        <div class="progress skill-progress m-t-20">
                                            <div class="progress-bar l-bg-green width-per-45" role="progressbar"
                                                aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div>Wordpress</div>
                                        <div class="progress skill-progress m-b-20">
                                            <div class="progress-bar l-bg-orange width-per-38" role="progressbar"
                                                aria-valuenow="38" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div>HTML 5</div>
                                        <div class="progress skill-progress m-b-20">
                                            <div class="progress-bar l-bg-cyan width-per-39" role="progressbar"
                                                aria-valuenow="39" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div>Angular</div>
                                        <div class="progress skill-progress m-b-20">
                                            <div class="progress-bar l-bg-purple width-per-70" role="progressbar"
                                                aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </li>
                                </ul>
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
                                        <a class="nav-link active show" href="#project" data-toggle="tab">About Me</a>
                                    </li>
                                    <li class="nav-item tab-all p-l-20">
                                        <a class="nav-link" href="#usersettings" data-toggle="tab">Settings</a>
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
                                            <h2>About</h2>
                                        </div>
                                        <div class="body">
                                            <div class="row">
                                                <div class="col-md-3 col-6 b-r">
                                                    <strong>Full Name</strong>
                                                    <br>
                                                    <p class="text-muted">Emily Smith</p>
                                                </div>
                                                <div class="col-md-3 col-6 b-r">
                                                    <strong>Mobile</strong>
                                                    <br>
                                                    <p class="text-muted">(123) 456 7890</p>
                                                </div>
                                                <div class="col-md-3 col-6 b-r">
                                                    <strong>Email</strong>
                                                    <br>
                                                    <p class="text-muted">johndeo@example.com</p>
                                                </div>
                                                <div class="col-md-3 col-6">
                                                    <strong>Location</strong>
                                                    <br>
                                                    <p class="text-muted">India</p>
                                                </div>
                                            </div>
                                            <p class="m-t-30">Completed my graduation in Arts from the well known and
                                                renowned institution
                                                of India – SARDAR PATEL ARTS COLLEGE, BARODA in 2000-01, which was
                                                affiliated
                                                to M.S. University. I ranker in University exams from the same
                                                university
                                                from 1996-01.</p>
                                            <p>Worked as Professor and Head of the department at Sarda Collage, Rajkot,
                                                Gujarat
                                                from 2003-2015 </p>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem
                                                Ipsum has been the industry's standard dummy text ever since the 1500s,
                                                when
                                                an unknown printer took a galley of type and scrambled it to make a
                                                type
                                                specimen book. It has survived not only five centuries, but also the
                                                leap
                                                into electronic typesetting, remaining essentially unchanged.</p>
                                            <br>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <div class="card project_widget">
                                        <div class="header">
                                            <h2>Education</h2>
                                        </div>
                                        <div class="body">
                                            <ul>
                                                <li>B.A.,Gujarat University, Ahmedabad,India.</li>
                                                <li>M.A.,Gujarat University, Ahmedabad, India.</li>
                                                <li>P.H.D., Shaurashtra University, Rajkot</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <div class="card project_widget">
                                        <div class="header">
                                            <h2>Experience</h2>
                                        </div>
                                        <div class="body">
                                            <ul>
                                                <li>One year experience as Jr. Professor from April-2009 to march-2010
                                                    at B.
                                                    J. Arts College, Ahmedabad.</li>
                                                <li>Three year experience as Jr. Professor at V.S. Arts &amp; Commerse
                                                    Collage
                                                    from April - 2008 to April - 2011.</li>
                                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry.
                                                </li>
                                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry.
                                                </li>
                                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry.
                                                </li>
                                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <div class="card project_widget">
                                        <div class="header">
                                            <h2>Conferences, Cources &amp; Workshop Attended</h2>
                                        </div>
                                        <div class="body">
                                            <ul>
                                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry.
                                                </li>
                                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry.
                                                </li>
                                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry.
                                                </li>
                                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry.
                                                </li>
                                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry.
                                                </li>
                                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry.
                                                </li>
                                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry.
                                                </li>
                                            </ul>
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
                                        <strong>Security</strong> Settings</h2>
                                </div>
                                <div class="body">
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Username">
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" placeholder="Current Password">
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" placeholder="New Password">
                                    </div>
                                    <button class="btn btn-info btn-round">Save Changes</button>
                                </div>
                            </div>
                            <div class="card">
                                <div class="header">
                                    <h2>
                                        <strong>Account</strong> Settings</h2>
                                </div>
                                <div class="body">
                                    <div class="row clearfix">
                                        <div class="col-lg-6 col-md-12">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="First Name">
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-12">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Last Name">
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-12">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="City">
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-12">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="E-mail">
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-12">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Country">
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <textarea rows="4" class="form-control no-resize" placeholder="Address Line 1"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <div class="form-check m-l-10">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="checkbox" id="checkbox"
                                                            name="checkbox"> Profile Visibility For Everyone
                                                        <span class="form-check-sign">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="form-check m-l-10">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="checkbox" id="checkbox1"
                                                            name="checkbox"> New task notifications
                                                        <span class="form-check-sign">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="form-check m-l-10">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="checkbox" id="checkbox2"
                                                            name="checkbox"> New friend request notifications
                                                        <span class="form-check-sign">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <button class="btn btn-primary btn-round">Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
  }
}
