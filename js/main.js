var audio;

//Hide pause button
$('#pause').hide();

//Initialize Audio
initAudio($('#playlist li:first-child'));


//Initializer Function
function initAudio(element)
{
	var song = element.attr('song');
	var title = element.text();
	var cover = element.attr('cover');
	var artist = element.attr('artist');

//Create audio object
	audio=new Audio('audio/'+ song);
	audio.loop = true;
	if(!audio.currentTime)
	$('#duration').html('0:00');

	$('#audio-player .title').text(title);
	$('#audio-player .artist').text(artist);
// Insert Cover
	$('img.cover').attr('src','images/covers/'+cover);

	$('#playlist li').removeClass('active');
	element.addClass('active');
	
}
//Play button
$('#play').click(function(){
audio.play();
$('#play').hide();
$('#pause').show();
$('#duration').fadeIn(400);	
showDuration();
});
//Pause button
$('#pause').click(function(){
audio.pause();
$('#pause').hide();
$('#play').show();
$('#duration').fadeIn(400);	
showDuration();
});
//Stop Button
$('#stop').click(function(){
audio.pause();
audio.currentTime=0;
$('#play').show();
$('#pause').hide();
$('#duration').fadeOut(400);	
showDuration();
});
//Next button
$('#next').click(function(){
audio.pause();
var next=$('#playlist li.active').next();
if(next.length==0)
	next=$('#playlist li:first-child');
initAudio(next);
audio.play();
$('#play').hide();
$('#pause').show();	
$('#duration').fadeIn(400);	
showDuration();
});
//Prev button
$('#prev').click(function(){
audio.pause();
var prev=$('#playlist li.active').prev();
if(prev.length==0)
	prev=$('#playlist li:last-child');
initAudio(prev);
audio.play();
$('#play').hide();
$('#pause').show();	
$('#duration').fadeIn(400);	
showDuration();
});
//Volume Control
$('#volume').change(function(){
	audio.volume=parseFloat(this.value / 100);
});
//Time Duration
function showDuration(){
	$(audio).bind('timeupdate',function(){
		//Get Minutes and Seconds
		var s= parseInt(audio.currentTime % 60);
		var m= parseInt((audio.currentTime)/60)% 60;
		//Add 0 if less than 10
		if(s<10)
			s='0'+s;
		$('#duration').html(m + '.' + s);
		var value=0;
		if(audio.currentTime > 0){
			value = Math.floor((100/audio.duration) * audio.currentTime);
			
		}
		$('#progress').css('width',value+'%');
	})
}

