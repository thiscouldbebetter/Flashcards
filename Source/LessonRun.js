
function LessonRun(defn)
{
	this.defn = defn;
	this.statusMessage =
		"Each question must be correctly answered "
		+ this.defn.timesCorrectPerQuestion
		+ " times in a row.";
}

{
	LessonRun.prototype.complete = function()
	{
		var now = new Date();
		var millisecondsToComplete = now - this.timeStarted;
		var secondsToComplete = millisecondsToComplete / 1000;

		var statusMessage =
			"Lesson complete!  Each question was answered correctly "
			+ this.defn.timesCorrectPerQuestion
			+ " times in a row, taking " + secondsToComplete + " seconds, with "
			+ this.responsesIncorrectCount() + " incorrect responses.";

		this.statusMessage = statusMessage;
	}

	LessonRun.prototype.responseCorrect = function(responseRecord)
	{
		responseRecord.timesCorrect++;
		this.statusMessage =
			"Correct!  The previous question has been answered correctly "
			+ responseRecord.timesCorrect
			+ " times in a row.";
		if (responseRecord.timesCorrect >= this.defn.timesCorrectPerQuestion)
		{
			this.questionIndicesIncomplete.remove(this.questionIndexCurrent);
		}
	}

	LessonRun.prototype.responseIncorrect = function(responseRecord, responseExpected, responseActual)
	{
		responseRecord.timesIncorrect++;
		responseRecord.timesCorrect = 0;
		this.statusMessage =
			"Incorrect!  The correct answer was \""
			+ responseExpected
			+ "\".  You answered \""
			+ responseActual
			+ "\".  The question has been answered incorrectly "
			+ responseRecord.timesIncorrect + " times.";
	}

	LessonRun.prototype.responsesIncorrectCount = function()
	{
		var returnValue = 0;

		for (var i = 0; i < this.responseRecords.length; i++)
		{
			var responseRecord = this.responseRecords[i];
			returnValue += responseRecord.timesIncorrect;
		}

		return returnValue;
	}

	LessonRun.prototype.initialize = function()
	{
		this.timeStarted = new Date();

		var questions = this.defn.questions;

		this.questionIndexCurrent = 0;
		if (this.defn.isOrderRandomized == true)
		{
			this.questionIndexCurrent = Math.floor
			(
				Math.random() * questions.length
			);
		}

		this.questionIndicesIncomplete = [];
		this.responseRecords = [];

		for (var i = 0; i < questions.length; i++)
		{
			this.questionIndicesIncomplete.push(i);
			var responseRecord = new ResponseRecord();
			this.responseRecords.push(responseRecord);
		}
	}

	LessonRun.prototype.isComplete = function()
	{
		return (this.questionIndicesIncomplete.length == 0);
	}

	LessonRun.prototype.questionAdvance = function()
	{
		var isFirstTime = true;
		var timesRequired = this.defn.timesCorrectPerQuestion;

		if (this.defn.isOrderRandomized == true)
		{
			var questionIndexNext = this.questionIndicesIncomplete.random();
			this.questionIndexCurrent = questionIndexNext;
		}

		while
		(
			isFirstTime == true
			|| this.responseRecordCurrent().timesCorrect >= timesRequired
		)
		{
			isFirstTime = false;

			this.questionIndexCurrent++;

			if (this.questionIndexCurrent >= this.defn.questions.length)
			{
				this.questionIndexCurrent = 0;
			}
		}
	}

	LessonRun.prototype.questionCurrent = function()
	{
		return this.defn.questions[this.questionIndexCurrent];
	}

	LessonRun.prototype.responseRecordCurrent = function()
	{
		return this.responseRecords[this.questionIndexCurrent];
	}

}
