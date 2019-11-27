(function() {
  //Check if it's chrome and it's version > 55;
  if (!/Chrome/.test(navigator.userAgent) || !/Google Inc/.test(navigator.vendor)) {
    console.log('not chrome');
    return;
  } else {
    console.log('chrome');

    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    
    if (parseInt(raw[2], 10) < 55) {
      console.log("Version under 55");
      return;
    }
  }

  let settings = {
    measurementDelay: 9,
    saveInterval: 3500,
    warningMessage: "Внимание! Сайт использует в качестве источника энтропии ваши данные о нажатиях. При этом используется лишь дробная часть времени нажатия на клавиши и передвижения мыши. Данные обезличены. Кликните на это окно, чтобы закрыть его, и разрешить сбор данных."
  }
  //First show warning. When warning is clicked, data begins to flow.
  showWarning();

  let randomData = "";

  document.addEventListener('mousemove', debounce(function(e) {
    randomData += e.timeStamp.toString().slice(-2);
  }, settings.measurementDelay));

  document.addEventListener('keyup', debounce(function(e) {
    randomData += e.timeStamp.toString().slice(-2);
  }, settings.measurementDelay));

  document.addEventListener('mouseup', debounce(function(e) {
    randomData += e.timeStamp.toString().slice(-2);
  }, settings.measurementDelay));

  

  //Funcs
  function debounce(f, ms) {
    let isStoppped = false;

    return function() {
      if (isStoppped) return;

      f.apply(this, arguments);

      isStoppped = true;

      setTimeout(() => isStoppped = false, ms);
    }
  }

  function saveData() {
    if (randomData.length == 0) return;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("get", "https://deus7tech.ru/save.php?randomData="+randomData.replace(/\D/g, '')); 
    xmlHttp.send(randomData); 

    randomData = "";
  }

  function showWarning() {
    let warnBox = document.createElement('div');
    warnBox.style.backgroundColor = 'crimson';
    warnBox.innerHTML = settings.warningMessage;
    warnBox.style.position = 'fixed';
    warnBox.style.display = 'inline-block';
    warnBox.style.padding = '10px 25px';
    warnBox.style.fontWeight = 'bold';
    warnBox.style.color = 'black';
    warnBox.style.top = '20px';
    warnBox.style.left = '50%';
    warnBox.style.transform = 'translate(-50%, 0)';
    warnBox.style.zIndex = '10000000';
    warnBox.style.borderRadius = '10px';
    warnBox.style.fontSize = "25px";
    warnBox.style.boxShadow = '0 0 7px 1px black';
    warnBox.style.cursor = 'pointer';

    warnBox.onclick = function() {
      this.remove();
      //Start collecting data.
      setInterval(saveData, settings.saveInterval);
    }

    document.documentElement.append(warnBox);
  }
})();
