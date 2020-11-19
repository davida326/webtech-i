$(document).ready(function(){
    var $database = $("#database");
    var $name = $("#name");
    var $fogyasztas = $("#fogyasztas");
    var $szin=$("#szin");
    var $gyarto=$("#gyarto");
    var $elerheto=$("#elerheto");
    var $gyartasiev=$("#gyartasiev");
    var $loero=$("#loero");
    var manufacturerlist=[];
    $.ajax({
        type:"GET",
        url: "https://webtechcars.herokuapp.com/api/manufacturers",
        success: function(data){
            for(var i in data) if($.inArray(data[i].name,manufacturerlist)==-1) manufacturerlist.push(data[i].name);
            for(var i = 0;i<manufacturerlist.length;i++)
            {
                var o = new Option(manufacturerlist[i],manufacturerlist[i]);
                $(o).html("<option>"+manufacturerlist[i]+"</option>");
                $gyarto.append(o);
            } 
        }
    });
    $.ajax({
        type:"GET",
        url: "https://webtechcars.herokuapp.com/api/cars",
        success: function(data){
            for(var i in data){
                if(data[i].avaiable in window)$database.append("<li data-id="+data[i]._id+"><p> Név: <span class='noedit name'>"+data[i].name+"</span><input class='edit name'/></p><p> Fogyasztás: <span class='noedit consumption'>"+data[i].consumption+"</span><input class='edit consumption'/> </p><p> Színe: <span class='noedit color'>"+data[i].color+"</span><input class='edit color'/></p><p> Gyártó: <span class='noedit manufacturer'>"+data[i].manufacturer+"</span><input class='edit manufacturer'/></p><p> Elérhető: <span class='noedit available'>"+data[i].available+"</span><input class='edit available'/></p><p> Évjárat: <span class='noedit year'>"+data[i].year+"</span><input class='edit year'/></p><p id='last' > Lóerő: <span class='noedit horsepower'>"+data[i].horsepower+"</span><input class='edit horsepower'/></p> <div class='buttons'><button class='editData noedit'>Edit</button><button class='saveEdit edit'>Save</button><button class='cancelEdit edit'>Cancel</button></div><button id='del' data-id='"+data[i]._id+"' class='remove'>X</button></li>").hide().fadeIn(300);
                else $database.append("<li data-id="+data[i]._id+"><p> Név: <span class='noedit name'>"+data[i].name+"</span><input class='edit name'/></p><p> Fogyasztás: <span class='noedit consumption'>"+data[i].consumption+"</span><input class='edit consumption'/> </p><p> Színe: <span class='noedit color'>"+data[i].color+"</span><input class='edit color'/></p><p> Gyártó: <span class='noedit manufacturer'>"+data[i].manufacturer+"</span><input class='edit manufacturer'/></p><p> Elérhető: <span class='noedit available'>"+data[i].avaiable+"</span><input class='edit available'/></p><p> Évjárat: <span class='noedit year'>"+data[i].year+"</span><input class='edit year'/></p><p id='last' > Lóerő: <span class='noedit horsepower'>"+data[i].horsepower+"</span><input class='edit horsepower'/></p> <div class='buttons'><button class='editData noedit'>Edit</button><button class='saveEdit edit'>Save</button><button class='cancelEdit edit'>Cancel</button></div><button id='del' data-id='"+data[i]._id+"' class='remove'>X</button></li>").hide().fadeIn(300);
            }
        },
        error: function(){
            alert("error loading database");
        }
    });
    $("#add-cars").on("click",function() {
        var autom= JSON.stringify({
                "name":$name.val(),
                "consumption":$fogyasztas.val(),
                "color":$szin.val(),
                "manufacturer":$gyarto.val(),
                "avaiable":$elerheto.val(),
                "year":$gyartasiev.val(),
                "horsepower":$loero.val()
        });
        $.ajax({
            type: "POST",
            url:"https://webtechcars.herokuapp.com/api/cars",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            data:autom,
            contentType:"application/json",
            success:function(newdata){
               $.ajax({
                    type:"GET",
                    url:"https://webtechcars.herokuapp.com/api/cars",
                    success:function(data){
                        $database.append("<li data-id="+data[data.length-1]._id+"><p> Név: <span class='noedit name'>"+data[data.length-1].name+"</span><input class='edit name'/></p><p> Fogyasztás: <span class='noedit consumption'>"+data[data.length-1].consumption+"</span><input class='edit consumption'/> </p><p> Színe: <span class='noedit color'>"+data[data.length-1].color+"</span><input class='edit color'/></p><p> Gyártó: <span class='noedit manufacturer'>"+data[data.length-1].manufacturer+"</span><input class='edit manufacturer'/></p><p> Elérhető: <span class='noedit available'>"+data[data.length-1].avaiable+"</span><input class='edit available'/></p><p> Évjárat: <span class='noedit year'>"+data[data.length-1].year+"</span><input class='edit year'/></p><p id='last' > Lóerő: <span class='noedit horsepower'>"+data[data.length-1].horsepower+"</span><input class='edit horsepower'/></p> <div class='buttons'><button class='editData noedit'>Edit</button><button class='saveEdit edit'>Save</button><button class='cancelEdit edit'>Cancel</button></div><button id='del' data-id='"+data[data.length-1]._id+"' class='remove'>X</button></li>").hide().fadeIn(300);
                    },
                });
            },
            error:function () {
                alert("hoppá");
            }
        });
    });
    $database.delegate(".remove","click",function() {
        var $li = $(this).closest('li');
        $.ajax({
        type:"DELETE",
        url:"https://webtechcars.herokuapp.com/api/cars/"+$(this).attr("data-id"),
        success:function () {
            $li.fadeOut(300);
            }
      });
    });
    $database.delegate(".editData","click",function(){
        var $li = $(this).closest('li');
        $li.find("input.name").val( $li.find("span.name").html());
        $li.find("input.consumption").val( $li.find("span.consumption").html());
        $li.find("input.color").val( $li.find("span.color").html());
        $li.find("input.manufacturer").val( $li.find("span.manufacturer").html());
        $li.find("input.available").val( $li.find("span.available").html());
        $li.find("input.year").val( $li.find("span.year").html());
        $li.find("input.horsepower").val( $li.find("span.horsepower").html());
        $li.addClass("edit");
    });
    $database.delegate(".cancelEdit","click",function(){
    var $li = $(this).closest('li');
    $(this).closest('li').removeClass("edit");
    });
    $database.delegate(".saveEdit","click",function(){
        var $li = $(this).closest('li');
        var autocsere=JSON.stringify({
            "name":$li.find("input.name").val(),
            "consumption":$li.find("input.consumption").val(),
            "color":$li.find("input.color").val(),
            "manufacturer":$li.find("input.manufacturer").val(),
            "avaiable":$li.find("input.available").val(),
            "year":$li.find("input.year").val(),
            "horsepower":$li.find("input.horsepower").val(),
        });
        var $li = $(this).closest('li');
        $.ajax({
            type:"DELETE",
            url:"https://webtechcars.herokuapp.com/api/cars/"+$li.attr("data-id"),
            success:function (data) {
                $li.remove()
                $.ajax({
                    type:"POST",
                    url: "https://webtechcars.herokuapp.com/api/cars",
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    data:autocsere,
                    contentType:"application/json",
                    success:function(data){
                        $.ajax({
                            type:"GET",
                            url: "https://webtechcars.herokuapp.com/api/cars",
                            success: function(data){
                                $database.append("<li data-id="+data[data.length-1]._id+"><p> Név: <span class='noedit name'>"+data[data.length-1].name+"</span><input class='edit name'/></p><p> Fogyasztás: <span class='noedit consumption'>"+data[data.length-1].consumption+"</span><input class='edit consumption'/> </p><p> Színe: <span class='noedit color'>"+data[data.length-1].color+"</span><input class='edit color'/></p><p> Gyártó: <span class='noedit manufacturer'>"+data[data.length-1].manufacturer+"</span><input class='edit manufacturer'/></p><p> Elérhető: <span class='noedit available'>"+data[data.length-1].avaiable+"</span><input class='edit available'/></p><p> Évjárat: <span class='noedit year'>"+data[data.length-1].year+"</span><input class='edit year'/></p><p id='last' > Lóerő: <span class='noedit horsepower'>"+data[data.length-1].horsepower+"</span><input class='edit horsepower'/></p> <div class='buttons'><button class='editData noedit'>Edit</button><button class='saveEdit edit'>Save</button><button class='cancelEdit edit'>Cancel</button></div><button id='del' data-id='"+data[data.length-1]._id+"' class='remove'>X</button></li>").hide().fadeIn(300);
                            },
                            error: function(){
                                alert("error get loading database");
                            }
                        });
                    },
                    error:function(){
                        alert("error updating database");  
                    }
                });
            },
            error:function(){
                alert("hiba a törlés során!");
            },
          });
    });    
});