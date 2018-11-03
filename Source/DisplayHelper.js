
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

		var divQuestionContext = document.getElementById("divQuestionContext");
		divQuestionContext.innerHTML = "";
		if (questionCurrent.context != null)
		{
			divQuestionContext.innerHTML = questionCurrent.context;
		}

		var inputResponse = document.getElementById("inputResponse");
		inputResponse.value = "";
		inputResponse.focus();

		var pStatusMessage = document.getElementById("pStatusMessage");
		pStatusMessage.innerHTML = lessonRun.statusMessage;
	}
}
