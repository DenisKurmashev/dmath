document.data.getData.onclick = (e) => {
  var fields = [
    Number (document.data.w.value),
    Number (document.data.h.value)
  ];

  for ( var i = 0; i < fields [1]; i++ ) {
    for ( var j = 0; j < fields [0]; j++ ) {
      document.graph.insertAdjacentHTML ("beforeEnd", "<input type=\"number\" x=\"" + (i + 1) + "\" y=\"" + (j + 1) + "\" class=\"item\">");
    }
    document.graph.insertAdjacentHTML ("beforeEnd", "<br />");
  }

  document.graph.insertAdjacentHTML ("beforeEnd", "<input type=\"button\" name=\"res\" value=\"Получить результат\" >");

  document.getElementById ("graph").insertAdjacentHTML ("beforeEnd", "<p>Результат: </p>");
  document.data.style.display = "none";

}

document.graph.res.onclick = () => {
  var fields = [];

  
}
