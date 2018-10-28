
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
		this.questionIndexCurrent = 0;
		if (this.defn.isOrderRandomized == true)
		{
		  this.questionIndexCurrent = Math.floor
		  (
		    Math.random() * this.defn.questions.length
		  );  
		}
		this.responseRecords = [];

		var questions = this.defn.questions;

		for (var i = 0; i < questions.length; i++)
		{
			var question = questions[i];
			var responseRecord = new ResponseRecord();
			this.responseRecords.push(responseRecord);
		}
	}

	LessonRun.prototype.isComplete = function()
	{
		var returnValue = true;

		var timesRequired = this.defn.timesCorrectPerQuestion;

		for (var i = 0; i < this.responseRecords.length; i++)
		{
			var responseRecord = this.responseRecords[i];
			if (responseRecord.timesCorrect < timesRequired)
			{
				returnValue = false;
				break;
			}
		}	

		return returnValue;
	}

	LessonRun.prototype.questionAdvance = function()
	{
		var isFirstTime = true;
		var timesRequired = this.defn.timesCorrectPerQuestion;
		
		if (this.defn.isOrderRandomized == true)
		{
		  this.questionIndexCurrent = Math.floor
		  (
		    Math.random() * this.defn.questions.length
		  );
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
