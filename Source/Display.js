
class Display
{
	displayLessonRun(lessonRun)
	{
		var d = document;

		var textareaPresentation =
			d.getElementById("textareaPresentation");

		var questionCurrent = lessonRun.questionCurrent();
		if (questionCurrent == null)
		{
			textareaPresentation.value = "";
		}
		else
		{
			var presentation =
			(
				lessonRun.defn.arePresentationAndResponseReversed
				? questionCurrent.responseCorrect
				: questionCurrent.presentation
			);
			textareaPresentation.value = presentation;

			var divQuestionContext = d.getElementById("divQuestionContext");
			divQuestionContext.innerHTML = "";
			if (questionCurrent.context != null)
			{
				divQuestionContext.innerHTML = questionCurrent.context;
			}

			var inputResponse = d.getElementById("inputResponse");
			inputResponse.value = "";
			inputResponse.focus();
		}

		var pStatusMessage = d.getElementById("pStatusMessage");
		pStatusMessage.innerHTML = lessonRun.statusMessage;
	}
}
