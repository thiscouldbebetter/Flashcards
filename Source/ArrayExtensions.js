
function ArrayExtensions()
{
	// Array extensions.
}
{
	Array.prototype.random = function()
	{
		var indexRandom = Math.floor(Math.random() * this.length);
		var elementRandom = this[indexRandom];
		return elementRandom;
	}

	Array.prototype.remove = function(elementToRemove)
	{
		var indexToRemoveAt = this.indexOf(elementToRemove);
		if (indexToRemoveAt >= 0)
		{
			this.splice(indexToRemoveAt, 1);
		}
		return this;
	}
}
