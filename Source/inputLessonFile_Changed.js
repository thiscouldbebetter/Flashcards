
function inputLessonFile_Changed(event)
{
	var inputLessonFile = event.target;
	var file = inputLessonFile.files[0];
	
	if (file == null)
	{
		alert("A valid lesson file must be specified by clicking the Lesson File button.");
	}
	else
	{
		var fileReader = new FileReader();
		fileReader.onload = inputLessonFile_Changed_FileLoaded;
		fileReader.readAsText(file);
	}
}
