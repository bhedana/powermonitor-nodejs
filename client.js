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
      el = $('<div/>', { id: 'sensor-'+data.address_16, class: 'sensor' }).appendTo('#sensors');
    }else{
      el = $('#sensor-'+data.address_16)
      el.html('')
    }
    
    var dl = $('<dl/>').appendTo(el);
    var dt = $('<dt/>', { html: '<span class="label">Sensor:</span> '+data['address_16'] }).appendTo(dl);
    var dd = $('<dd/>', { html: '<span class="label">Watts:</span> '+data['avgwatt'] }).appendTo(dl);
    var dd = $('<dd/>', { html: '<span class="label">Amps:</span> '+data['avgamp'] }).appendTo(dl);
  });
}

window.onload = function() { 
  var url,  jqxhr;
  loadInputs();
  var pagereload = setInterval(function(){
    window.loadInputs()
  },10000);
};