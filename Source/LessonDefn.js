
function LessonDefn(questions, arePresentationAndResponseReversed, isOrderRandomized, timesCorrectPerQuestion)
{
	this.questions = questions;
	this.arePresentationAndResponseReversed = arePresentationAndResponseReversed;
	this.isOrderRandomized = isOrderRandomized;
	this.timesCorrectPerQuestion = timesCorrectPerQuestion;
}

{

	LessonDefn.build = function(lessonFileContents, arePresentationAndResponseReversed, isOrderRandomized, timesCorrectPerQuestion)
	{
		var questionsAsStrings = lessonFileContents.split("\n\n");

		var questions = [];

		for (var i = 0; i < questionsAsStrings.length; i++)
		{
			var questionAsString = questionsAsStrings[i].trim();

			if (questionAsString.length > 0)
			{
				var presentationAndResponseLines = questionAsString.split("\n");

				if (presentationAndResponseLines.length >= 2)
				{
					var lineIndexFinal = presentationAndResponseLines.length - 1;
					var response = presentationAndResponseLines[lineIndexFinal].trim();

					var presentationLines = presentationAndResponseLines;
					presentationLines.splice(lineIndexFinal, 1);

					var questionContext = null;
					var presentationLineFirst = presentationLines[0];
					if (presentationLineFirst.startsWith("<"))
					{
						questionContext = presentationLineFirst;
						presentationLines.splice(0, 1);
					}

					var questionText = presentationLines.join("\n");

					var question = new Question(questionText, response, questionContext);

					questions.push(question);
				}
				else
				{
					console.log("Error parsing question " + i + ": " + questionAsString);
				}
			}
		}

		var returnValue = null;

		if (isNaN(timesCorrectPerQuestion) == true || timesCorrectPerQuestion <= 0)
		{
			alert("A positive number must be entered in the Times Each Question Must Be Answered Correctly box.");
		}
		else
		{
			returnValue = new LessonDefn
			(
				questions,
				arePresentationAndResponseReversed,
				isOrderRandomized,
				timesCorrectPerQuestion
			);
		}

		return returnValue;
	}
}