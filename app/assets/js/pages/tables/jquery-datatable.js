'use strict';
$(function () {
	$('.js-basic-example').DataTable({
		responsive: true
	});

	$('.save-stage').DataTable({
		"scrollX": true,
		stateSave: true
	});

	var t = $('#example3').DataTable({
		"scrollX": true
	});
	var counter = 1;

	$('#addRow').on('click', function () {
		t.row.add([
			counter + '.1',
			counter + '.2',
			counter + '.3',
			counter + '.4',
			counter + '.5'
		]).draw(false);

		counter++;
	});

	$('#tableExport').DataTable({
		dom: 'Bfrtip',
		buttons: [
			'copy', 'csv', 'excel', 'pdf', 'print'
		]
	});


	//Exportable table
	$('.js-exportable').DataTable({
		dom: 'Bfrtip',
		responsive: true,
		buttons: [
			'copy', 'csv', 'excel', 'pdf', 'print'
		]
	});

	// #start# Group table
	var table = $('#tableGroup').DataTable({
		"columnDefs": [
			{ "visible": false, "targets": 2 }
		],
		"order": [[2, 'asc']],
		"scrollX": true,
		"displayLength": 25,
		"drawCallback": function (settings) {
			var api = this.api();
			var rows = api.rows({ page: 'current' }).nodes();
			var last = null;

			api.column(2, { page: 'current' }).data().each(function (group, i) {
				if (last !== group) {
					$(rows).eq(i).before(
						'<tr class="group"><td colspan="5">' + group + '</td></tr>'
					);

					last = group;
				}
			});
		}
	});

	// Order by the grouping
	$('#tableGroup tbody').on('click', 'tr.group', function () {
		var currentOrder = table.order()[0];
		if (currentOrder[0] === 2 && currentOrder[1] === 'asc') {
			table.order([2, 'desc']).draw();
		}
		else {
			table.order([2, 'asc']).draw();
		}
	});

	childRowTable();
});

function childRowTable() {
	var childData = [
		{
			"id": "1",
			"name": "Tiger Nixon",
			"position": "System Architect",
			"salary": "$320,800",
			"start_date": "2011/04/25",
			"office": "Edinburgh",
			"extn": "5421"
		},
		{
			"id": "2",
			"name": "Garrett Winters",
			"position": "Accountant",
			"salary": "$170,750",
			"start_date": "2011/07/25",
			"office": "Tokyo",
			"extn": "8422"
		},
		{
			"id": "3",
			"name": "Ashton Cox",
			"position": "Junior Technical Author",
			"salary": "$86,000",
			"start_date": "2009/01/12",
			"office": "San Francisco",
			"extn": "1562"
		},
		{
			"id": "4",
			"name": "Cedric Kelly",
			"position": "Senior Javascript Developer",
			"salary": "$433,060",
			"start_date": "2012/03/29",
			"office": "Edinburgh",
			"extn": "6224"
		},
		{
			"id": "5",
			"name": "Airi Satou",
			"position": "Accountant",
			"salary": "$162,700",
			"start_date": "2008/11/28",
			"office": "Tokyo",
			"extn": "5407"
		},
		{
			"id": "6",
			"name": "Brielle Williamson",
			"position": "Integration Specialist",
			"salary": "$372,000",
			"start_date": "2012/12/02",
			"office": "New York",
			"extn": "4804"
		},
		{
			"id": "7",
			"name": "Herrod Chandler",
			"position": "Sales Assistant",
			"salary": "$137,500",
			"start_date": "2012/08/06",
			"office": "San Francisco",
			"extn": "9608"
		},
		{
			"id": "8",
			"name": "Rhona Davidson",
			"position": "Integration Specialist",
			"salary": "$327,900",
			"start_date": "2010/10/14",
			"office": "Tokyo",
			"extn": "6200"
		},
		{
			"id": "9",
			"name": "Colleen Hurst",
			"position": "Javascript Developer",
			"salary": "$205,500",
			"start_date": "2009/09/15",
			"office": "San Francisco",
			"extn": "2360"
		},
		{
			"id": "10",
			"name": "Sonya Frost",
			"position": "Software Engineer",
			"salary": "$103,600",
			"start_date": "2008/12/13",
			"office": "Edinburgh",
			"extn": "1667"
		},
		{
			"id": "11",
			"name": "Jena Gaines",
			"position": "Office Manager",
			"salary": "$90,560",
			"start_date": "2008/12/19",
			"office": "London",
			"extn": "3814"
		},
		{
			"id": "12",
			"name": "Quinn Flynn",
			"position": "Support Lead",
			"salary": "$342,000",
			"start_date": "2013/03/03",
			"office": "Edinburgh",
			"extn": "9497"
		},
		{
			"id": "13",
			"name": "Charde Marshall",
			"position": "Regional Director",
			"salary": "$470,600",
			"start_date": "2008/10/16",
			"office": "San Francisco",
			"extn": "6741"
		},
		{
			"id": "14",
			"name": "Haley Kennedy",
			"position": "Senior Marketing Designer",
			"salary": "$313,500",
			"start_date": "2012/12/18",
			"office": "London",
			"extn": "3597"
		},
		{
			"id": "15",
			"name": "Tatyana Fitzpatrick",
			"position": "Regional Director",
			"salary": "$385,750",
			"start_date": "2010/03/17",
			"office": "London",
			"extn": "1965"
		},
		{
			"id": "16",
			"name": "Michael Silva",
			"position": "Marketing Designer",
			"salary": "$198,500",
			"start_date": "2012/11/27",
			"office": "London",
			"extn": "1581"
		},
		{
			"id": "17",
			"name": "Paul Byrd",
			"position": "Chief Financial Officer (CFO)",
			"salary": "$725,000",
			"start_date": "2010/06/09",
			"office": "New York",
			"extn": "3059"
		},
		{
			"id": "18",
			"name": "Gloria Little",
			"position": "Systems Administrator",
			"salary": "$237,500",
			"start_date": "2009/04/10",
			"office": "New York",
			"extn": "1721"
		},
		{
			"id": "19",
			"name": "Bradley Greer",
			"position": "Software Engineer",
			"salary": "$132,000",
			"start_date": "2012/10/13",
			"office": "London",
			"extn": "2558"
		},
		{
			"id": "20",
			"name": "Dai Rios",
			"position": "Personnel Lead",
			"salary": "$217,500",
			"start_date": "2012/09/26",
			"office": "Edinburgh",
			"extn": "2290"
		}

	];



	/* Formatting function for row details - modify as you need */
	function format(d) {
		// `d` is the original data object for the row
		return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;background:#f5f5f5;">' +
			'<tr>' +
			'<td>Full name:</td>' +
			'<td>' + d.name + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>Extension number:</td>' +
			'<td>' + d.extn + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>Extra info:</td>' +
			'<td>And any further details here (images etc)...</td>' +
			'</tr>' +
			'</table>';
	}



	var table = $('#chieldRow').DataTable({
		data: childData,
		"columns": [
			{
				"className": 'details-control',
				"orderable": false,
				"data": null,
				"defaultContent": ''
			},
			{ "data": "name" },
			{ "data": "position" },
			{ "data": "office" },
			{ "data": "salary" }
		],
		"order": [[1, 'asc']]
	});

	// Add event listener for opening and closing details
	$('#chieldRow tbody').on('click', 'td.details-control', function () {
		var tr = $(this).closest('tr');
		var row = table.row(tr);

		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			// Open this row
			row.child(format(row.data())).show();
			tr.addClass('shown');
		}
	});

}


//#end# Group table

