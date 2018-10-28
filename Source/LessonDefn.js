
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
  	var questionsAsStrings = lessonFileContents.split("\n");
  
  	var questions = [];
  
  	for (var i = 0; i < questionsAsStrings.length; i++)
  	{
  		var questionAsString = questionsAsStrings[i].trim();
  		
  		if (questionAsString.length > 0)
  		{
    		var presentationAndResponse = questionAsString.split(";");
    
        if (presentationAndResponse.length >= 2)
        {
      		var presentation = presentationAndResponse[0];
      		var response = presentationAndResponse[1].trim();
      
      		var question = new Question(presentation, response);
      
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
