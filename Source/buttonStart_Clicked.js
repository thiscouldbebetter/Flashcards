
function buttonStart_Clicked()
{
  var textareaLesson = document.getElementById("textareaLesson");
	var lessonAsString = textareaLesson.value;

	var checkboxReverse = document.getElementById("checkboxReverse");
	var arePresentationAndResponseReversed = checkboxReverse.checked;
	
	var checkboxRandomizeOrder = document.getElementById("checkboxRandomizeOrder");
	var isOrderRandomized = checkboxRandomizeOrder.checked;
		
	var inputTimesCorrectPerQuestion = document.getElementById
	(
		"inputTimesCorrectPerQuestion"
	);
	var timesCorrectPerQuestion = parseInt(inputTimesCorrectPerQuestion.value);
	
	var lessonDefn = LessonDefn.build
	(
	    lessonAsString,
	    arePresentationAndResponseReversed,
	    isOrderRandomized,
	    timesCorrectPerQuestion
	);
	
	Globals.Instance.initialize(lessonDefn);
}
