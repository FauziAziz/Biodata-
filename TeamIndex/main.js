var SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

2

var NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g;

3

function htmlEncode(value) {

4

return value.

5

replace(/&/g, '&').

6

replace(SURROGATE_PAIR_REGEXP, function(value) {

7

var hi = value.charCodeAt(0);

8

var low = value.charCodeAt(1);

9

return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';

10

}).

11

replace(NON_ALPHANUMERIC_REGEXP, function(value) {

12

return '&#' + value.charCodeAt(0) + ';';

13

}).

14

replace(/</g, '<').

15

replace(/>/g, '>');

16

}

17

function getJsonFromUrlParams(paramsRaw) {

18

var result = {};

19

paramsRaw.split("&").forEach(function(part) {

20

var item = part.split("=");

21

result[item[0]] = decodeURIComponent(item[1]);

22

});

23

return result;

24

}

25

var downloadPoc = function(parameters, uri, method, encodingType){

26

var parsed = getJsonFromUrlParams(parameters)

27

var inputs = "<table>";

28

for(key in parsed){

29

inputs += "<tr><td>" + key + "</td><td><input type=\"text\" value=\"" + parsed[key] + "\"" + " name=\"" + encodeURIComponent(key) + "\"></td></tr>\r\n";

30

}

31

inputs += "</table>";

32

var poc = "<html><form enctype=\"" + encodingType + "\" method=\"" + method + "\" action=\"" + uri + "\">" + inputs + "<input type=\"submit\" value=\"" + uri + "\">" + "</form></html>";

33

var blob = new Blob([poc], {type: "text/plain;charset=utf-8"});

34

saveAs(blob, "csrfPoc.html");

35

}

36

var startDownload = function(){

37

var parameters = document.getElementById("body").value;

38

var uri = document.getElementById("URI").value;

39

var method = document.getElementById("method").value;

40

var encoding = document.getElementById("encoding").value;

41

downloadPoc(parameters, uri, method, encoding);

42

}

