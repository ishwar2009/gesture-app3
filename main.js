Webcam.set({
    width:370,
    height:310,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');

prediction1="";
prediction2="";

function takesnapshot(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
    console.log("picture")
}

console.log('ml5 version:',ml5.version);
var classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/tXA9DJWaW/model.json',modelLoaded);
function modelLoaded(){
    console.log("model loaded!");
}
function speak(){
    var synth=window.speechSynthesis;
   speakdata1="the first prediction is"+prediction1;
   speakdata2="the second prediction is"+prediction2;
   var utterthis=new SpeechSynthesisUtterance(speakdata1,speakdata2);
   synth.speak(utterthis);

}
function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img, gotresult);
}
function gotresult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML= results[0].label;
        document.getElementById("result_emotion_name2").innerHTML= results[1].label;
        prediction1= results[0].label;
        prediction2= results[1].label;
        speak();
        if(results[0].label == "thumbs up"){
            document.getElementById("result_emoji").innerHTML="&#128077";
        }
        if(results[0].label=="peace"){
            document.getElementById("result_emoji").innerHTML="&#9996";
        }
        if(results[0].label=="wave"){
            document.getElementById("result_emoji").innerHTML="&#128075";
        }
        if(results[0].label=="rock"){
            document.getElementById("result_emoji").innerHTML="&#129304";
        }
        if(results[0].label=="stop"){
            document.getElementById("result_emoji").innerHTML="&#9995";
        }
        if(results[1].label == "thumbs up"){
            document.getElementById("result_emoji2").innerHTML="&#128077";
        }
        if(results[1].label=="peace"){
            document.getElementById("result_emoji2").innerHTML="&#9996";
        }
        if(results[1].label=="wave"){
            document.getElementById("result_emoji2").innerHTML="&#128075";
        }
        if(results[1].label=="rock"){
            document.getElementById("result_emoji2").innerHTML="&#129304";
        }
        if(results[0].label=="stop"){
            document.getElementById("result_emoji2").innerHTML="&#9995";
        }  
    }
    
}
