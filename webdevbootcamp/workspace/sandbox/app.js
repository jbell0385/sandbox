var wysiwyg = require('wysiwyg');

var textArea = window.document.querySelector("#myText");

var editor = wysiwyg(textArea);

editor.selectAll()
editor.bold()
editor.color("#33aaee")
editor.bgcolor("#ffff00")

console.log(textArea);