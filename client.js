var inputs = [];

function loadInputs(){
  $.getJSON( document.URL+'inputs/', function(data) { 
    console.log('API response received'); 
    inputs = data;
    console.log(data)
    
    $('#input').html("");
    
    for( i= 0 ; i < inputs.length ; i++ ){ 
      showInput(inputs[i])
    } 
  });  
  
}

function showInput(id){
  $.getJSON( document.URL+'inputs/'+id, function(data) { 
    console.log('API response received'); 
    $('#input').append('<p>input gpio port '+data['address_16']+'</br> AvgWatt: '+data['avgwatt']+'</br> AvgAmp: '+data['avgamp']+ '</p>');
  });
}

window.onload = function() { 
  var url,  jqxhr;  
  
  loadInputs();
  
  var pagereload = setInterval(function(){
    window.loadInputs()
  },10000);
  
};