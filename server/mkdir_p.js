var fs = require('fs');
var home = {};
home.mkdir_p = function (path, mode, callback, position) {
	mode = mode || 0777;
	position = position || 0;
	parts = require('path').normalize(path).split('/');
	 
	if (position >= parts.length) 
	{
		if (callback) {
		return callback();
		} else {
		return true;
		}
	}
 
	var directory = parts.slice(0, position + 1).join('/');
	fs.stat(directory, function(err)
	 {
		if (err === null)
		 {
		home.mkdir_p(path, mode, callback, position + 1);
		} 
		else
		{
			fs.mkdir(directory, mode, function (err) 
			{
				if (err)
				{
					if (callback) 
					{
						return callback(err);
					} 
					else 
					{
						throw err;
					}
				} 
				else 
				{
					home.mkdir_p(path, mode, callback, position + 1);
				}
			})
		}
	})
}
module.exports = home;