audioplayer();
function audioplayer(){
var currentsong=0;
$("#audioplayer")[0].src=$("#playlist li a")[0];
$("#audioplayer")[0].play();
$("#playlist li a").click(function(e){
e.preventDefault();
$("#audioplayer")[0].src=this;
$("#audioplayer")[0].play();
$("#playlist").removeClass("current-song");
currentsong=$(this).parent().index();
$(this).parent().addClass("current-song");
});

$("#audioplayer")[0].addEventListener("ended",function(){
 currentsong++;
 if(currentsong==$("#playlist li a").length)
currentsong=0;
$("#playlist li").removeClass("current-song");
$("#playlist li:eq("+currentsong+") ").addClass("current-song");
$("#audioplayer")[0].src=$("#playlist li a")[currentsong].href;
$("#audioplayer")[0].play();

});


    // alert("hi");
}