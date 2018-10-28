
function Globals()
{
	// do nothing
}

{
	// instance

	Globals.Instance = new Globals();

	// methods

	Globals.prototype.initialize = function(lessonDefn)
	{
		this.lessonDefn = lessonDefn;

		this.lessonRun = new LessonRun(this.lessonDefn);

		this.displayHelper = new DisplayHelper();
		this.inputHelper = new InputHelper();

		this.lessonRun.initialize();

		this.inputHelper.initialize();

		this.displayHelper.displayLessonRun(this.lessonRun);
	}
}
