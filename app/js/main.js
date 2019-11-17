let settings = {
  measurementDelay: 10,
  saveInterval: 2000
}

let randomData = "";

document.addEventListener('mousemove', debounce(function(e) {
  //Use e.timeStamp. Last digits. Check what it is
  randomData += e.timeStamp.toString().slice(-2);
}, settings.measurementDelay));

//Same but for keys
document.addEventListener('keyup', debounce(function(e) {
  randomData += e.timeStamp.toString().slice(-2);
}, settings.measurementDelay))

document.addEventListener('mouseup', debounce(function(e) {
  randomData += e.timeStamp.toString().slice(-2);
}, settings.measurementDelay))




function debounce(f, ms) {

  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };
}

setInterval(saveData, settings.saveInterval);

function saveData() {
  if (randomData.length == 0) return;

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function()
  {
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
    {
      console.log(xmlHttp.responseText);
    }
  }
  xmlHttp.open("get", "https://deus7tech.ru/save.php?randomData="+randomData.replace(/\D/g, '')); 
  xmlHttp.send(randomData); 

  randomData = "";
}




