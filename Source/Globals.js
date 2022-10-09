
class Globals
{
	static Instance()
	{
		if (Globals._instance == null)
		{
			Globals._instance = new Globals();
		}
		return Globals._instance;
	}

	initialize(lessonDefn)
	{
		this.lessonDefn = lessonDefn;

		this.lessonRun = new LessonRun(this.lessonDefn);

		this.display = new Display();
		this.inputHelper = new InputHelper();

		this.lessonRun.initialize();

		this.inputHelper.initialize();

		this.display.displayLessonRun(this.lessonRun);
	}
}
