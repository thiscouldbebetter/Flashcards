

function InputHelper()
{
	// do nothing
}

{
	InputHelper.prototype.initialize = function()
	{
		document.body.onkeydown = this.handleEventKeydown.bind(this);
	}

	// event handlers

	InputHelper.prototype.handleEventKeydown = function(event)
	{
		if (event.key == "Enter")
		{
			var inputResponse = document.getElementById("inputResponse");
			var responseActual = inputResponse.value.trim();

			var lessonRun = Globals.Instance.lessonRun;

			var responseExpected = lessonRun.responseExpected();

			var responseRecordCurrent = lessonRun.responseRecordCurrent();

			if (responseActual == responseExpected)
			{
				lessonRun.responseCorrect(responseRecordCurrent);
			}
			else
			{
				lessonRun.responseIncorrect(responseRecordCurrent, responseExpected, responseActual);
			}

			if (lessonRun.isComplete() == true)
			{
				lessonRun.complete();
				document.body.onkeydown = null;
			}
			else
			{
				lessonRun.questionAdvance();
			}

			Globals.Instance.displayHelper.displayLessonRun
			(
				lessonRun
			);
		}
	}
}
