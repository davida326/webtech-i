function initialFunction(){
    $("#content").load("exclusive.html").hide().slideDown(500);
    
};
 $(document).ready(function(){
    $("#cars").on("click",function(event){
        event.preventDefault();
        $("#content").css("height","100%")
        $("#content").load("cars.html").hide().slideDown(500);
        $(".container").css("height","100%");
    });
    $("#exc").on("click",function(event){
        event.preventDefault();
        $("#content").css("height","700px");
        $("#content").load("exclusive.html").hide().slideDown(500);;
        $(".container").css("height","1200px");
    });
    $("#manu").on("click",function(event){
        event.preventDefault();
        $("#content").css("height","100%");
        $("#content").load("manufacturers.html").hide().slideDown(500);
        $(".container").css("height","100%");
    });
    
});
    
