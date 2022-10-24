const selectForm = document.forms[0];
const selectFormLength = document.forms[0].length;

var highest;
var lowest;
var median;
var mean;

var data;
var justNumbers;
var bucketArray;
var gradeArray;

var i = 0;
function init() {
  document
    .getElementById("fileInput")
    .addEventListener("change", handleFileSelect, false);
}

function handleFileSelect(event) {
  const reader = new FileReader();
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0]);
}

function handleFileLoad(event) {
  console.log(event);
  data = csvToArray(event.target.result);
  //Stats
  justNumbers = getNumbers(data);
  setNumbers(data);

  //grab all the current buckets
  bucketArray = getBuckets();
  //traverse through justNumbers array to compare current which bucket it would go into
  //store that in an array of 12 items corresponding to the different buckets
  //increment the bucket that number lands in
  gradeArray = checkBuckets(justNumbers, bucketArray);

  //display the number of elements per bucket aka array index
  fillBuckets(gradeArray);
}

function fillBuckets(gradeArray) {
  var length = gradeArray.length;

  for (var i = 0; i < length; i++) {
    var x = (gradeArray[i] / length) * 100;
    x = String(x) + "%";
    gradeArray[i] = x;
  }

  document.getElementById("histoAPlus").style.width = gradeArray[1];
  document.getElementById("histoA").style.width = gradeArray[2];
  document.getElementById("histoAMinus").style.width = gradeArray[3];

  document.getElementById("histoBPlus").style.width = gradeArray[4];
  document.getElementById("histoB").style.width = gradeArray[5];
  document.getElementById("histoBMinus").style.width = gradeArray[6];

  document.getElementById("histoCPlus").style.width = gradeArray[7];
  document.getElementById("histoC").style.width = gradeArray[8];
  document.getElementById("histoCMinus").style.width = gradeArray[9];

  document.getElementById("histoD").style.width = gradeArray[10];
  document.getElementById("histoF").style.width = gradeArray[11];
}

function checkBuckets(justNumbers, bucketArray) {
  var numGradesArray = [];
  //console.log(justNumbers);
  for (var i = 0; i < bucketArray.length; i++) {
    numGradesArray[i] = parseFloat(0);
  }
  for (var i = 0; i < justNumbers.length; i++) {
    if (justNumbers[i] <= bucketArray[0] && justNumbers[i] >= bucketArray[1]) {
      numGradesArray[1]++;
    }
    //s
    else if (
      justNumbers[i] < bucketArray[1] &&
      justNumbers[i] >= bucketArray[2]
    ) {
      numGradesArray[2]++;
    } else if (
      justNumbers[i] < bucketArray[2] &&
      justNumbers[i] >= bucketArray[3]
    ) {
      numGradesArray[3]++;
    } else if (
      justNumbers[i] < bucketArray[3] &&
      justNumbers[i] >= bucketArray[4]
    ) {
      numGradesArray[4]++;
    } else if (
      justNumbers[i] < bucketArray[4] &&
      justNumbers[i] >= bucketArray[5]
    ) {
      numGradesArray[5]++;
    } else if (
      justNumbers[i] < bucketArray[5] &&
      justNumbers[i] >= bucketArray[6]
    ) {
      numGradesArray[6]++;
    } else if (
      justNumbers[i] < bucketArray[6] &&
      justNumbers[i] >= bucketArray[7]
    ) {
      numGradesArray[7]++;
    } else if (
      justNumbers[i] < bucketArray[7] &&
      justNumbers[i] >= bucketArray[8]
    ) {
      numGradesArray[8]++;
    } else if (
      justNumbers[i] < bucketArray[8] &&
      justNumbers[i] >= bucketArray[9]
    ) {
      numGradesArray[9]++;
    } else if (
      justNumbers[i] < bucketArray[9] &&
      justNumbers[i] >= bucketArray[10]
    ) {
      numGradesArray[10]++;
    } else if (
      justNumbers[i] < bucketArray[10] &&
      justNumbers[i] >= bucketArray[11]
    ) {
      numGradesArray[11]++;
    }
  }

  return numGradesArray;
}

function getBuckets() {
  const bucketArray = [];

  for (var i = 0; i < selectFormLength; i++) {
    bucketArray[i] = document.getElementsByClassName("text-end")[i].value;
    //console.log(bucketArray[i]);
  }

  return bucketArray;
}

function setNumbers(data) {
  document.getElementById("highest").textContent =
    data[highest][0] + "(" + data[highest][1] + "%)";
  document.getElementById("lowest").textContent =
    data[lowest][0] + "(" + data[lowest][1] + "%)";
  document.getElementById("mean").textContent = mean;
  document.getElementById("median").textContent = median;
}

function getNumbers(data) {
  const justNumbers = [];
  var j = 0;

  for (var i = 1; i < data.length; i++) {
    justNumbers[j] = parseFloat(data[i][1]);
    j++;
  }

  //Median needs its own array because it sorts it
  const medianArr = Array.from(justNumbers);
  median = median(medianArr);
  mean = mean(justNumbers);

  //Get min/max from grades
  const min = Math.min(...justNumbers);
  const max = Math.max(...justNumbers);

  //Get the index of lowest and highest grades
  //Need to add 1 because justNumbers has 1 less value than the actual data set
  //Since we removed the first value (Student, Grades)
  lowest = justNumbers.indexOf(min) + 1;
  highest = justNumbers.indexOf(max) + 1;

  //   console.log(median);
  //   console.log(mean);
  //   console.log(data[lowest] + " " + lowest);
  //   console.log(data[highest] + " " + highest);

  return justNumbers;
}

function mean(arr) {
  length = arr.length;
  if (length == 0) {
    return;
  }
  var total = 0.0;
  for (var i = 0; i < length; i++) {
    total += arr[i];
  }

  return (total / length).toFixed(2);
}

function median(arr) {
  length = arr.length;
  if (length == 0) {
    return; // 0.
  }
  arr.sort((a, b) => a - b); // 1.
  const midpoint = Math.floor(length / 2); // 2.
  const median =
    length % 2 === 1
      ? arr[midpoint] // 3.1. If odd length, just take midpoint
      : (arr[midpoint - 1] + arr[midpoint]) / 2; // 3.2. If even length, take median of midpoints
  return median;
}

function csvToArray(csv) {
  rows = csv.split("\n");

  return rows.map(function (row) {
    return row.split(",");
  });
}

function check(input, index) {
  for (var i = 0; i < selectFormLength - 1; i++) {
    //Check which form the error belongs to
    var error = checkError(i);
    var curr = document.getElementsByClassName("text-end")[i].value;
    var next = document.getElementsByClassName("text-end")[i + 1].value;

    //console.log(curr + " " + next);
    if (parseFloat(curr) <= parseFloat(next)) {
      error.textContent = "Please enter a valid number";
      error.style.color = "red";


    } else {
        
      error.textContent = "";
    }
  }
}

function checkError(i) {
  var error;
  switch (i) {
    case 0:
      error = document.getElementById("error0");
      return error;
    case 1:
      error = document.getElementById("error1");
      return error;
    case 2:
      error = document.getElementById("error2");
      return error;
    case 3:
      error = document.getElementById("error3");
      return error;
    case 4:
      error = document.getElementById("error4");
      return error;
    case 5:
      error = document.getElementById("error5");
      return error;
    case 6:
      error = document.getElementById("error6");
      return error;
    case 7:
      error = document.getElementById("error7");
      return error;
    case 8:
      error = document.getElementById("error8");
      return error;
    case 9:
      error = document.getElementById("error9");
      return error;
    case 10:
      error = document.getElementById("error10");
      return error;
    case 11:
      error = document.getElementById("error11");
      return error;
  }
}
