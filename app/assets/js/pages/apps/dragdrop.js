$(document).ready(function () {
	basicDragDrop();
	dragDropLimit();
	dragDropCopy();
});

function basicDragDrop() {
	dragula([
		document.getElementById('b1'),
		document.getElementById('b2'),
		document.getElementById('b3')
	])

	var element = document.getElementById("boards"); // Count Boards

	function disableselect(e) { return false; }
	document.onselectstart = new Function()
	document.onmousedown = disableselect

}

function dragDropLimit() {
	var dragAndDrop = {

		limit: 2,
		count: 0,

		init: function () {
			this.dragula();
			this.eventListeners();
		},

		eventListeners: function () {
			this.dragula.on('drop', this.dropped.bind(this));
		},

		dragula: function () {
			this.dragula = dragula([document.querySelector('#left'), document.querySelector('#right')],
				{
					moves: this.canMove.bind(this),
				});
			removeOnSpill: true
		},

		canMove: function () {
			return this.count < this.limit;
		},

		dropped: function (el) {
			this.count++;
		}

	};

	dragAndDrop.init();
}
function dragDropCopy() {
	var dragAndDrop = {

		limit: 4,
		count: 0,

		init: function () {
			this.dragula();
			this.eventListeners();
		},

		eventListeners: function () {
			this.dragula.on('drop', this.dropped.bind(this));
		},

		dragula: function () {
			this.dragula = dragula([document.querySelector('#copyleft'), document.querySelector('#copyright')],
				{
					moves: this.canMove.bind(this),
					copy: true,
				});
		},

		canMove: function () {
			return this.count < this.limit;
		},

		dropped: function (el) {
			this.count++;
		}

	};

	dragAndDrop.init();
}