var isWhite ="";
if (window.location.href.indexOf("white")>0) isWhite = "white&";

var justclick = 0;
var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;
	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};


$(document).ready(function() {

	$("#t").dblclick(function(){
		$("#t").val("").focus();
	});
	$("#t").keyup(function(e){
		ontype();
		if(e.keyCode == 13 || e.keyCode == 10) {
			searchtxt($("#t").val());
		}
	});
	$("#qtitle").click(function() {
		if ($("#qtitle b").html() != "" && $("#t").val() == "") searchtxt($("#qtitle b").html());
	});
	$("#t").change(function(e){
		ontype();
	});
	$("#b").click(function(){
		if ($("#t").val() == "") {
			getDB();
		}
		else {
			searchtxt($("#t").val());
		}
	});
	$("#frm").submit(function( event ) {
		///searchtxt($("#t").val());
		event.preventDefault();
	});
	$("#qtop").click(function(){
		window.scrollTo(0, 0);
		$("#t").val("").focus();
	});

	$("#t").val("").focus();

	$("#qtop").html("");

	if (isDefined(getUrlParameter("txt"))) {
		$("#t").val(urlDec(getUrlParameter("txt")));
		$("#b").trigger("click");
	}

	/// 1 Ha 8:47-49,52   Gen 1:2,5-6,8,10   1 Cro 1:1-3   Ex 15:17,19   Aw 112:2-3   Mar 12:37
});

function isDefined(x) {
	var undefined;
	return x !== undefined;
}

function isTextNode(){
	return( this.nodeType === 3 );
}

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

String.prototype.splice = function( idx, rem, s ) {
	return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

function ontype() {
	var q = $("#t").val();
	if (q==" ") { $("#t").val(""); q = ""; }
	if (q.indexOf(".")>0) {
		$("#t").val("");
		return false;
	}
	var lastchar = q.charAt(q.length-1);
	var beforelastchar = q.charAt(q.length-2);
	q = q.replace("  ", " ");
	q = q.replace("  ", " ");
	var q2 = q;
	if (isNumeric(beforelastchar) && lastchar == " " && q2.indexOf(" ")>0 && q2.indexOf(":")<1 && q2.length>2) {
		q2 = q2.substring(0, q2.length - 1) + ":";
	}
	else if (isNumeric(beforelastchar) && lastchar == " " && q2.indexOf(" ")>0 && q2.indexOf(":")>1 && q2.length>2) {
		q2 = q2.substring(0, q2.length - 1) + "-";
	}
	var lastchars = q.charAt(q.length-2) + q.charAt(q.length-1);
	if (lastchars=="- ") {
		q2 = q2.substring(0, q2.length - 2) + ",";
	}
	else if (lastchars==", ") {
		q2 = q2.substring(0, q2.length - 2) + "-";
	}
	if (isNumeric(lastchar) && beforelastchar!=" " && !isNumeric(beforelastchar) && q2.length>1 && lastchar!=":" && lastchar!="," && lastchar!="-") {
		q2 = q2.splice(q2.length-1,0," ");
	}
	if (!isNumeric(lastchar) && isNumeric(beforelastchar) & q2.length>1 && lastchar!=":" && lastchar!="," && lastchar!="-") {
		q2 = q2.splice(q2.length-1,0," ");
	}
	q2 = q2.replace(";", ":");
	q2 = q2.replace(/: /g, ":");
	q2 = q2.replace(/ :/g, ":");
	q2 = q2.replace(/ ,/g, ",");
	q2 = q2.replace(/, /g, ",");
	q2 = q2.replace(/ -/g, "-");
	q2 = q2.replace(/- /g, "-");
	q2 = toTitleCase(q2);
	$("#t").val(q2);
}

function searchtxt(what) {
	L("searchtxt:");
	L(what);
	if (what=="") {
		getDB();
		return false;
	}
	///Ext.Msg.alert(what);
	var u = "nwt_TG/OEBPS/";

	if (!isDefined(what)) return false;

	what = what.replace(": ", ":");
	what = what.replace(/: /g, ":");
	what = what.replace(/, /g, ",");
	what = what.replace(/- /g, "-");
	what = what.replace(/ :/g, ":");
	what = what.replace(/ ,/g, ",");
	what = what.replace(/ -/g, "-");
	what = what.replace(/  /g, " ");
	var q = what.split(" ");
	if (q.length === 2) {
		var qpt = "0";
		var qtitle = toTitleCase(q[0]);
		var qbk = q[0];
		var qchve = q[1].split(":");
	}
	if (q.length === 3) {
		var qpt = q[0];
		var qtitle = qpt + " " + toTitleCase(q[1]);
		var qbk = "" + qpt + "" + q[1];
		var qchve = q[2].split(":");
	}
	var qch = qchve[0];
	var qve = qchve[1];
	var qves = "";
	if (what.indexOf(":") == -1) {
		qtitle += " " + qchve[0];
		qch = 1;
		qve = qchve[0];
		qves = qchve[0];
	}
	else {
		qtitle += " " + qchve[0] + ":" + qchve[1];
		qves = qve;
	}
	if (qve.indexOf(",") > 0) { tmp = qve.split(","); qve = tmp[0]; }
	if (qve.indexOf("-") > 0) { tmp = qve.split("-"); qve = tmp[0]; }
	qbk = qbk.toLowerCase();


	///alert("qpt:" + qpt);
	///alert("qbk:" + qbk);
	///alert("qchve:" + qchve);
	///alert("qch:" + qch);
	///alert("qve:" + qve);

	var u2 = "";
	var uu = "";
	switch (qbk) {
		case "genesis": case "ge": case "gen": u2 = "1001061105"; uu = ""; break;
		case "exodo": case "exo": case "ex": u2 = "1001061106"; uu = ""; break;
		case "levitico": case "lev": u2 = "1001061107"; uu = ""; break;
		case "bilang": case "bil": u2 = "1001061108"; uu = ""; break;
		case "deuteronomio": case "deu": case "deut": u2 = "1001061109"; uu = ""; break;
		case "josue": case "jos": u2 = "1001061110"; uu = ""; break;
		case "hukom": case "huk": u2 = "1001061111"; uu = ""; break;
		case "ruth": case "ru": u2 = "1001061112"; uu = ""; break;
		case "1samuel": case "1sa": case "1sam": u2 = "1001061113"; uu = ""; break;
		case "2samuel": case "2sa": case "2sam": u2 = "1001061114"; uu = ""; break;
		case "1hari": case "1ha": case "1hari": u2 = "1001061115"; uu = ""; break;
		case "2hari": case "2ha": case "2hari": u2 = "1001061116"; uu = ""; break;
		case "1cronica": case "1cr": case "1cro": u2 = "1001061117"; uu = ""; break;
		case "2cronica": case "2cr": case "2cro": u2 = "1001061118"; uu = ""; break;
		case "ezra": case "ezr": u2 = "1001061119"; uu = ""; break;
		case "nehemias": case "ne": u2 = "1001061120"; uu = ""; break;
		case "esther": case "es": u2 = "1001061121"; uu = ""; break;
		case "job": case "job": u2 = "1001061122"; uu = ""; break;
		case "awit": case "aw": case "awit": u2 = "1001061123"; uu = ""; break;
		case "kawikaan": case "kaw": u2 = "1001061124"; uu = ""; break;
		case "eclesiastes": case "ec": u2 = "1001061125"; uu = ""; break;
		case "solomon": case "sol": u2 = "1001061126"; uu = ""; break;
		case "isaias": case "isa": u2 = "1001061127"; uu = ""; break;
		case "jeremias": case "jer": u2 = "1001061128"; uu = ""; break;
		case "panaghoy": case "pan": u2 = "1001061129"; uu = ""; break;
		case "ezekiel": case "eze": u2 = "1001061130"; uu = ""; break;
		case "daniel": case "dan": u2 = "1001061131"; uu = ""; break;
		case "oseas": case "os": u2 = "1001061132"; uu = ""; break;
		case "joel": case "joe": case "joel": u2 = "1001061133"; uu = ""; break;
		case "amos": case "am": case "amos": u2 = "1001061134"; uu = ""; break;
		case "obadias": case "ob": u2 = "1001061135"; uu = ""; break;
		case "jonas": case "jon": u2 = "1001061136"; uu = ""; break;
		case "mikas": case "mik": u2 = "1001061137"; uu = ""; break;
		case "nahum": case "na": u2 = "1001061138"; uu = ""; break;
		case "habakuk": case "hab": u2 = "1001061139"; uu = ""; break;
		case "zefanias": case "zef": u2 = "1001061140"; uu = ""; break;
		case "hagai": case "hag": u2 = "1001061141"; uu = ""; break;
		case "zacarias": case "zac": u2 = "1001061142"; uu = ""; break;
		case "malakias": case "mal": u2 = "1001061143"; uu = ""; break;
		case "mateo": case "mat": u2 = "1001061144"; uu = ""; break;
		case "marcos": case "mar": u2 = "1001061145"; uu = ""; break;
		case "lucas": case "luc": u2 = "1001061146"; uu = ""; break;
		case "juan": case "ju": u2 = "1001061147"; uu = ""; break;
		case "gawa": case "gaw": case "gawa": u2 = "1001061148"; uu = ""; break;
		case "roma": case "ro": case "roma": u2 = "1001061149"; uu = ""; break;
		case "1corinto": case "1co": case "1cor": u2 = "1001061150"; uu = ""; break;
		case "2corinto": case "2co": case "2cor": u2 = "1001061151"; uu = ""; break;
		case "galacia": case "gal": u2 = "1001061152"; uu = ""; break;
		case "efeso": case "efe": u2 = "1001061153"; uu = ""; break;
		case "filipos": case "fil": u2 = "1001061154"; uu = ""; break;
		case "colosas": case "col": u2 = "1001061155"; uu = ""; break;
		case "1tesalonica": case "1te": case "1tes": u2 = "1001061156"; uu = ""; break;
		case "2tesalonica": case "2te": case "2tes": u2 = "1001061157"; uu = ""; break;
		case "1timoteo": case "1ti": case "1tim": u2 = "1001061158"; uu = ""; break;
		case "2timoteo": case "2ti": case "2tim": u2 = "1001061159"; uu = ""; break;
		case "tito": case "tit": u2 = "1001061160"; uu = ""; break;
		case "filemon": case "flm": u2 = "1001061161"; uu = ""; break;
		case "hebreo": case "heb": u2 = "1001061162"; uu = ""; break;
		case "santiago": case "san": u2 = "1001061163"; uu = ""; break;
		case "1pedro": case "1pe": case "1ped": u2 = "1001061164"; uu = ""; break;
		case "2pedro": case "2pe": case "2ped": u2 = "1001061165"; uu = ""; break;
		case "1juan": case "1ju": u2 = "1001061166"; uu = ""; break;
		case "2juan": case "2ju": u2 = "1001061167"; uu = ""; break;
		case "3juan": case "3ju": u2 = "1001061168"; uu = ""; break;
		case "judas": case "jud": u2 = "1001061169"; uu = ""; break;
		case "apocalipsis": case "apo": case "apoc":  u2 = "1001061170"; uu = ""; break;
	}

	//nwt_TG/OEBPS/1001061109-split23.xhtml
	if (qch == 1) {
		u2 += "" + ".htm#chapter" + qch + "_verse" + qve;
	}
	else {
		if (what.indexOf(":") == -1) {
			u2 += "" + ".htm#chapter" + qch + "_verse" + qve;
		}
		else {
			u2 += "-split" + qch + ".htm#chapter" + qch + "_verse" + qve;
		}
	}

	/// var result = "foo baz".splice(4, 0, "bar "); /// foor bar baz
	String.prototype.splice = function(idx, rem, str) {
		return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
	};

	L("u: " + u);
	L("u2: " + u2);

	$("#q").html("Loading...");
	$.get(u+u2, function(data){
		///console.log(1);
	}).done(function(data) {
		///console.log(2);
		///var qq = $(data).find("body").html();
		var qq = data.toString();
		var qqq = qq.split("<body ");
		qq = qqq[1];
		qqq = qq.split("</body>");
		qq = qqq[0].substr(44,999999);
		// console.log(qq);
		//alert(qq);

		$("#q").html(qq);
		$("#q a[id^='page']").remove();
		$(".ss").remove();
		var tmp2 = rangeExpand(qves);
		tmp2.forEach(function(iii) {
			hilyt(eval(qch),eval(iii));
		});

		$("sup").click(function() {
			var tmpt = $("#t").val();
			if (tmpt == "") { $("#t").val($("#qtitle>b").html()); tmpt = $("#qtitle>b").html(); }
			$("#t").val(tmpt.replace(":,",':'));
			$("#t").val(tmpt + "," + parseInt($(this).html()));
			justclick = parseInt($(this).html());
			L("justclick = " + justclick);
			searchtxt($("#t").val());
		});

		$(".w_ch>strong").click(function() {
			var tmpt = $("#t").val();
			if (tmpt == "") { $("#t").val($("#qtitle>b").html()); tmpt = $("#qtitle>b").html(); }
			$("#t").val(tmpt.replace(":,",':'));
			$("#t").val(tmpt + "," + parseInt(1));
			justclick = parseInt(1);
			searchtxt($("#t").val());
		});


		qq = $("u").text();
		localStorage.setItem("bt~" + urlEnc($("#t").val()), qq);


		L(urlEnc($("#t").val()));

		if (qve!="") {
			L(1);
			L("2 justclick = " + justclick);
			if (justclick != 0) {
				location.replace("?" + isWhite + "#chapter" + eval(qch) + "_verse" + justclick);
				window.history.pushState({},"", "?" + isWhite + "txt=" + urlEnc($("#t").val()) + (isDefined(getUrlParameter("sync")) ? "&sync" : "") + "#chapter" + eval(qch) + "_verse" + justclick);
				L("loc = " + "#chapter" + eval(qch) + "_verse" + justclick);
				justclick = 0;
				L("aa");
			}
			else {
				location.replace("?" + isWhite + "txt=" + urlEnc($("#t").val()) + (isDefined(getUrlParameter("sync")) ? "&sync" : "") +  "#chapter" + eval(qch) + "_verse" + eval(qve));
				window.history.pushState({},"", "?" + isWhite + "txt=" + urlEnc($("#t").val()) + (isDefined(getUrlParameter("sync")) ? "&sync" : "") + "#chapter" + eval(qch) + "_verse" + eval(qve));
				L("bb");
			}
			
		}
		else {
			L(2, qch);
			L(("#chapter" + eval(qch)));
			if (justclick == 1) {
				justclick = 0;
				L("cc");
			}
			else {
				location.replace("?" + isWhite + "#chapter" + eval(qch));
				L("dd");
			}
			window.history.pushState({},"", "?" + isWhite + "txt=" + urlEnc($("#t").val()) + (isDefined(getUrlParameter("sync")) ? "&sync" : "") + "#chapter" + eval(qch));
		}

	});


	qtitle = qtitle.replace(/\,/g,", ");
	$("#qtitle").html("<b>" + dash2comma(qtitle) + "</b><hr>");


	var d = new Date();
	var dt = "";
	dt = d.toISOString();
	$.jStorage.set(dt, qtitle);

}

function dash2comma(what) {
	what2 = "";
	what2 = what;
	var tmp = what.split(":");
	var tmp = tmp[1];
	var tmp = tmp.split("-");
	if (tmp.length!=2) return what2;
	if (parseInt(tmp[0])+1 != parseInt(tmp[1])) return what2;
	return what2.replace(/-/g,",");
}




function hilyt(c,v,bg) {
	bg = (typeof bg === 'undefined') ? '' : bg;
	$("[id^='footnotesource']").remove();
	$("[href^='#footnote']").remove();
	$(".pageNum").remove();
	var q = $("#q").html();
	s1 = q.indexOf('<span id="chapter' + c + '_verse' + v + '">');
	q = q.splice(s1,0,"[[[");
	s2 = q.indexOf("<span",q.indexOf("</strong>",s1+9));
	q = q.splice(s2,0,"]]]");
	q = q.replace(/\[\[\[/g,"<u>");
	q = q.replace(/\]\]\]/g,"</u> ");
	$("#q").html(q);
	$("#chapter" + c + "_verse" + v).next().find("sup").addClass("hilyt");
	$("#chapter" + c + "_verse" + v).next(".w_ch").find("strong").addClass("hilyt");
	$("u>p").addClass("u");
	$("u p.sz.u").each(function() {
		$(this).html("<u>" + $(this).html() + "</u>");
	});
	
}





function insertAt(strBig, strSmall, strAt) {
	return [strBig.slice(0, strAt), strSmall, strBig.slice(strAt)].join('');
}



function getTimestamp(str) {
	var d = str.match(/\d+/g); // extract date parts
	return +new Date(d[0], d[1] - 1, d[2], d[3], d[4], d[5]); // build Date object
}

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function rangeExpand(what) {
	var tmpall=new Array();
	var tmp0 = what.split(",");
	var ii = 0;
	tmp0.forEach(function(i) {
		if (i.indexOf("-")>0) {
			tmp1 = i.split("-");
			for (ii=parseInt(tmp1[0]);ii<=parseInt(tmp1[1]);ii++) {
				tmpall.push(ii);
			}
		}
		else {
			tmpall.push(i);
		}
	});	
	return tmpall;
}

function implode (glue, pieces) {
  // From: http://phpjs.org/functions
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Waldo Malqui Silva
  // +   improved by: Itsacon (http://www.itsacon.net/)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
  // *     returns 1: 'Kevin van Zonneveld'
  // *     example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
  // *     returns 2: 'Kevin van Zonneveld'
  var i = '',
	retVal = '',
	tGlue = '';
  if (arguments.length === 1) {
	pieces = glue;
	glue = '';
  }
  if (typeof pieces === 'object') {
	if (Object.prototype.toString.call(pieces) === '[object Array]') {
	  return pieces.join(glue);
	}
	for (i in pieces) {
	  retVal += tGlue + pieces[i];
	  tGlue = glue;
	}
	return retVal;
  }
  return pieces;
}

var range = function(start, end, step) {
	var range = [];
	var typeofStart = typeof start;
	var typeofEnd = typeof end;

	if (step === 0) {
		throw TypeError("Step cannot be zero.");
	}

	if (typeofStart == "undefined" || typeofEnd == "undefined") {
		throw TypeError("Must pass start and end arguments.");
	} else if (typeofStart != typeofEnd) {
		throw TypeError("Start and end arguments must be of same type.");
	}

	typeof step == "undefined" && (step = 1);

	if (end < start) {
		step = -step;
	}

	if (typeofStart == "number") {

		while (step > 0 ? end >= start : end <= start) {
			range.push(start);
			start += step;
		}

	} else if (typeofStart == "string") {

		if (start.length != 1 || end.length != 1) {
			throw TypeError("Only strings with one character are supported.");
		}

		start = start.charCodeAt(0);
		end = end.charCodeAt(0);

		while (step > 0 ? end >= start : end <= start) {
			range.push(String.fromCharCode(start));
			start += step;
		}

	} else {
		throw TypeError("Only string and number types are supported");
	}

	return range;

}



function getDB() {
	var dbSize = ($.jStorage.storageSize()/1024);
	dbSize = dbSize + "Kb";
	var index = $.jStorage.index();
	$("#qtitle").html("");
	$("#q").html("");
	$.each(index, function( key, value ) {
		$("#q").append("<a class='a a1' href='#' onclick='$(\"#t\").val(\"" + $.jStorage.get(value) + "\");searchtxt(\"" + $.jStorage.get(value) + "\");'>" + $.jStorage.get(value) + "</a><a class='a a2' href='#' onclick='getTxt(this,\"" + $.jStorage.get(value) + "\");return false;'>&#x1F50D;</a> ");
	});
	$("#q").append("<a class='a f' href='#' onclick='$.jStorage.flush();$(\"#q\").html(\"\");'>CLEAR</a>");
}



function show(what) {
	$("#t").val(what);
	searchtxt($("#t").val());
}



function L(what) {
	// return false;
	console.log(what);
}




function urlEnc(what) {
	what = what.replace(/ /g, "_");
	return what;
}

function urlDec(what) {
	what = what.replace(/_/g, " ");
	return what;
}

function getTxt(which,what) {
	L(what);
	if (localStorage.getItem("bt~" + urlEnc(what)) != "") {
		$(which).prev().removeClass("a1");
		$(which).after("<div class='histtxt'><u>" + what + "</u> <i>" + localStorage.getItem("bt~" + urlEnc(what)) + "</i></div>");
		$(which).remove();
	}
}



