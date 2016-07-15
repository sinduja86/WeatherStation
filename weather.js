$(document).ready(function(){
    $("#city").val('Newyork, NY');
    $("#sbmtBtn").click(function(e){
        e.preventDefault();
        //$("#alertPanel").hide();
        var city= $("#city").val();
        var weatherUrl="https://api.forecast.io/forecast/0751ba0037d9718ace0c13524bc84877/"
        $.when( $.ajax({url:"http://maps.googleapis.com/maps/api/geocode/json?address="+city+"&sensor=false" ,type: 'GET'}) )
            .then(function( data, textStatus, jqXHR ) {
            console.log(data);
            weatherUrl +=data.results[0].geometry.location.lat+","+data.results[0].geometry.location.lng;
            $.getJSON(weatherUrl+"?callback=?",function(data){
                console.log(data);
                var alerts = data.alerts;
                var days = data.daily.data;
                var current =data.currently;
                var html = "" ;
                var daysHtml = "";
                var currentHtml='<div class="panel panel-default"><div class="panel-heading"> Current Weather</div><div class="panel-body">';
                
                currentHtml+='Current Temperature: '+current.temperature+'<br/>Summary: '+current.summary+'</div>';
                $("#currentTempDiv").html(currentHtml);
                if(alerts !== undefined){
                    for(var i=0;i<alerts.length;i++){
                        var divHtml='<div class="alert alert-danger" role="alert">'+alerts[i].title+'<br/>'+alerts[i].description+'</div>'
                        html+=divHtml;   
                    }
                }else{
                     html="No active alerts"
                }
                
                
                $("#alertPanelBody").html(html);
                $('#alertPanel').show();
                
                for(var i=0; i<days.length;i++){
                    var daysDivHtml='<div class="panel panel-default"><div class="panel-heading"> Day '+(i+1)+'</div><div class="panel-body"> Minimum Temperature: '+days[i].temperatureMin+'<br/> Maximum Temperature: '+days[i].temperatureMax+'</div></div>'
                    daysHtml+=daysDivHtml
                        
                }
                $("#daysDiv").html(daysHtml);   
  
            });
                
        });
        
    });
});