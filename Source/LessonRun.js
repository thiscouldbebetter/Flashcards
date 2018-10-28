
function LessonRun(defn)
{
	this.defn = defn;
	this.statusMessage =
		"Each question must be correctly answered "
		+ this.defn.timesCorrectPerQuestion
		+ " times in a row.";
}

{
	LessonRun.prototype.initialize = function()
	{
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
