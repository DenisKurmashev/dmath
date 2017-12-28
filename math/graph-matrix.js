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

function print ( arr, id, className ) {
	document.getElementById (id).remove ();
	if ( id === "graphResultLeft" ) {
		document.
			getElementById ("left-graph").
			insertAdjacentHTML ("beforeEnd", "<form id=\"" + id + "\"></form> ");
	}
	if ( id === "graphResultRight" ) {
		document.
			getElementById ("right-graph").
			insertAdjacentHTML ("beforeEnd", "<form id=\"" + id + "\"></form> ");
	}
	

	arr.forEach ((item) => {
		item.forEach ((itemNested) => {
			document.
				getElementById (id).
				insertAdjacentHTML ("beforeEnd","<input type=\"text\" value=\"" + (itemNested === '+-1' ? '+-1' : itemNested) + "\" class=\"" + className + "\" />");
		});
		document.
				getElementById (id).
				insertAdjacentHTML ("beforeEnd", "<br />");
	});
}

function getAnotherMatrix ( className, form, resultId, insertClass ) {
	var field = document.getElementsByClassName (className); // get matrix values
	var size = Number (form.size.value); // get matrix size
	var values = []; // init array for matrix values
	var count = 0; // counter for iteration in matrix values object

	// add and convert matrix values for new array
	for ( var i = 0; i < size; i++ ) {
		values [i] = [];
		for ( var j = 0; j < size; j++ ) {
			values [i][j] = Number (field [count].value);
			count++;
		}
	}

	var bindCount = 0; // bind count

	// find binds between elements
	values.forEach ((item) => {
		item.forEach ((itemNested) => {
			if ( itemNested !== 0 ) {
				bindCount++;
			}
		});		
	});

	var result = []; // init array for result

	// add to result array init elements  
	for ( var i = 0; i < size; i++ ) {
		result [i] = [];
		for ( var j = 0; j < bindCount; j++ ) {
			result [i][j] = 0;
		}
	}

	var bindNumber = 0; // number of bind line

	// analyze values for find binds 
	for ( var i = 0; i < size; i++ ) {
		for ( var j = 0; j < size; j++ ) {
			if ( values [i][j] !== 0 ) {
				if ( i === j ) {
					result [i][bindNumber] = '+-1'; 
					bindNumber++;
					break;
				}
				result [i][bindNumber]--;
				result [j][bindNumber]++;
				bindNumber++;
			}
		}
	}

	print (result, resultId, insertClass); // print result
}

function getLogicAmount ( form1, form2, class1, class2 ) {
	var f1 = form1.getElementsByClassName (class1);
	var f2 = form2.getElementsByClassName (class2);
	var s1 = Number (form1.size.value);
	var s2 = Number (form2.size.value);
	var v1 = [];
	var v2 = [];
	var bigSize = s1 > s2 ? s1 :s2;
	var count = 0;

	for ( var i = 0; i < s1; i++ ) {
		v1 [i] = [];
		for ( var j = 0; j < s1; j++ ) {
			v1 [i][j] = Number (f1 [count].value);
			count++;
			if ( j == s1 - 1 ) {
				if ( v1 [i].keys.length < bigSize ) {
					for ( var o = j + 1; o < bigSize; o++ ) {
						v1 [i][o] = 0;
					}
				}
			}
		}
	}
	count = 0;
	for ( var i = 0; i < s2; i++ ) {
		v2 [i] = [];
		for ( var j = 0; j < s2; j++ ) {
			v2 [i][j] = Number (f2 [count].value);
			count++;
			if ( j == s2 - 1 ) {
				if ( v2 [i].keys.length < bigSize ) {
					for ( var o = j + 1; o < bigSize; o++ ) {
						v2 [i][o] = 0;
					}
				}
			}
		}
	}

	var smallGraph = s1 > s2 ? v2 : v1;
	var bigGraph = s1 > s2 ? v1 : v2;

	for ( var i = s1; i < bigSize; i++ ) {
		smallGraph [i] = [];
		for ( var j = 0; j < bigSize; j++ ) {
			smallGraph [i][j] = 0;
		}
	}

	var result = [];

	for ( var i = 0; i < bigSize; i++ ) {
		result [i] = [];
		for ( var j = 0; j < bigSize; j++ ) {
			result [i][j] = smallGraph [i][j] + bigGraph [i][j];
		}
	}

	// print result to page
	var elem = document.getElementById ('graphResultCenter');
	elem.
		insertAdjacentHTML (
			"beforeEnd",
			"<input type=\"hidden\" value=\"" + bigSize + "\" name=\"size\" />"
		);
	for ( var i = 0; i < bigSize; i++ ) {
		for ( var j = 0; j < bigSize; j++ ) {
			elem.
				insertAdjacentHTML (
					"beforeEnd",
					"<input type=\"text\" value=\"" + result [i][j] + "\" x=\"" + (i + 1) + "\" y=\"" + (j + 1) + "\" class=\"itemCenter\" />"
				);
		}
		elem.
			insertAdjacentHTML ("beforeEnd", "<br />");
	}

	document.getElementById ('canvasCenter').style.display = 'block';
	document.getElementById ('graphResultCenter').style.display = 'block';
	draw (document.getElementById ('graphResultCenter'), 'canvasCenter', 'itemCenter');
}

document.graphDataLeft.getResult.onclick = () => {
	getAnotherMatrix ("itemLeft", document.graphDataLeft, "graphResultLeft", "itemLeft");
	document.getElementById ('canvasLeft').style.display = 'block';
	draw (document.graphDataLeft, 'canvasLeft', 'itemLeft');
};

document.graphDataRight.getResult.onclick = () => {
	getAnotherMatrix ("itemRight", document.graphDataRight, "graphResultRight", "itemRight");
	document.getElementById ('canvasRight').style.display = 'block';
	draw (document.graphDataRight, 'canvasRight', 'itemRight');
};

document.getElementById ('amountBtn').onclick = () => {
	getLogicAmount (
		document.graphDataLeft,
		document.graphDataRight,
		"itemLeft",
		"itemRight"
	);
};

var t = setInterval (() => {
	var s1 = Number (document.graphDataLeft.size.value);
	var s2 = Number (document.graphDataRight.size.value);
	if ( s1 > 0 && s2 > 0 ) { 
		document.getElementById ('amountBtn').style.display = 'block';	
		clearInterval (t);
	}
}, 10);