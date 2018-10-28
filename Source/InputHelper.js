

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
			var lessonDefn = lessonRun.defn;
			var questionCurrent = lessonRun.questionCurrent();
			var responseExpected =
			(
				lessonDefn.arePresentationAndResponseReversed == true
				? questionCurrent.presentation
				: questionCurrent.responseCorrect
			);

			var responseRecordCurrent = lessonRun.responseRecordCurrent();

			if (responseActual == responseExpected)
			{
				responseRecordCurrent.timesCorrect++;
				lessonRun.statusMessage =
					"Correct!  The previous question has been answered correctly "
					+ responseRecordCurrent.timesCorrect
					+ " times in a row.";
				if (responseRecordCurrent.timesCorrect >= lessonDefn.timesCorrectPerQuestion)
				{
					lessonRun.questionIndicesIncomplete.remove(lessonRun.questionIndexCurrent);
				}
			}
			else
			{
				responseRecordCurrent.timesCorrect = 0;
				lessonRun.statusMessage =
					"Incorrect!  The correct answer was "
					+ responseExpected
					+ ".  You answered "
					+ responseActual
					+ ".";
			}

			if (lessonRun.isComplete() == true)
			{
				lessonRun.statusMessage =
					"Lesson complete!  Each question was answered correctly "
					+ lessonRun.defn.timesCorrectPerQuestion
					+ " times in a row.";
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
