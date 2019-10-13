let video;
var synth = window.speechSynthesis;
// Create a KNN classifier
const knnClassifier = ml5.KNNClassifier();
let poseNet;
let poses = [];
var counter = 0;

const countFlag = {
  a:0,
  b:0,
  reps:0,
  abool:false,
  bbool:false 
}


function changecolor() {
  console.log('chnaging color')
  $('#done').removeClass('label label-warning').addClass('label label-success');
  $(this).addClass('label label-success').removeClass('label label-success ');
}


function changecolorRed() {
  console.log('chnaging color')
  $('#done').removeClass('label label-success').addClass('label label-warning');
  $(this).addClass('llabel label-warning').removeClass('label label-warning');
}

function speak() {
  if(counter < 1){
    counter++
    let msg = 'Great Job, Physical Therapist Notified, You have earned 3 stars.'
  var speech = new SpeechSynthesisUtterance(msg);
  speechSynthesis.speak(speech);
//jons dad what if 


  //true if speaking 
  var amISpeaking = speech.speaking

  amISpeaking ? null : speech.cancel();

  }
  
 




 // utterance1 stops being spoken immediately, and both are removed from the queue
}


function setup() {
  const canvas = createCanvas(640, 480);
  canvas.parent('videoContainer');
  video = createCapture(VIDEO);
  video.size(width, height);
  // Create the UI buttons
  createButtons();

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

function modelReady(){
  select('#status').html('model Loaded')
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected

  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
     
         
         
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

// Add the current frame from the video to the classifier
function addExample(label) {
  // Convert poses results to a 2d array [[score0, x0, y0],...,[score16, x16, y16]]
  if(poses.length >= 1 ){

    const poseArray = poses[0].pose !== undefined ? poses[0].pose.keypoints.map(p => [p.score, p.position.x, p.position.y]): []
    // Add an example with a label to the classifier
    knnClassifier.addExample(poseArray, label);
    updateCounts();
  }

}

// Predict the current frame.
function classify() {
  // Get the total number of labels from knnClassifier
  const numLabels = knnClassifier.getNumLabels();
  if (numLabels <= 0) {
    console.error('There is no examples in any label');
    return;
  }
  // Convert poses results to a 2d array [[score0, x0, y0],...,[score16, x16, y16]]
  
  if(poses.length > 0){
    const poseArray =  poses[0].pose.keypoints.map(p => [p.score, p.position.x, p.position.y])
    knnClassifier.classify(poseArray, gotResults);
  }

  // Use knnClassifier to classify which label do these features belong to
  // You can pass in a callback function `gotResults` to knnClassifier.classify function

}

// A util function to create UI buttons
function createButtons() {
  // When the A button is pressed, add the current frame
  // from the video with a label of "A" to the classifier
  buttonA = select('#addClassA');
  buttonA.mousePressed(function() {
    addExample('A');
  });

  // When the B button is pressed, add the current frame
  // from the video with a label of "B" to the classifier
  buttonB = select('#addClassB');
  buttonB.mousePressed(function() {
    addExample('B');
  });

  // Reset buttons
  resetBtnA = select('#resetA');
  resetBtnA.mousePressed(function() {
    clearLabel('A');
  });
    
  resetBtnB = select('#resetB');
  resetBtnB.mousePressed(function() {
    clearLabel('B');
  });

  // Predict button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);

  // Clear all classes button
  buttonClearAll = select('#clearAll');
  buttonClearAll.mousePressed(clearAllLabels);
}
// Show the results
function gotResults(err, result) {
  // Display any error
 
try{

  if (result.confidencesByLabel) {
    const confidences = result.confidencesByLabel;
  
    // console.log(result)
   
    // result.label is the label that has the highest confidence
    if (result.label) {
    
      console.log(result.label)
      // console.log( confidences[result.label] * 100)
      result.label === 'A' && confidences[result.label] * 100 >= 98 ? countFlag.abool = true : null
      result.label === 'B' &&  confidences[result.label] * 100 >= 98 ? countFlag.bbool = true : null

      if(countFlag.abool && countFlag.bbool){
        
        countFlag.abool = false
        countFlag.bbool = false
        countFlag.reps++
        let countExe = document.getElementById('exerciseDone');
        countExe.innerHTML = countFlag.reps
      }



      select('#result').html('Result: '+result.label);
      select('#confidence').html('Confidence: '+`${confidences[result.label] * 100} %`);
    
      
    }
  }

  classify();

  if(countFlag.reps === 3){
    console.log('hello')
    changecolor()
    speak()
  
  }else if (countFlag.reps > 3){
    countFlag.reps = 0
    let countExe = document.getElementById('exerciseDone');
    countExe.innerHTML = countFlag.reps

    changecolorRed()

  }
  }catch(e){
    if (e) {
      console.error(e);
    }
  }
}

// Update the example count for each label  
function updateCounts() {
  const counts = knnClassifier.getCountByLabel();

  select('#exampleA').html('Example A: '+counts['A'] || 0);
  select('#exampleB').html('Example B: '+counts['B'] || 0);
}

// Clear the examples in one label
function clearLabel(classLabel) {
  knnClassifier.clearLabel(classLabel);
  updateCounts();
}

// Clear all the examples in all labels
function clearAllLabels() {
  knnClassifier.clearAllLabels();
  updateCounts();
}

