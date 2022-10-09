
class InputHelper
{
	initialize()
	{
		document.body.onkeydown = this.handleEventKeydown.bind(this);
	}

	// event handlers

	handleEventKeydown(event)
	{
		if (event.key == "Enter")
		{
			var d = document;
			var inputResponse = d.getElementById("inputResponse");
			var responseActual = inputResponse.value.trim();

			var lessonRun = Globals.Instance().lessonRun;

			var responseExpected = lessonRun.responseExpected();

			var responseRecordCurrent = lessonRun.responseRecordCurrent();

			if (responseActual == responseExpected)
			{
				lessonRun.responseCorrect(responseRecordCurrent);
			}
			else
			{
				lessonRun.responseIncorrect
				(
					responseRecordCurrent, responseExpected, responseActual
				);
			}

			if (lessonRun.isComplete())
			{
				lessonRun.complete();
				d.body.onkeydown = null;
			}
			else
			{
				lessonRun.questionAdvance();
			}

			Globals.Instance().display.displayLessonRun
			(
				lessonRun
			);
		}
	}
}
