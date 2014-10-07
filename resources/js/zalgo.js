var zalgo = function() {
  var zalgoChars = {
    up: [
      '\u030d', /*     ̍     */
      '\u030e', /*     ̎     */
      '\u0304', /*     ̄     */
      '\u0305', /*     ̅     */
      '\u033f', /*     ̿     */
      '\u0311', /*     ̑     */
      '\u0306', /*     ̆     */
      '\u0310', /*     ̐     */
      '\u0352', /*     ͒     */
      '\u0357', /*     ͗     */
      '\u0351', /*     ͑     */
      '\u0307', /*     ̇     */
      '\u0308', /*     ̈     */
      '\u030a', /*     ̊     */
      '\u0342', /*     ͂     */
      '\u0343', /*     ̓     */
      '\u0344', /*     ̈́     */
      '\u034a', /*     ͊     */
      '\u034b', /*     ͋     */
      '\u034c', /*     ͌     */
      '\u0303', /*     ̃     */
      '\u0302', /*     ̂     */
      '\u030c', /*     ̌     */
      '\u0350', /*     ͐     */
      '\u0300', /*     ̀     */
      '\u0301', /*     ́     */
      '\u030b', /*     ̋     */
      '\u030f', /*     ̏     */
      '\u0312', /*     ̒     */
      '\u0313', /*     ̓     */
      '\u0314', /*     ̔     */
      '\u033d', /*     ̽     */
      '\u0309', /*     ̉     */
      '\u0363', /*     ͣ     */
      '\u0364', /*     ͤ     */
      '\u0365', /*     ͥ     */
      '\u0366', /*     ͦ     */
      '\u0367', /*     ͧ     */
      '\u0368', /*     ͨ     */
      '\u0369', /*     ͩ     */
      '\u036a', /*     ͪ     */
      '\u036b', /*     ͫ     */
      '\u036c', /*     ͬ     */
      '\u036d', /*     ͭ     */
      '\u036e', /*     ͮ     */
      '\u036f', /*     ͯ     */
      '\u033e', /*     ̾     */
      '\u035b', /*     ͛     */
      '\u0346', /*     ͆     */
      '\u031a' /*     ̚     */
    ],
    down: [
      '\u0316', /*     ̖     */
      '\u0317', /*     ̗     */
      '\u0318', /*     ̘     */
      '\u0319', /*     ̙     */
      '\u031c', /*     ̜     */
      '\u031d', /*     ̝     */
      '\u031e', /*     ̞     */
      '\u031f', /*     ̟     */
      '\u0320', /*     ̠     */
      '\u0324', /*     ̤     */
      '\u0325', /*     ̥     */
      '\u0326', /*     ̦     */
      '\u0329', /*     ̩     */
      '\u032a', /*     ̪     */
      '\u032b', /*     ̫     */
      '\u032c', /*     ̬     */
      '\u032d', /*     ̭     */
      '\u032e', /*     ̮     */
      '\u032f', /*     ̯     */
      '\u0330', /*     ̰     */
      '\u0331', /*     ̱     */
      '\u0332', /*     ̲     */
      '\u0333', /*     ̳     */
      '\u0339', /*     ̹     */
      '\u033a', /*     ̺     */
      '\u033b', /*     ̻     */
      '\u033c', /*     ̼     */
      '\u0345', /*     ͅ     */
      '\u0347', /*     ͇     */
      '\u0348', /*     ͈     */
      '\u0349', /*     ͉     */
      '\u034d', /*     ͍     */
      '\u034e', /*     ͎     */
      '\u0353', /*     ͓     */
      '\u0354', /*     ͔     */
      '\u0355', /*     ͕     */
      '\u0356', /*     ͖     */
      '\u0359', /*     ͙     */
      '\u035a', /*     ͚     */
      '\u0323' /*     ̣     */
    ],
    mid: [
      '\u0315', /*     ̕     */
      '\u031b', /*     ̛     */
      '\u0340', /*     ̀     */
      '\u0341', /*     ́     */
      '\u0358', /*     ͘     */
      '\u0321', /*     ̡     */
      '\u0322', /*     ̢     */
      '\u0327', /*     ̧     */
      '\u0328', /*     ̨     */
      '\u0334', /*     ̴     */
      '\u0335', /*     ̵     */
      '\u0336', /*     ̶     */
      '\u034f', /*     ͏     */
      '\u035c', /*     ͜     */
      '\u035d', /*     ͝     */
      '\u035e', /*     ͞     */
      '\u035f', /*     ͟     */
      '\u0360', /*     ͠     */
      '\u0362', /*     ͢     */
      '\u0338', /*     ̸     */
      '\u0337', /*     ̷     */
      '\u0361', /*     ͡     */
      '\u0489' /*     ҉_     */    
    ]
  };

  function isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }

  var walkDOM = function(main) {
    var arr = [];
    var loop = function(main) {
      do {
        if(main.hasChildNodes()) {
          loop(main.firstChild);
        } else if (!isBlank(main.textContent)){
          arr.push(main);
        }
      }
      while (main = main.nextSibling);
    }
    loop(main);
    return arr;
  }

  var insertAt = function(s, index, character) {
    return s.substr(0, index) + character + s.substr(index);
  }

  var randomInt = function(to) {
    return Math.floor(Math.random() * to);
  }

  var randomZalgo = function() {
    var hit = Math.random();
    var direction = hit < 0.4 ? 'up' : (hit < 0.8 ? 'down' : 'mid');
    var index = randomInt(zalgoChars[direction].length);
    return zalgoChars[direction][index];
  }

  var incrementZalgo = function(s) {
    var index = randomInt(s.length);
    var zalgo = randomZalgo();
    return insertAt(s, index, zalgo);
  }

  var applyZalgo = function(text) {
    var initial = text.textContent
    text.textContent = incrementZalgo(text.textContent);
  };

  var leaves = walkDOM(document.body);

  var creepingZalgo = function() {
    setInterval(function() {
      var inception = randomInt(leaves.length);
      var chosen = leaves[inception];
      applyZalgo(chosen);
    }, 20 + randomInt(50));
  }

  var spawnZalgo = function() {
    for (var z = 0; z < 50; z++) {
      creepingZalgo();
    }
  }
  
  spawnZalgo();
} ();



// javascript:var zalgo=function(){function t(e){return!e||/^\s*$/.test(e)}var e={up:["̍","̎","̄","̅","̿","̑","̆","̐","͒","͗","͑","̇","̈","̊","͂","̓","̈́","͊","͋","͌","̃","̂","̌","͐","̀","́","̋","̏","̒","̓","̔","̽","̉","ͣ","ͤ","ͥ","ͦ","ͧ","ͨ","ͩ","ͪ","ͫ","ͬ","ͭ","ͮ","ͯ","̾","͛","͆","̚"],down:["̖","̗","̘","̙","̜","̝","̞","̟","̠","̤","̥","̦","̩","̪","̫","̬","̭","̮","̯","̰","̱","̲","̳","̹","̺","̻","̼","ͅ","͇","͈","͉","͍","͎","͓","͔","͕","͖","͙","͚","̣"],mid:["̕","̛","̀","́","͘","̡","̢","̧","̨","̴","̵","̶","͏","͜","͝","͞","͟","͠","͢","̸","̷","͡","҉"]};var n=function(e){var n=[];var r=function(e){do{if(e.hasChildNodes()){r(e.firstChild)}else if(!t(e.textContent)){n.push(e)}}while(e=e.nextSibling)};r(e);return n};var r=function(e,t,n){return e.substr(0,t)+n+e.substr(t)};var i=function(e){return Math.floor(Math.random()*e)};var s=function(){var t=Math.random();var n=t<.4?"up":t<.8?"down":"mid";var r=i(e[n].length);return e[n][r]};var o=function(e){var t=i(e.length);var n=s();return r(e,t,n)};var u=function(e){var t=e.textContent;e.textContent=o(e.textContent)};var a=n(document.body);var f=function(){setInterval(function(){var e=i(a.length);var t=a[e];u(t)},20+i(50))};var l=function(){for(var e=0;e<50;e++){f()}};l()}()
