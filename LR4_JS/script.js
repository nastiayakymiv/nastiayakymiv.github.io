var tab;
var tabContent;

window.onload = function () {
    tabContent = document.getElementsByClassName('tabContent');
    tab = document.getElementsByClassName('tab');
    hideTabsContent(1);
}
function hideTabsContent(a) {
    for (var i = a; i < tabContent.length; i++){
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        tab[i].classList.remove('whiteborder');
    }
}
document.getElementById('tabs').onclick = function (event) {
    var target = event.target;
    if (target.className == 'tab') {
        for (var i = 0; i < tab.length; i++){
            if (target == tab[i]) {
                showTabsContent(i);
                break;
            }
        }
    }
}
function showTabsContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('whiteborder');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}
function generate() {
    var values = [];
    ['rtl', 'rtr', 'rbr', 'rbl'].forEach(function (id) {
        var value = document.getElementById(id).value + 'px';
        values.push(value);
    });

    var borderRadiusValue = 'border-radius: ' + values.join(' ') + ";";
    
    var block = document.getElementById('block');
    block.style.borderRadius = values.join(' ');

    document.getElementById('output').value = borderRadiusValue;

    document.getElementById('ttl').value = values[0];
    document.getElementById('ttr').value = values[1];
    document.getElementById('tbr').value = values[2];
    document.getElementById('tbl').value = values[3];
  }

  var rtl = document.getElementById('rtl').value;
  var rtr = document.getElementById('rtr').value;
  var rbr = document.getElementById('rbr').value;
  var rbl = document.getElementById('rbl').value;
  
  var block = document.getElementById('block');
  
  ttl.value = rtl;
  ttr.value = rtr;
  tbr.value = rbr;
  tbl.value = rbl;
  
  block.style.borderRadius = rtl + "px " + rtr + "px " + rbr + "px " + rbl + "px";

  function applyTransition() {
    var timeduration = document.getElementById('timeduration').value;
    var selecttime = document.getElementById('selecttime').value;
    var propertyvalue = document.getElementById('propertyvalue').value;
    var transitionValue = 'transition-duration: ' + timeduration + selecttime + ';\n';
    transitionValue += 'transition-property: ' + propertyvalue + ';';
    document.getElementById('output1').value = transitionValue;
}

function applyTransitionOnHover() {
    var timeduration = document.getElementById('timeduration').value;
    var selecttime = document.getElementById('selecttime').value;
    var propertyvalue = document.getElementById('propertyvalue').value;
    document.getElementById('block2').addEventListener('mouseover', function () {
        this.style.transitionDuration = timeduration + selecttime;
        this.style.transitionProperty = propertyvalue;
    });
}