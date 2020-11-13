$(document).ready(function(){
    var $database = $("#database");
    var $name = $("#name");
    var $country = $("#country");
    var $founded=$("#founded");
    $.ajax({
        type:"GET",
        url: "https://webtechcars.herokuapp.com/api/manufacturers",
        success: function(data){
            for(var i in data){
                $database.append("<li data-id="+data[i]._id+"><p> Gyártó neve: <span class='noedit name'>"+data[i].name+"</span><input class='edit name'/></p><p> Ország: <span class='noedit country'>"+data[i].country+"</span><input class='edit country'/> </p><p id='last'> Alapítási év: <span class='noedit founded'>"+data[i].founded+"</span><input class='edit founded'/></p> <div class='buttons'><button class='editData noedit'>Edit</button><button class='saveEdit edit'>Save</button><button class='cancelEdit edit'>Cancel</button></div><button id='del' data-id='"+data[i]._id+"' class='remove'>X</button></li>").hide().fadeIn(300);
            }
        },
        error: function(){
            alert("error loading database");
        }
    });
    $("#add-manu").on("click",function(){
        var gyarto=JSON.stringify({ 
            "name":$name.val(),
            "country":$country.val(),
            "founded":$founded.val()
        });
        
        $.ajax({
            type:"POST",
            url: "https://webtechcars.herokuapp.com/api/manufacturers",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            data:gyarto,
            contentType:"application/json",
            success:function(data){
                $.ajax({
                    type:"GET",
                    url: "https://webtechcars.herokuapp.com/api/manufacturers",
                    success: function(data){
                        $database.append("<li data-id="+data[data.length-1]._id+"><p> Gyártó neve: <span class='noedit name'>"+data[data.length-1].name+"</span><input class='edit name'/></p><p> Ország: <span class='noedit country'>"+data[data.length-1].country+"</span><input class='edit country'/> </p><p id='last'> Alapítási év: <span class='noedit founded'>"+data[data.length-1].founded+"</span><input class='edit founded'/></p> <div class='buttons'><button class='editData noedit'>Edit</button><button class='saveEdit edit'>Save</button><button class='cancelEdit edit'>Cancel</button></div><button id='del' data-id='"+data[data.length-1]._id+"' class='remove'>X</button></li>").hide().fadeIn(300);
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
        
    });
    $database.delegate(".remove","click",function() {
            var $li = $(this).closest('li');
            $.ajax({
            type:"DELETE",
            url:"https://webtechcars.herokuapp.com/api/manufacturers/"+$(this).attr("data-id"),
            success:function () {
                $li.fadeOut(300);
                }
          });
      });
    $database.delegate(".editData","click",function(){
            var $li = $(this).closest('li');
            $li.find("input.name").val( $li.find("span.name").html());
            $li.find("input.country").val( $li.find("span.country").html());
            $li.find("input.founded").val( $li.find("span.founded").html());
            $li.addClass("edit");
    });
    $database.delegate(".cancelEdit","click",function(){
        var $li = $(this).closest('li');
        $(this).closest('li').removeClass("edit");
    });
    $database.delegate(".saveEdit","click",function(){
        var $li = $(this).closest('li');
        var gyartocsere=JSON.stringify({
            "name":$li.find("input.name").val(),
            "country":$li.find("input.country").val(),
            "founded":$li.find("input.founded").val()
        });
        var $li = $(this).closest('li');
        $.ajax({
            type:"DELETE",
            url:"https://webtechcars.herokuapp.com/api/manufacturers/"+$li.attr("data-id"),
            success:function (data) {
                $li.remove()
                $.ajax({
                    type:"POST",
                    url: "https://webtechcars.herokuapp.com/api/manufacturers",
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    data:gyartocsere,
                    contentType:"application/json",
                    success:function(data){
                        $.ajax({
                            type:"GET",
                            url: "https://webtechcars.herokuapp.com/api/manufacturers",
                            success: function(data){
                                $database.append("<li data-id="+data[data.length-1]._id+"><p> Gyártó neve: <span class='noedit name'>"+data[data.length-1].name+"</span><input class='edit name'/></p><p> Ország: <span class='noedit country'>"+data[data.length-1].country+"</span><input class='edit country'/> </p><p id='last'> Alapítási év: <span class='noedit founded'>"+data[data.length-1].founded+"</span><input class='edit founded'/></p> <div class='buttons'><button class='editData noedit'>Edit</button><button class='saveEdit edit'>Save</button><button class='cancelEdit edit'>Cancel</button></div><button id='del' data-id='"+data[data.length-1]._id+"' class='remove'>X</button></li>").hide().fadeIn(300);
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
                alert("hiba a frissítés során!");
            },
          });
    });    
});