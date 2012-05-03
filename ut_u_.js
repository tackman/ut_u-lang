// tokenizer area

var g_input;
var g_itr;
var g_tokens = [];
var g_tk_state = 'start';

var stdout;


function tokenize(str){
    var sp = str.split(' ');
    for( i in sp ){
	var t = sp[i];
	if(t === 'あうー' ||
	  t === 'うっうー' ||
	  t === 'ううー' || 
	  t === 'イエイ' ||
	  t === 'おとく' ||
	  t === 'ハイ、ターッチ' ||
	  t === 'かもー' ||
	  t === 'かなーって')
	    g_tokens.push(t);
    }
    return g_tokens;
};

function tk_base(){
    var c = getc();
    if(c === 'あ')
	tk_a();
}

function tk_a(){
    var next1 = getc();
    if(next1 !== 'う'){
	g_tk_state = 'start';
	--g_itr;
	return;
    }
    var next2 = getc();
    if(next2 === 'ー'){
    }else if(next2 === 'っ'){
	
    }
}

function getc(){
    var ret = g_itr < g_input.length ? g_input[g_itr] : null;
    g_itr++;
    return ret;
}

function output(arg){
    console.log(arg);
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
	}else if(token === 'おとく'){
	    g_ptr--;
	}else if(token === 'うっうー'){
	    for( i = g_ptr; ; ++i){
		value = g_tokens[i];
		added = half_add(value);
		g_tokens[i] = added;
		if(added !== 'あうー')
		    break;
	    }
	}else if(token === 'ううー'){
	    for(i = g_ptr; ; --i){
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
	    ++g_pc;
	    if(g_tokens[g_ptr] === 'あうー'){
		for(; ; ++g_pc){
		    if(g_tokens[g_pc] === 'かなーって' && depth === 0)
			break;
		    if(g_tokens[g_pc] === 'かもー')
			depth++;
		    else if(g_tokens[g_pc] === 'かなーって')
		        depth--;
		}
	    }
	}else if(token === 'かなーって'){
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

function set_stdout(cb){
    stdout = cb;
}

// entry point
/*
 stdout = function(s){
     console.log(s);
 }
 var _div = tokenize('うっうー うっうー イエイ かもー おとく ハイ、ターッチ イエイ うっうー かなーって');
run();

*/