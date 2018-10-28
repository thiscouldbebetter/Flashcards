function buttonLessonShowHide_Clicked()
{
  var textareaLesson = document.getElementById("textareaLesson");
  if (textareaLesson.style.display == "none")
  {
    textareaLesson.style.display = "inline";
  }
  else 
  {
    textareaLesson.style.display = "none";  
  }
}
