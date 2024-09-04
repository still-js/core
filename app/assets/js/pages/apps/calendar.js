/**
 *  Document   : calendar.js
 *  Author     : redstar
 *  Description: Script for calendar data
 *
 **/
var AppCalendar = (function() {
  return {
    init: function() {
      this.initCalendar();
    },
    initCalendar: function() {
      if (jQuery().fullCalendar) {
        var d = new Date(),
          date = d.getDate(),
          month = d.getMonth(),
          year = d.getFullYear(),
          r = {};
        $("#calendar").removeClass("mobile"),
          (r = {
            left: "prev,next,today",
            center: "title",
            right: "month,agendaWeek,agendaDay"
          });
        var l = function(e) {
            var t = {
              title: $.trim(e.text())
            };
            e.data("eventObject", t),
              e.draggable({
                zIndex: 999,
                revert: !0,
                revertDuration: 0
              });
          },
          add = function(e) {
            e = 0 === e.length ? "Untitled Event" : e;
            var t = $(
              '<div class="fc-event label-event-' + e + '">' + e + "</div>"
            );
            jQuery("#event_box").append(t), l(t);
          };
        $("#external-events div.external-event").each(function() {
          l($(this));
        }),
          $("#event_add")
            .unbind("click")
            .on("click", function() {
              var e = $("#event_title").val();
              add(e);
            }),
          $("#event_box").html(""),
          add("holiday"),
          add("birthday"),
          add("meeting"),
          add("competition"),
          add("dinner"),
          add("party"),
          $("#calendar").fullCalendar("destroy"),
          $("#calendar").fullCalendar({
            header: r,
            defaultView: "month",
            slotMinutes: 15,
            editable: !0,
            droppable: !0,
            drop: function(e, t) {
              var a = $(this).data("eventObject"),
                n = $.extend({}, a);
              (n.start = e),
                (n.allDay = t),
                (n.className = $(this).attr("data-class")),
                $("#calendar").fullCalendar("renderEvent", n, !0),
                $("#drop-remove").is(":checked") && $(this).remove();
            },

            /***** events ********/
            events: [
              {
                title: "Annual Day",
                start: new Date(year, month, date - 5, 0, 0),
                end: new Date(year, month, date - 2, 0, 0),
                backgroundColor: "#00FFFF"
              },
              {
                title: "Sports Event",
                start: new Date(year, month, date - 10, 9, 0),
                end: new Date(year, month, date - 8, 0, 0),
                backgroundColor: "#F3565D"
              },
              {
                title: "Repeating Event",
                start: new Date(year, month, date + 5, 16, 0),
                allDay: !1,
                backgroundColor: "#1bbc9b"
              },
              {
                title: "Meeting",
                start: new Date(year, month, date, 10, 30),
                allDay: !1
              },
              {
                title: "Result Day",
                start: new Date(year, month, date + 7, 19, 0),
                end: new Date(year, month, date + 1, 22, 30),
                backgroundColor: "#DC35A9",
                allDay: !1
              },
              {
                title: "Click for Google",
                start: new Date(year, month, 29),
                end: new Date(year, month, 30),
                backgroundColor: "#9b59b6",
                url: "http://google.com/"
              }
            ]
          });
      }
    }
  };
})();

jQuery(document).ready(function() {
  "use strict";
  AppCalendar.init();
});
