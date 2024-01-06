// Getting all the elements
const startBtn = document.getElementById("start-btn");
const screen2 = document.getElementById("screen2");
const screen1 = document.getElementById("screen1");
const screen3 = document.getElementById("screen3");
const Continue = document.getElementById("continue");
const next = document.getElementById("next");
const totalQue = document.getElementById("total-que");
const TotalQuestions = document.getElementById("total-que");
const submit = document.getElementById("submit");
let optionList = document.getElementById("option-list");
let option = document.getElementsByClassName("option");
let timeCount = document.getElementById("timer");
let timeLine = document.getElementById("timeLine");
const screen4 = document.getElementById("screen4");
const scoreText = document.getElementById("score_text");

let countScore = 0;
// When Start button is clicked
startBtn.addEventListener("click" , ()=>{
    screen2.style.display = "block";
    screen1.style.display = "none";
})

// When Quit button is clicked
quit.addEventListener("click" , ()=>{
    screen1.style.display = "block";
    screen2.style.display = "none";  
})

// When Continue button is clicked
Continue.addEventListener("click" , ()=>{
    screen3.style.display = "block";
    screen2.style.display = "none"; 
    showQuestions(0);
    Count(1);
    StartTimer(15);
    StartTimerLine(15);
})

// When Next Button is Clicked
let counter;
let CountingTime = 15;
let Width = 549;
let numb = 0;
next.addEventListener("click" , ()=>{
    numb++;
    if(numb>=0){
        showQuestions(numb);
        Count(numb+1);
        clearInterval(counter);
        StartTimer(CountingTime);
        clearInterval(counterLine);
        StartTimerLine(Width);
        next.style.display = "none";
    }
    else{
        clearInterval(counter);
        clearInterval(counterLine);
    }
})

// Function That shows Questions
function showQuestions(index){
    let QueryHTML = " ";
    QueryHTML += `  <div class="que_text p-3 font-bold text-xl">             
    ${questions[numb].question}
     
     </div>
    <div class="option_list" id="option_list">
    <div class="option">${questions[index].options[0]}</div>
    <div class="option">${questions[index].options[1]}</div>
    <div class="option">${questions[index].options[2]}</div>
    <div class="option">${questions[index].options[3]}</div>
    </div> `
    query.innerHTML = QueryHTML;

    for (let i = 0; i < option.length; i++) {
       option[i].setAttribute("onclick" , "optionSelected(this)");   
    }
}

let tickIcon = `<div><i class="fa-regular fa-circle-check fa-xl"></i></div>`;
let CrossIcon = `<div><i class="fa-regular fa-circle-xmark fa-xl"></i></div>`;

// Function to Select Options
function optionSelected(answer) {
    let UserAns = answer.textContent;
    let correctAns = questions[numb].answer;
    clearInterval(counter);
    clearInterval(counterLine);
    if(UserAns == correctAns){
        countScore += 1;
        answer.classList.add("option-correct"); 
        answer.insertAdjacentHTML("beforeend" , tickIcon);
    }
    else{
        answer.classList.add("option-wrong");
        answer.insertAdjacentHTML("beforeend" , CrossIcon); 
        for (let i = 0; i < option.length; i++) {
            if(option[i].textContent == correctAns){
                console.log(option[i].textContent)
                option[i].classList.add("option-correct"); 
                option[i].insertAdjacentHTML("beforeend" , tickIcon);
                
            }  
        }
    }

// Once option is selected disable the click
    for (let i = 0; i < option.length; i++) {
      option[i].classList.add("disabled");
}

// Display next and submit option
if(numb+1 == questions.length)
    {
    submit.style.display = "block";
    next.style.display = "none";
}
else{
    next.style.display = "block";
}
}

// Function to count total Questions
 function Count(numb){
     let CountHTML = "";
     CountHTML += `${numb} out of ${questions.length}`;
     TotalQuestions.innerHTML = CountHTML;
} 

// Function To set Timer 

function StartTimer(time){

        counter = setInterval(timing, 1000);

  function timing(){
      timeCount.innerHTML = `<div class="timer-sec ml-2 font-bold" id="timer-sec">${time} Seconds Left</div>`;
    time--;
    if(time < 0){
        timeCount.innerHTML = `<div class="timer-sec ml-2 font-bold" id="timer-sec">00 Time is Up!</div>`;
        for (let i = 0; i < option.length; i++) {
            option[i].classList.add("disabled");
      }
      next.style.display = "block";
    }
}
}

// Function To set TimerLine 
function StartTimerLine(time){
    counterLine = setInterval(timing, 30);
    let timeline = 549;
  function timing(){
      timeline -= 1;
      timeLine.style.width = timeline + "px";
     if(timeline < 0){
       clearInterval(counterLine);
      }
}
}

// When Submit Button is Clicked
submit.addEventListener("click" , ()=>{
    screen3.style.display = "none";
    screen4.style.display = "block";
    let scoreTextHTML = "";

    let percentage = (countScore/(questions.length)) * 100;
     if( percentage == 100 || percentage >= 80){
        scoreTextHTML += `<div class="font-bold text-lg">You've Got ${countScore} out of ${questions.length} Questions Correct!<br><span class="ml-[140px]">Excellent!</span></div>`;
     }
     else if(percentage < 100 && percentage >= 50 ){
        scoreTextHTML += `<div class="font-bold text-lg">You've Got ${countScore} out of ${questions.length} Questions Correct!<br><span class="ml-[140px]">Good Job!</span></div>`;
     }
     else
     {
        scoreTextHTML += `<div class="font-bold text-lg">You've Got ${countScore} out of ${questions.length} Questions Correct!<br><span class="ml-[100px]">You should work Hard!</span></div>`;
     }
    scoreText.innerHTML = scoreTextHTML;
 })

// Replay Quiz
function replayQuiz(){
    window.location.reload();
}