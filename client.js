var inputs = [];

function loadInputs(){
  $.getJSON( document.URL+'inputs/', function(data) { 
    inputs = data;
    for( i= 0 ; i < inputs.length ; i++ ){ 
      showInput(inputs[i])
    } 
  });  
  
}

function showInput(id){
  $.getJSON( document.URL+'inputs/'+id, function(data) { 
    el = $.find('#sensor-'+data.address_16)
    if( el[0] == undefined ){
      el = $('<div/>', { id: 'sensor-'+data.address_16 }).appendTo('#sensors');
    }else{
      el = $('#sensor-'+data.address_16)
      el.html('')
    }
    
    var dl = $('<dl/>').appendTo(el);
    var dt = $('<dt/>', { text: 'Sensor '+data['address_16'] }).appendTo(dl);
    var dd = $('<dd/>', { text: 'Watts: '+data['avgwatt'] }).appendTo(dl);
    var dd = $('<dd/>', { text: 'Amps: '+data['avgamp'] }).appendTo(dl);
  });
}

window.onload = function() { 
  var url,  jqxhr;
  loadInputs();
  var pagereload = setInterval(function(){
    window.loadInputs()
  },10000);
};