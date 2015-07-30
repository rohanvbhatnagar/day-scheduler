<!DOCTYPE html>
<head>
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
 <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js"></script>
<script src="coversion.js"></script>
<script src ="daypilot-all.min.js"></script>
<link rel="stylesheet" href="calendar.css">
</head>
<body>
	<div class="main">
		<input class="date_picker" type="date" onchange="render(this)">
		<div id="dpDay"></div>
	</div>
<script type="text/javascript">

	function render(input){
	 events.render(input.value).then(function(event_html){
	 	getScrollContainer().scrollTop(0);
		$(".container").empty();
	  $(".container").append(event_html);
		});

	}
	function getContainer(){
		return getScrollContainer().children(":nth-child(1)");


	}
	function getScrollContainer(){
		return $("#dpDay").children(":nth-child(2)").children().children(":nth-child(2)");
	}

  var day = new DayPilot.Calendar("dpDay");
  day.viewType = "Day";
  day.init();
  $(".calendar_default_colheader_inner").empty();
  $(".calendar_default_corner").empty();
  
  $("<div class='container'></div>").appendTo(getContainer());

  var $date_picker = $(".date_picker")
  $date_picker.val(moment().format('YYYY-MM-DD'));

  render($date_picker[0]);
</script>






</body>
