var inputs = [];

function loadInputs(){
  $.ajax({
      url: document.URL+'inputs/',
      type: 'GET',
      dataType: 'json',
      success: function(data){ 
        for( i= 0 ; i < data.length ; i++ ){ 
          showInput(data[i])
        } 
      },
      error: function(data) {
      }
  });
}

function draw_input(el, data){
  if(data['avgamp']<=0.05){
    el.addClass('btn-success');
  } else if(data['avgamp']<=0.90){
    el.addClass('btn-warning'); 
  } else {
    el.addClass('btn-danger');
  }
  var dl = $('<dl/>').appendTo(el);
  var dt = $('<dt/>', { html: data['address_16'] }).appendTo(dl);
  var dd = $('<dd/>', { html: '<span>Watts:</span> '+data['avgwatt'] }).appendTo(dl);
  var dd = $('<dd/>', { html: '<span>Amps:</span> '+data['avgamp'] }).appendTo(dl);  
  var dd = $('<dd/>', { html: '<span>RSSI:</span> '+data['rssi'] }).appendTo(dl);  
}

function showInput(id){
  $.ajax({
      url: document.URL+'inputs/'+id,
      type: 'GET',
      dataType: 'json',
      success: function(data){ 
        el = $.find('#sensor-'+data.address_16)
        if( el[0] == undefined ){
          el = $('<div/>', { id: 'sensor-'+data.address_16, class: 'sensor' }).appendTo('#sensors');
        }else{
          el = $('#sensor-'+data.address_16)
          el.html('')
        }
        draw_input(el, data)
      },
      error: function(data) {
      }
  });

}

window.onload = function() { 
  var url,  jqxhr;
  loadInputs();
  var pagereload = setInterval(function(){
    window.loadInputs()
  },2000);
};