let mark = 0;
let num = 1;
const questionNumber = document.querySelectorAll('.number');
const result = document.querySelector('#result');
const markBlock = document.querySelector('.markBlock');
const fieldset = document.querySelectorAll('.form__fieldset');
const start = document.querySelector('#start');
const formTick = `<div class="form__tick"><i class="fa-solid fa-check"></i></div>`;
const formXmark = `<div class="form__xmark"><i class="fa-solid fa-xmark"></i></div>`;
const liArr = document.getElementsByTagName("li");
const gap = `&nbsp;`
const markSend = document.querySelector('.markSend');



/*numbering the list of questions */
for (i = 0; i < questionNumber.length; i++) {
    questionNumber[i].innerHTML = num++
}

result.addEventListener('click', getResult);

/*get result*/
function getResult(e) {
    e.preventDefault()

    /*determine what is contained in each fieldset: radioBtn or checkbox.*/
    fieldset.forEach(function(el) {
        var radioBtn = el.querySelectorAll('input[type="radio"]');
        var checkbox = el.querySelectorAll("input[type='checkbox']");

        /*checking radioBtn*/
        if (radioBtn.length > 0) {
            var radioBtnCheck = false;
            for (i = 0; i < radioBtn.length; i++) {
                if (radioBtn[i].checked == true && radioBtn[i].value !== 'true') {
                    radioBtn[i].parentElement.style.color = "#de0d0d";
                } else if (radioBtn[i].checked == true && radioBtn[i].value == 'true') {
                    radioBtnCheck = true;
                    radioBtn[i].parentElement.style.color = "#3C790A";
                }
            }

            if (radioBtnCheck) {
                ++mark;
                el.insertAdjacentHTML("afterbegin", formTick);
            } else {
                el.insertAdjacentHTML("afterbegin", formXmark);
            }
            /*checking checkbox*/
        } else {
            var checkboxCheck = true;
            for (i = 0; i < checkbox.length; i++) {
                if (checkbox[i].value == 'true' && checkbox[i].checked == false) {
                    checkboxCheck = false;
                } else if (checkbox[i].value !== 'true' && checkbox[i].checked == true) {
                    checkbox[i].parentElement.style.color = "#de0d0d";
                    checkboxCheck = false;
                } else if (checkbox[i].checked == true) {
                    checkbox[i].parentElement.style.color = "#3C790A";
                }
            }

            if (checkboxCheck) {
                ++mark;
                el.insertAdjacentHTML("afterbegin", formTick);
            } else {
                el.insertAdjacentHTML("afterbegin", formXmark);
            }
        }
    });

    markBlock.innerText += `${mark}  з 10`;

    /*disactivate button after use*/
    this.disabled = true;
    clearInterval(timeCount);

    markSend.value = mark;
}

start.addEventListener('click', showQuestion);
var timeCount;

/*show questions*/
function showQuestion(e) {
    fieldset.forEach(function(el) {
        el.classList.toggle('_active');
    });
    markBlock.classList.toggle('_active');
    result.classList.toggle('_active');
    document.querySelector('.form__istruct').classList.toggle('_hidden');

    timeCount = setInterval(countdownTime, 1000);
    this.disabled = true;
}

/*countdown timer*/
const startMinutes = 10;
let allTime = startMinutes * 60;
const timer = document.querySelector('.timer');

function countdownTime() {
    const minutes = Math.floor(allTime / 60);
    let seconds = allTime % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timer.innerText = `${minutes}:${seconds}`;

    if (allTime == 0) {
        clearInterval(timeCount);
    } else {
        allTime--;
    }
}