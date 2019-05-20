let done = false;


function buildStart(){
    $('.countdown').empty();
    $('.countdown').append(()=>{
        return `
        <form>
            <div>
                <label for="hours">Hours: </label>
                <input type="text" id="hours"  value="0" maxlength="2">
            </div>
            <div>
                <label for="mins">Minutes: </label>
                <input type="text" id="mins"  value="0" maxlength="2">
            </div>
            <div>
                <label for="secs">Secounds: </label>
                <input type="text" id="secs"  value="0" maxlength="2">
            </div>
            <button type="submit" class="startBtn">START</button>
        </form>
        `;
    });
}

function buildCountdown(hours, mins, secs){
    $('.countdown').empty();
    $('.countdown').append(()=>{
        return `
        <div class="countingWithBtn">
            <div class="counting">
                <div>
                    <p class="hoursP">${hours}</p>
                    <p>HOURS</p>
                </div>
                <div>
                    <p class="minsP">${mins}</p>
                    <p>MINUTES</p>
                </div>
                <div>
                    <p class="secsP">${secs}</p>
                    <p>SECOUNDS</p>
                </div>
            </div>
            <button class="stopBtn" onclick="stop(event)">STOP</button>
        </div>
        `;
    });
}

function startCountdown(e){
    e.preventDefault();
    let target = e.target;
    countdown(target[0].value, target[1].value, target[2].value);
}

function countDone(){
    $('.countdown').empty();
    $('.countdown').append(()=>{
        return `
        <div class="done">
            <p>DONE</p>
            <button class="stopBtn" onclick="stop(event)">RESET</button>
        </div>
        `;
    });
}

function countdown(hours, mins, secs){
    let i = eval(`${secs} + (${mins} * 60) + (${hours} * 3600)`);
    buildCountdown(hours, mins, secs);
    done = false;
    var time = setInterval(() => {
        secs--;
        if(secs<0){
            mins--;
            secs=59;
        }
        if(mins<0){
            hours--;
            mins=59;
        }
        buildCountdown(hours, mins, secs)
        i--;
        if(done) clearInterval(time);
        
        if(i<=0){
            clearInterval(time);
            countDone();
        }
    }, 1000);
}


function stop(e){
    e.preventDefault();
    done = true;
    setTimeout(buildStart, 1000);
    location.reload();
}



$(document).ready(()=>{
    buildStart();
    $('form').submit(startCountdown);
    $('.stopBtn').trigger(stop);
});