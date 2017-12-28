function addFields ( element, className ) {
  var size = Number (element.size.value);
  var matrix = document.getElementsByClassName (className);

  if ( size >= 5 ) return;

  var obj = [];

  for ( var i = 0; i < matrix.length; i++ ) {
    if ( matrix [i].getAttribute ("y") == size ) {
      obj.push (matrix [i]);
    }
  }

  for ( var i = 0; i < size; i++ ) {
    if ( obj [i] === undefined ) break;
    obj [i].insertAdjacentHTML ("afterEnd", "<input type=\"number\" x=\"" + (i + 1) + "\" y=\"" + (size + 1) + "\" class=\"" + className + "\" value=\"0\">");
  }

  for ( var i = 0; i < size + 1; i++ ) {
    element.btnAdd.insertAdjacentHTML ("beforeBegin", "<input type=\"number\" x=\"" + (size + 1) + "\" y=\"" + (i + 1) + "\" class=\"" + className + "\"  value=\"0\">")
  }

  element.btnAdd.insertAdjacentHTML ("beforeBegin", "<br />");

  element.size.value = (size + 1).toString ();
} 

document.graphDataLeft.btnAdd.onclick = () => {
  addFields (document.graphDataLeft, "itemLeft")
}

document.graphDataRight.btnAdd.onclick = () => {
  addFields (document.graphDataRight, "itemRight")
}