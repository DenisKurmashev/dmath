var renderResultSum = document.getElementById ("renderResultSum");
var renderResultSub = document.getElementById ("renderResultSub");
var renderResultInter = document.getElementById ("renderResultInter");

document.rangeSum.res.onclick = (e) => {
  var fields = [
    document.rangeSum.r1.value,
    document.rangeSum.r2.value
  ];

  var r1 = fields [0].split (",");
  var r2 = fields [1].split (",");

  var l = r1.length >= r2.length ? r1.length : r2.length;

  var res = [];

  r1.forEach ((item) => {
    res.push (item);
  });
  r2.forEach ((item) => {
    res.push (item);
  });

  var obj = {};

  for ( var i = 0; i < res.length; i++ ) {
    obj [res [i]] = true;
  }

  for ( var i = 0; i < Object.keys (obj).length; i++ ) {
    if ( !res [i] ) {
      renderResultSum.innerText = "Проверьте введенные данные!";
      return;
    }
  }

  var renderString = "Результат объединения множеств = {   ";

  Object.keys (obj).forEach ((item) => {
    renderString += item + "   ";
  });

  renderString += "}";

  renderResultSum.innerText = renderString;
}

document.rangeSub.res.onclick = (e) => {
  var fields = [
    document.rangeSub.r1.value,
    document.rangeSub.r2.value
  ];

  var r1 = fields [0].split (",");
  var r2 = fields [1].split (",");

  var l = r1.length >= r2.length ? r1.length : r2.length;

  var res = [];
  var counter = 0;

  for ( var i = 0; i < r1.length; i++ ) {
    for ( var j = 0; j < r2.length; j++ ) {
      if ( r1 [i].trim () === r2 [j].trim () ) {
        res [counter] = r1 [i];
        counter++;
        break;
      }
    }
  }

  for ( var i = 0; i < res.length; i++ ) {
    if ( !res [i] ) {
      renderResultSub.innerText = "Проверьте введенные данные!";
      return;
    }
  }

  for ( var i = 0; i < res.length; i++ ) {
    for ( var j = 0; j < r1.length; j++ ) {
      if ( res [i].trim () === r1 [j].trim () ) {
        delete r1 [j];
        r1 [j] = "err";
      }
    }
  }

  var renderString = "Результат разности двух множеств множеств = {   ";

  r1.forEach ((item) => {
    if ( item !== "err" ) {
      renderString += item + "   ";
    }
  });

  renderString += "}";

  renderResultSub.innerText = renderString;
}

document.rangeInter.res.onclick = (e) => {
  var fields = [
    document.rangeInter.r1.value,
    document.rangeInter.r2.value
  ];

  var r1 = fields [0].split (",");
  var r2 = fields [1].split (",");

  var res = [];
  var counter = 0;

  for ( var i = 0; i < r1.length; i++ ) {
    for ( var j = 0; j < r2.length; j++ ) {
      if ( r1 [i].trim () === r2 [j].trim () ) {
        res [counter] = r1 [i];
        counter++;
        break;
      }
    }
  }

  for ( var i = 0; i < res.length; i++ ) {
    if ( !res [i] ) {
      renderResultInter.innerText = "Проверьте введенные данные!";
      return;
    }
  }

  var renderString = "Результат пересечения множеств = {   ";

  res.forEach ((item) => {
    renderString += item + "   ";
  });

  renderString += "}";

  renderResultInter.innerText = renderString;
}
