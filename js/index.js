function initialFunction(){
    $("#content").load("exclusive.html").hide().slideDown(500);
    
};
 $(document).ready(function(){
    $("#cars").on("click",function(event){
        event.preventDefault();
        $("#content").css("height","900px")
        $("#content").load("cars.html").hide().slideDown(500);
    });
    $("#exc").on("click",function(event){
        event.preventDefault();
        $("#content").css("height","700px");
        $("#content").load("exclusive.html").hide().slideDown(500);;
        
    });
    $("#manu").on("click",function(event){
        event.preventDefault();
        $("#content").css("height","700px");
        $("#content").load("manufacturers.html").hide().slideDown(500);
        
        
    });
    
});
    
