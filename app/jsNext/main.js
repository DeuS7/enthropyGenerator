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
    measurementDelay: 1000,
    saveInterval: 200000,
    warningMessage: "This site uses your shit. Click to remove."
  }

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

  setInterval(saveData, settings.saveInterval);

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

  let showWarning = function() {
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

    warnBox.onclick = function() {
      this.remove();
    }

    document.documentElement.append(warnBox);
  }();
})();
