

$(document).ready(function() {

	$("#t").dblclick(function(){
		$("#t").val("").focus();
	});
	$("#t").keyup(function(e){
		ontype();
		if(e.keyCode == 13 || e.keyCode == 10) {
			searchtxt($("#t").val());
		}
		if(e.keyCode == 110) {
			$("#t").val("").focus();
		}
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
});

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
if (what=="") {
	getDB();
	return false;
}
///Ext.Msg.alert(what);
var u = "bi12_TG/OEBPS/";

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

switch (qbk) {
case "genesis": case "ge": case "gen": u2 = "05_BI12_.GE"; break;
case "exodo": case "exo": case "ex": u2 = "06_BI12_.EX"; break;
case "levitico": case "lev": u2 = "07_BI12_.LE"; break;
case "bilang": case "bil": u2 = "08_BI12_.NU"; break;
case "deuteronomio": case "deu": u2 = "09_BI12_.DE"; break;
case "josue": case "jos": u2 = "10_BI12_.JOS"; break;
case "hukom": case "huk": u2 = "11_BI12_.JG"; break;
case "ruth": case "ru": u2 = "12_BI12_.RU"; break;
case "1samuel": case "1sa": case "1sam": u2 = "13_BI12_.1SA"; break;
case "2samuel": case "2sa": case "2sam": u2 = "14_BI12_.2SA"; break;
case "1hari": case "1ha": case "1hari": u2 = "15_BI12_.1KI"; break;
case "2hari": case "2ha": case "2hari": u2 = "16_BI12_.2KI"; break;
case "1cronica": case "1cr": case "1cro": u2 = "17_BI12_.1CH"; break;
case "2cronica": case "2cr": case "2cro": u2 = "18_BI12_.2CH"; break;
case "ezra": case "ezr": u2 = "19_BI12_.EZR"; break;
case "nehemias": case "ne": u2 = "20_BI12_.NE"; break;
case "esther": case "es": u2 = "21_BI12_.ES"; break;
case "job": case "job": u2 = "22_BI12_.JOB"; break;
case "awit": case "aw": case "awit": u2 = "23_BI12_.PS"; break;
case "kawikaan": case "kaw": u2 = "24_BI12_.PR"; break;
case "eclesiastes": case "ec": u2 = "25_BI12_.EC"; break;
case "solomon": case "sol": u2 = "26_BI12_.CA"; break;
case "isaias": case "isa": u2 = "27_BI12_.ISA"; break;
case "jeremias": case "jer": u2 = "28_BI12_.JER"; break;
case "panaghoy": case "pan": u2 = "29_BI12_.LA"; break;
case "ezekiel": case "eze": u2 = "30_BI12_.EZE"; break;
case "daniel": case "dan": u2 = "31_BI12_.DA"; break;
case "oseas": case "os": u2 = "32_BI12_.HOS"; break;
case "joel": case "joe": case "joel": u2 = "33_BI12_.JOE"; break;
case "amos": case "am": case "amos": u2 = "34_BI12_.AM"; break;
case "obadias": case "ob": u2 = "35_BI12_.OB"; break;
case "jonas": case "jon": u2 = "36_BI12_.JON"; break;
case "mikas": case "mik": u2 = "37_BI12_.MIC"; break;
case "nahum": case "na": u2 = "38_BI12_.NAH"; break;
case "habakuk": case "hab": u2 = "39_BI12_.HAB"; break;
case "zefanias": case "zef": u2 = "40_BI12_.ZEP"; break;
case "hagai": case "hag": u2 = "41_BI12_.HAG"; break;
case "zacarias": case "zac": u2 = "42_BI12_.ZEC"; break;
case "malakias": case "mal": u2 = "43_BI12_.MAL"; break;
case "mateo": case "mat": u2 = "44_BI12_.MT"; break;
case "marcos": case "mar": u2 = "45_BI12_.MR"; break;
case "lucas": case "luc": u2 = "46_BI12_.LU"; break;
case "juan": case "ju": u2 = "47_BI12_.JOH"; break;
case "gawa": case "gaw": case "gawa": u2 = "48_BI12_.AC"; break;
case "roma": case "ro": case "roma": u2 = "49_BI12_.RO"; break;
case "1corinto": case "1co": case "1cor": u2 = "50_BI12_.1CO"; break;
case "2corinto": case "2co": case "2cor": u2 = "51_BI12_.2CO"; break;
case "galacia": case "gal": u2 = "52_BI12_.GA"; break;
case "efeso": case "efe": u2 = "53_BI12_.EPH"; break;
case "filipos": case "fil": u2 = "54_BI12_.PHP"; break;
case "colosas": case "col": u2 = "55_BI12_.COL"; break;
case "1tesalonica": case "1te": case "1tes": u2 = "56_BI12_.1TH"; break;
case "2tesalonica": case "2te": case "2tes": u2 = "57_BI12_.2TH"; break;
case "1timoteo": case "1ti": case "1tim": u2 = "58_BI12_.1TI"; break;
case "2timoteo": case "2ti": case "2tim": u2 = "59_BI12_.2TI"; break;
case "tito": case "tit": u2 = "60_BI12_.TIT"; break;
case "filemon": case "flm": u2 = "61_BI12_.PHM"; break;
case "hebreo": case "heb": u2 = "62_BI12_.HEB"; break;
case "santiago": case "san": u2 = "63_BI12_.JAS"; break;
case "1pedro": case "1pe": case "1ped": u2 = "64_BI12_.1PE"; break;
case "2pedro": case "2pe": case "2ped": u2 = "65_BI12_.2PE"; break;
case "1juan": case "1ju": u2 = "66_BI12_.1JO"; break;
case "2juan": case "2ju": u2 = "67_BI12_.2JO"; break;
case "3juan": case "3ju": u2 = "68_BI12_.3JO"; break;
case "judas": case "jud": u2 = "69_BI12_.JUD"; break;
case "apocalipsis": case "apo": case "apoc": u2 = "70_BI12_.RE"; break;
}

if (qch == 1) {
	u2 += ".htm#chapter" + qch + "_verse" + qve;
}
else {
	if (what.indexOf(":") == -1) {
		u2 += ".htm#chapter" + qch + "_verse" + qve;
	}
	else {
		u2 += "-split" + qch + ".htm#chapter" + qch + "_verse" + qve;
	}
}

/// var result = "foo baz".splice(4, 0, "bar "); /// foor bar baz
String.prototype.splice = function(idx, rem, str) {
	return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

$("#q").html("Loading...");
$.get(u+u2, function(data){
	///console.log(1);
}).done(function(data) {
	///console.log(2);
	///var qq = $(data).find("body").html();
	var qq = data.toString();
	var qqq = qq.split("<body>");
	qq = qqq[1];
	qqq = qq.split("</body>");
	qq = qqq[0];
	///console.log(qq);
	//alert(qq);

	$("#q").html(qq);
	$("#q a[id^='page']").remove();
	$(".ss").remove();
	var tmp2 = rangeExpand(qves);
	tmp2.forEach(function(iii) {
		hilyt(eval(qch),eval(iii));
	});
	$("sup").click(function() {
		$(this).toggleClass("hilyt2");
	});
	$(".w_ch>b").click(function() {
		$(this).toggleClass("hilyt2");
	});
	location.replace("#chapter" + eval(qch) + "_verse" + eval(qve));
});


$("#qtitle").html("<b>" + qtitle + "</b><hr>");


var d = new Date();
var dt = "";
dt = d.toISOString();
$.jStorage.set(dt, qtitle);


/// searchtxt }
}


function hilyt(c,v,bg) {
	bg = (typeof bg === 'undefined') ? '' : bg;
	/// <a id="chapter1_verse9"></a>
	$("a#chapter" + c + "_verse" + v).next().find("sup").addClass("hilyt");
	$("a#chapter" + c + "_verse" + v).next().find("b").addClass("hilyt");
	var q = $("#q").html();
	var s = q.indexOf('chapter' + c + '_verse' + v + '">');
	if (s==-1) return false;
	var s1 = q.indexOf('</span>', s);
	if (s1<1) {
		s1 = q.indexOf('</b>', s);
		q = q.splice(s1+4,0,"[[[");
	}
	else {
		s1 = q.indexOf('</span>', s);
		q = q.splice(s1+7,0,"[[[");
	}
	var s2 = q.indexOf('<', s1+8);
	q = q.splice(s2,0,"]]]");
	var s9 = 0;
	var s3 = 0;
	for (i=1;i<=5;i++) {
		s9 = q.indexOf('chapter' + c + '_verse' + (v+1) + '">');
		s3 = q.indexOf('class="sp"', s2);
		//L(c+":"+v+" = "+s3+","+s9);
		if ((s3>0 && s3<s9) || (s3>0 && s9==-1)) {
			//L(c+":"+v+" = " + q.substring(s3+11,s3+25));
			q = q.splice(s3+11,0,"[[[");
			s2 = q.indexOf('<', s3+11);
			q = q.splice(s2,0,"]]]");
			s2 = s3+11;
		}
	}
	//L("--");
	var s2 = q.indexOf('<', s1+8);
	for (i=1;i<=5;i++) {
		s9 = q.indexOf('chapter' + c + '_verse' + (v+1) + '">');
		s3 = q.indexOf('class="sz"', s2);
		//L(c+":"+v+" = "+s3+","+s9);
		if ((s3>0 && s3<s9) || (s3>0 && s9==-1)) {
			//L(c+":"+v+" = " + q.substring(s3+11,s3+25));
			q = q.splice(s3+11,0,"[[[");
			s2 = q.indexOf('<', s3+11);
			q = q.splice(s2,0,"]]]");
			s2 = s3+11;
		}
	}
	//L("==");
	q = q.replace(/ \]\]\]/g,"]]]");
	q = q.replace(/\[\[\[\[\[\[/g,"[[[");
	q = q.replace(/\]\]\]\]\]\]/g,"]]]");
	q = q.replace(/\[\[\[/g,"<u>");
	q = q.replace(/\]\]\]/g,"</u> ");
	if (bg === '') $("#q").html(q);
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
		$("#q").append("<a class='a' href='#' onclick='$(\"#t\").val(\"" + $.jStorage.get(value) + "\");searchtxt(\"" + $.jStorage.get(value) + "\");'>" + $.jStorage.get(value) + "</a> ");
	});
	$("#q").append("<a class='a f' href='#' onclick='$.jStorage.flush();$(\"#q\").html(\"\");'>CLEAR</a>");
}



function show(what) {
	$("#t").val(what);
	searchtxt($("#t").val());
}



function L(what) {
	console.log(what);
}
