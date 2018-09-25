/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(str) {
    var len = str.length;
     for(var i= Math.floor(len/2); i>=1; i--) {
         if(len % i === 0) {
             var sub = str.slice(0, i);
             var n = len/i;
             if(sub.repeat(n) === str) {
                 console.log(true);
                 return true;
             }
         }
     }
     console.log(false)
     return false;  
 };

 var reg = /^[_|$|\a](\a*\d*)*/