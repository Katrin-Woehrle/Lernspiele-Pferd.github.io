function init()
{
	window.document.body.height = getClientHeight();
}


function getBrowser()
   	{
		if (navigator.appName == "Netscape")
			return "FF";
		if (navigator.appName == "Microsoft Internet Explorer")
			return "IE";
    }

function getClientWidth()
	{
	    var browser = getBrowser();
	    	if (browser == "IE")
	    		{
				    return window.document.body.clientWidth;
				}
		    if (browser == "FF")
		    	{
					return window.innerWidth;
				}
	}

function getClientHeight()
	{
	    var browser = getBrowser();
	    	if (browser == "IE")
	    		{
			    	return window.document.body.clientHeight;
				}
			if (browser == "FF")
				{
					return window.innerHeight;
				}
	}
