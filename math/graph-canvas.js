function draw( element, canvasId, matrixItemClass ) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext("2d");
    var maxWidth = canvas.width - 50;
    var maxHeight = canvas.height - 50;
    var countCircle = element.size.value;
    context.clearRect(0, 0, canvas.width, canvas.height);

    var arrPosition = new Array();
    var rowsX = countCircle;
    var columsY = rowsX;
    for (var i = 0; i < rowsX; i++) {
      arrPosition[i] = new Array();
    }
    var j2 = 0;

    for (var i = 0; i < countCircle; i++) {
      context.beginPath();
      var positionX = Math.floor(Math.random() * (maxWidth - 50 + 1)) + 50;
      var positionY = Math.floor(Math.random() * (maxHeight - 50 + 1)) + 50;
      context.arc(positionX, positionY, 25, 0, Math.PI*2);

      for (var j = 0; j < 2; j++) {
        if (j == 0) { arrPosition[i][j] = positionX; }
        if (j == 1) { arrPosition[i][j] = positionY; }
      }

      context.strokeStyle = "red";
      context.lineWidth = 3;

      context.font = "bold 25px sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(i + 1, positionX, positionY);
      context.stroke();
    }


    var arr = new Array();
    var rows = countCircle * countCircle;
    var colums = 2;

    var matrix = document.getElementsByClassName (matrixItemClass);

    for (var i = 0; i < 9; i++) {
      arr[i] = new Array();
      for (var j = 0; j < 2; j++) {
        if(j == 0){arr[i][j] = matrix[i].getAttribute("x");}
        else{arr[i][j] = matrix[i].getAttribute("y");}        
      }
    }

    for (var i = 0; i < rows; i++) {
      var j = 0;
      if(matrix[i].value == 1){
        var from = matrix[i].getAttribute("x");//1
        var to = matrix[i].getAttribute("y");//2
        from--;
        to--;
        context.beginPath();
        context.moveTo(arrPosition[from][j], arrPosition[from][j+1]);
        context.lineTo(arrPosition[to][j], arrPosition[to][j+1]);
        
        //draw arrow
        var headlen = 20;
        var angle = Math.atan2(arrPosition[to][j+1]-arrPosition[from][j+1],arrPosition[to][j]-arrPosition[from][j]);
        context.lineTo(arrPosition[to][j]-headlen*Math.cos(angle-Math.PI/6),arrPosition[to][j+1]-headlen*Math.sin(angle-Math.PI/6));
        context.moveTo(arrPosition[to][j], arrPosition[to][j+1]);
        context.lineTo(arrPosition[to][j]-headlen*Math.cos(angle+Math.PI/6),arrPosition[to][j+1]-headlen*Math.sin(angle+Math.PI/6));
        context.strokeStyle = "#5F4B8B";
        context.stroke();            
      }
      else{
        continue;
      }
    }
}

document.graphDataLeft.getResult.onclick = () => {
    draw (document.graphDataLeft, 'canvasLeft', 'itemLeft');
}