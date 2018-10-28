
function inputLessonFile_Changed_FileLoaded(event)
{
	var fileContents = event.target.result;  
  var textareaLesson = document.getElementById("textareaLesson");
	textareaLesson.value = fileContents;
}
