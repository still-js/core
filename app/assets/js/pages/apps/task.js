$(document).ready(function () {

    $('.datepicker').bootstrapMaterialDatePicker({
        format: 'dddd DD MMMM YYYY',
        clearButton: true,
        weekStart: 1,
        time: false
    });
    classnames();
    //call dragula
    dragula([
        document.getElementById('1'),
        document.getElementById('2'),
        document.getElementById('3'),
        document.getElementById('4'),
        document.getElementById('5')
    ]).on('drop', function (el) {
        //change classes depending on column
        classnames();
    });


    //static adding of values
    $(".submit").click(function () {
        var getvalue1 = document.getElementById("name"),
            getvalue2 = document.getElementById("desc"),
            getvalue3 = document.getElementById("deadline"),
            a = getvalue1.value,
            b = getvalue2.value,
            c = getvalue3.value;
        var today = new Date();
        //  $(".drag-1").append("<div class='box box1'><p class='tasks'><input type='checkbox' class='checkbox checkbox1' name='' value=''/><span class='task-name'>" + a + "</span><br/><span class='task-desc'>" + b + "</span><br/><span class='task-deadline pull-right'> DEADLINE: " + c + "</span><span class='today'>" + today + "</p></div>");

        $(".drag-1").append(
            "<div class='box'> <div class='card'> <div class='card-body'> <div class='form-check'> <div class='form-check m-l-10'> <label class='form-check-label'> <input class='form-check-input checkbox checkbox1' type='checkbox' name='' value=''> <span class='form-check-sign'> <span class='check'></span> </span> </label> </div> </div> <div class='mb-2 p-t-10'><span class='task-name'>" + a + "</span> </div> <span class='task-desc'>" + b + "</span> </div> <div class='card-footer'> <div class='progress' style='height: 5px;'> <div class='progress-bar' role='progressbar' aria-valuenow='80' aria-valuemin='0' aria-valuemax='100' style='width: 80%;'></div> </div> <div>Task Status</div> </div> <div class='card-footer'> <div class='avatar-image avatar-image--loaded mr-2'> <div class='avatar avatar--md avatar-image__image'> <div class='avatar__content'><img src='http://bootdey.com/img/Content/avatar/avatar7.png'></div> </div> </div> <div class='avatar-image avatar-image--loaded mr-2'> <div class='avatar avatar--md avatar-image__image'> <div class='avatar__content'><img src='http://bootdey.com/img/Content/avatar/avatar6.png'></div> </div> </div> <div class='avatar-image avatar-image--loaded mr-2'> <div class='avatar avatar--md avatar-image__image'> <div class='avatar__content'><img src='http://bootdey.com/img/Content/avatar/avatar1.png'></div> </div> </div> </div> <div class='card-footer'><span class='pull-right'> DEADLINE:" + c + "</span> <span class='datetime'></span> </div> </div> </div>"

        )
        //add class to checked items 
        $('input:checkbox.checkbox').change(function () {
            if ($(this).is(":checked")) {
                $(this).parents(".box").addClass("checked");
            } else {
                $(this).parents(".box").removeClass("checked");
            }
        });
    });

    //move all to done
    $(".toDone").click(function () {
        $(".drag-4 .box")
            .appendTo(".drag-5");
    });
    //move all to revised
    $(".toRevised").click(function () {
        $(".drag-3 .box")
            .appendTo(".drag-4");
    });
    //move all to review
    $(".toReview").click(function () {
        $(".drag-2 .box")
            .appendTo(".drag-3");
    });
    //move all to progress
    $(".toProgress").click(function () {
        $(".drag-1 .box")
            .appendTo(".drag-2");
    });

    //add class to checked items 
    $('input:checkbox.checkbox').change(function () {
        if ($(this).is(":checked")) {
            $(this).parents(".box").addClass("checked");
        } else {
            $(this).parents(".box").removeClass("checked");
        }
    });

    //add selected to progress
    $(".toProg").click(function () {
        $(".drag-1 .checked")
            .appendTo(".drag-2");
        $(".drag-2 .checked").removeClass("checked");
        $(".checkbox1").prop("checked", false);
        $(".checkbox1").addClass("checkbox2");
        $(".checkbox1").removeClass("checkbox1 checkbox4 checkbox5 checkbox2 checkbox3");
    });

    //add selected to review
    $(".toRev").click(function () {
        $(".drag-2 .checked")
            .appendTo(".drag-3");
        $(".drag-3 .checked").removeClass("checked");
        $(".checkbox2").prop("checked", false);
        $(".checkbox2").addClass("checkbox3");
        $(".checkbox2").removeClass("checkbox2 checkbox4 checkbox1 checkbox5 checkbox3");
    });

    //add selected to revised
    $(".toRevi").click(function () {
        $(".drag-3 .checked")
            .appendTo(".drag-4");
        $(".drag-4 .checked").removeClass("checked");
        $(".checkbox3").prop("checked", false);
        $(".checkbox3").addClass("checkbox4");
        $(".checkbox3").removeClass("checkbox3 checkbox5 checkbox1 checkbox2 checkbox3");
    });

    //add selected to done
    $(".toDo").click(function () {
        $(".drag-4 .checked")
            .appendTo(".drag-5");
        $(".drag-5 .checked").removeClass("checked");
        $(".checkbox4").prop("checked", false);
        $(".checkbox4").addClass("checkbox5");
        $(".checkbox4").removeClass("checkbox4 checkbox1 checkbox2 checkbox3");
    });
});

//function for changing names of tasks depending on column
var classnames = function () {
    $(".drag-1").children($(".box")).addClass("box1").removeClass("box2 box3 box4 box5");
    $(".drag-2").children($(".box")).addClass("box2").removeClass("box1 box3 box4 box5");
    $(".drag-3").children($(".box")).addClass("box3").removeClass("box1 box2 box4 box5");
    $(".drag-4").children($(".box")).addClass("box4").removeClass("box1 box2 box3 box5");
    $(".drag-5").children($(".box")).addClass("box5").removeClass("box1 box2 box3 box4");

}
