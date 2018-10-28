
// classes

function DisplayHelper()
{
	// do nothing
}

{
	DisplayHelper.prototype.displayLessonRun = function(lessonRun)
	{
		var textareaPresentation = document.getElementById
		(
			"textareaPresentation"
		);

		var questionCurrent = lessonRun.questionCurrent();
		var presentation =
		(
			lessonRun.defn.arePresentationAndResponseReversed == true
			? questionCurrent.responseCorrect
			: questionCurrent.presentation
		);
		textareaPresentation.value = presentation;

		var inputResponse = document.getElementById("inputResponse");
		inputResponse.value = "";
		inputResponse.focus();

		var pStatusMessage = document.getElementById("pStatusMessage");
		pStatusMessage.innerHTML = lessonRun.statusMessage;
	}
}
