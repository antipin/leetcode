/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function(secret, guess) {
    
    var numA = 0;
    var numB = 0;
    var usedIndexes = [];
    
    var strLength = secret.length;
    var i, j;
    
    for (i = 0; i < strLength; i++) {
        
        if (guess[i] === secret[i]) {
            
            numA++;
            usedIndexes.push(i);
            
        } else {
            
            for (j = 0; j < strLength; j++) {
                
                if (guess[i] === secret[j] && usedIndexes.indexOf(j) === -1 && guess[j] !== secret[j]) {
                    
                    numB++;
                    usedIndexes.push(j);
                    break;
                }
            }
        }
    }
    
    return '' + numA + 'A' + numB + 'B';
};

