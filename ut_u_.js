// tokenizer area

var g_tokens;

var stdout;


function tokenize(str){
    g_tokens = [];
    for(var i = 0; i < str.length; ++i){
	if('あうー' === str.substring(i, i+3)){
	    g_tokens.push('あうー');
	    i += 2;
	}else if('うっうー' === str.substring(i, i+4)){
	    g_tokens.push('うっうー');
	    i += 3;
	}else if('ううー' === str.substring(i, i+3)){
	    g_tokens.push('ううー');
	    i += 2;
	}else if('イエイ' === str.substring(i, i+3)){
	    g_tokens.push('イエイ');
	    i += 2;
	}else if('おとく' === str.substring(i, i+3)){
	    g_tokens.push('おとく');
	    i += 2;
	}else if('ハイ、ターッチ' === str.substring(i, i+7)){
	    g_tokens.push('ハイ、ターッチ');
	    i += 6;
	}else if('かもー' === str.substring(i, i+3)){
	    g_tokens.push('かもー');
	    i += 2;
	}else if('かなーって' === str.substring(i, i+5)){
	    g_tokens.push('かなーって');
	    i += 4;
	}
    }
    
    return g_tokens;
};



// interpreter area
var g_ptr;
var g_pc;
function run(){
    var added;
    var decced;
    var depth;
    var i;
    var value;
    g_ptr = 0;
    g_pc = 0;
    while(g_pc < g_tokens.length){
	var token = g_tokens[g_pc];
	if(token === 'あうー'){
	    ;  // nop
	}else if(token === 'イエイ'){
	    g_ptr++;
	    if(g_ptr >= g_tokens.length)
		throw 'すたっくぽいんたがはみでてます';
	}else if(token === 'おとく'){
	    g_ptr--;
	    if(g_ptr < 0)
		throw 'すたっくぽいんたがはみでてます';
	}else if(token === 'うっうー'){
	    for( i = g_ptr; i < g_tokens.length ; ++i){
		value = g_tokens[i];
		added = half_add(value);
		g_tokens[i] = added;
		if(added !== 'あうー')
		    break;
	    }
	}else if(token === 'ううー'){
	    for(i = g_ptr; i >= 0 ; --i){
		value = g_tokens[i];
		decced = half_dec(value);
		g_tokens[i] = decced;
		if(decced !== 'かなーって')
		    break;
	    }
	}else if(token === 'ハイ、ターッチ'){
	    stdout(g_tokens[g_ptr]);
	}else if(token === 'かもー'){
	    depth = 0;
	    if(g_tokens[g_ptr] === 'あうー'){
		for(; ; ++g_pc){
		    if(g_tokens[g_pc] === 'かなーって' && depth === 0)
			break;
		    if(g_tokens[g_pc] === 'かもー')
			depth++;
		    else if(g_tokens[g_pc] === 'かなーって')
		        depth--;
		}
		if(g_pc >= g_tokens.length)
		    throw 'るーぷのたいおうがとれていません';
	    }
	}else if(token === 'かなーって'){
	    output('かなーってです');
	    depth = 0;
	    if(g_tokens[g_ptr] !== 'あうー'){
		--g_pc;
		for(;;--g_pc){
		    if(g_tokens[g_pc] === 'かもー' && depth === 0)
			break;
		    if(g_tokens[g_pc] === 'かなーって')
			depth++;
		    else if(g_tokens[g_pc] === 'かもー')
		        depth--;
		}
		if(g_pc < 0)
		    throw 'るーぷのたいおうがとれていません';
	    }else{

	    }
	}

	++g_pc;
    }
}

function half_add( value){
    var ret;
    if(value === 'あうー')
	ret = 'うっうー';
    else if(value === 'うっうー')
        ret = 'ううー';
    else if(value === 'ううー')
        ret = 'イエイ';
    else if(value === 'イエイ')
        ret = 'おとく';
    else if(value === 'おとく')
        ret = 'ハイ、ターッチ';
    else if(value === 'ハイ、ターッチ')
        ret = 'かもー';
    else if(value === 'かもー')
        ret = 'かなーって';
    else if(value === 'かなーって')
        ret = 'あうー';
    return ret;
}

function half_dec( value){
   var ret;
    if(value === 'あうー')
	ret = 'かもー';
    else if(value === 'うっうー')
        ret = 'あうー';
    else if(value === 'ううー')
        ret = 'うっうー';
    else if(value === 'イエイ')
        ret = 'ううー';
    else if(value === 'おとく')
        ret = 'イエイ';
    else if(value === 'ハイ、ターッチ')
        ret = 'おとく';
    else if(value === 'かもー')
        ret = 'ハイ、ターッチ';
    else if(value === 'かなーって')
        ret = 'ハイ、ターッチ';
    return ret;

}

// デバッグ用
function output(arg){
//    console.log(arg);
};

function set_stdout(cb){
    stdout = cb;
}

// entry point
// nodeでテストするときはこの辺を有効化

/* 
 stdout = function(s){
     console.log(g_ptr +' ' +s);
 }

var _div = tokenize('うっうー かもー イエイ かなーって' +

'イエイ' +
'うっうー イエイ' +
'うっうー うっうー うっうー うっうー うっうー うっうー イエイ' +
'うっうー うっうー うっうー イエイ' +
'うっうー うっうー うっうー うっうー うっうー イエイ' +
'うっうー うっうー うっうー うっうー イエイ' +
'うっうー イエイ' +
'うっうー うっうー  うっうー うっうー うっうー うっうー うっうー' +
'おとく おとく おとく おとく おとく おとく おとく' +

'あうー あうー あうー あうー あうー あうー あうー あうー'
		    + '');

try{
    run();
} catch (x) {
    console.log(x);
}

//console.log(g_tokens);

console.log('end');
*/

