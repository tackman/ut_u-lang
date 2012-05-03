// tokenizer area

var g_input;
var g_itr;
var g_tokens = [];
var g_tk_state = 'start';

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

// entry point

var _div = tokenize('あいうえう うっうー ううー あうー かなーって かもー');
output(_div);
for( _s in _div){
    if(_div[_s] === 'うっうー'){
	output(_div[_s]);
    }
}
