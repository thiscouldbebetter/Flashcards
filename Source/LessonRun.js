
class LessonRun
{
	constructor(defn)
	{
		this.defn = defn;
		this.statusMessage =
			this.defn.questions.length
			+ " questions must each be correctly answered "
			+ this.defn.timesCorrectPerQuestion
			+ " times in a row.";
	}

	complete()
	{
		var now = new Date();
		var millisecondsToComplete = now - this.timeStarted;
		var secondsToComplete = millisecondsToComplete / 1000;

		var statusMessage =
			"Lesson complete!  " + this.defn.questions.length
			+  " questions were each answered correctly "
			+ this.defn.timesCorrectPerQuestion
			+ " times in a row, taking " + secondsToComplete + " seconds, with "
			+ this.responsesIncorrectCount() + " incorrect responses.";

		this.statusMessage = statusMessage;

		this.questionIndexCurrent = null;
	}

	initialize()
	{
		this.timeStarted = new Date();

		var questions = this.defn.questions;

		this.questionIndexCurrent = 0;
		if (this.defn.isOrderRandomized)
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

	isComplete()
	{
		return (this.questionIndicesIncomplete.length == 0);
	}

	questionAdvance()
	{
		var isFirstTime = true;
		var timesRequired = this.defn.timesCorrectPerQuestion;

		if (this.defn.isOrderRandomized)
		{
			var questionIndexNext = this.questionIndicesIncomplete.random();
			this.questionIndexCurrent = questionIndexNext;
		}

		while
		(
			isFirstTime
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

	questionCurrent()
	{
		var returnValue =
		(
			this.questionIndexCurrent == null
			? null
			: this.defn.questions[this.questionIndexCurrent]
		);

		return returnValue;
	}

	responseCorrect(responseRecord)
	{
		responseRecord.timesCorrect++;
		if (responseRecord.timesCorrect >= this.defn.timesCorrectPerQuestion)
		{
			this.questionIndicesIncomplete.remove(this.questionIndexCurrent);
		}
		this.statusMessage =
			"Correct!  The previous question has been answered correctly "
			+ responseRecord.timesCorrect
			+ " times in a row.  "
			+ this.questionIndicesIncomplete.length + " incomplete questions remain.";
	}

	responseExpected()
	{
		var questionCurrent = this.questionCurrent();
		var responseExpected =
		(
			this.defn.arePresentationAndResponseReversed == true
			? questionCurrent.presentation
			: questionCurrent.responseCorrect
		);

		return responseExpected;
	}

	responseIncorrect(responseRecord, responseExpected, responseActual)
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

	responsesIncorrectCount()
	{
		var returnValue = 0;

		for (var i = 0; i < this.responseRecords.length; i++)
		{
			var responseRecord = this.responseRecords[i];
			returnValue += responseRecord.timesIncorrect;
		}

		return returnValue;
	}

	responseRecordCurrent()
	{
		return this.responseRecords[this.questionIndexCurrent];
	}

}
