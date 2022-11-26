objects = [];
function setup() {
    canvas = createCanvas(350, 350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(350, 350);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting objects";
    object_name = document.getElementById("object_name").value;
}

img = "";
status = "";

function modelLoaded() {
    console.log("model is loaded");
    status = true;

}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw() {
    image(video, 0, 0, 350, 350);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object detected";
            document.getElementById("no_of_objects").innerHTML = "Number of objects detected: " + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (object[i].label == object_name) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = object_name + "found!";
                synth = window.speechSynthesis();
                utterThis= new SpeechSynthesisUtterance(object_name+"found");
                synth.speak(utterThis); 
        
            }
            else { 
                document.getElementById("object_status").innerHTML = object_name + "Not found!";
            }
        }
    }

}