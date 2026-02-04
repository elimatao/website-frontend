document.addEventListener('DOMContentLoaded', function(){
    const configBtn = document.querySelector('#LEDConfig');
    const submitForm = document.querySelector('#LEDSubmit');
    const backBtn = document.querySelector('#back');
    const modeSelect = document.querySelector('#LEDMode');

    if(configBtn) configBtn.onclick = LEDGame;
    if(submitForm) submitForm.onsubmit = () => { clicked = true; return false; };
    if(backBtn) backBtn.onclick = returnToStart;
    if(modeSelect) modeSelect.onchange = LEDModeControl;
});

function endGame(){
    document.getElementById('gameCont').classList.add('hidden');
    // Show back button with shadcn-like button styling
    const back = document.querySelector("#back");
    back.classList.remove('hidden');
    back.className = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mx-auto";
}

function startGame(){
    document.getElementById("StartCont").classList.add('hidden');
    document.getElementById("gameCont").classList.remove('hidden');
    document.getElementById("result").classList.remove('hidden');
}

function returnToStart(){
    document.querySelector('#back').classList.add('hidden');
    document.querySelector('#result').classList.add('hidden');
    document.querySelector('#result').innerHTML = "";
    document.querySelector('#StartCont').classList.remove('hidden');
}

function LEDModeControl(){
    const mode = document.querySelector('#LEDMode').value;
    const rounds = document.getElementById("rounds");
    const LEDDiv = document.getElementById("LEDDiv");
    
    // Using Tailwind arbitrary values for specific percentages
    const imgClass = mode === "normal" ? "LED w-[11%] aspect-square object-contain" : "LED w-[9%] aspect-square object-contain";
    const count = mode === "normal" ? 8 : 10;
    
    rounds.min = mode === "normal" ? 3 : 5;
    rounds.value = rounds.min;

    let html = "";
    for(let i=0; i<count; i++) {
        html += `<img class="${imgClass}" src="/images/LEDOff.png" alt="LED">`;
    }
    LEDDiv.innerHTML = html;
}

async function LEDGame() {   
    startGame();
    const leds = document.querySelectorAll('.LED');
    const mode = document.querySelector('#LEDMode').value;
    const rounds = document.querySelector('#rounds').value;
    let totalResult = 0;

    for (let i = 0; i < rounds; i++) {
        document.querySelector('#currentRound').innerHTML = `Ronda ${i + 1} de ${rounds}`;
        
        // Reset LEDs
        leds.forEach(led => led.src = "/images/LEDOff.png");
        document.querySelector('#guessedNumber').value = 0;
        
        const maxNum = mode === "normal" ? 256 : 1024;
        const bitCount = mode === "normal" ? 8 : 10;
        const number = Math.floor(Math.random() * maxNum);
        
        bin(number, bitCount - 1, leds);
        
        const timeBefore = new Date().getTime();
        await waitEvent();
        
        let roundResult;
        const guessedNumber = document.querySelector('#guessedNumber').value;
        const resultDiv = document.querySelector('#result');

        if (number == guessedNumber) {
            roundResult = new Date().getTime() - timeBefore;
            // Shadcn "Success" style
            resultDiv.innerHTML += `
                <div class="flex items-center p-3 mb-2 rounded-lg border border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                    <span class="mr-3">✔</span> +${roundResult / 1000}s
                </div>`;
        } else {
            roundResult = mode === "normal" ? 30000 : 40000;
            // Shadcn "Destructive" style
            resultDiv.innerHTML += `
                <div class="flex items-center p-3 mb-2 rounded-lg border border-destructive/50 bg-destructive/10 text-destructive font-medium">
                    <span class="mr-3">✘</span> +${roundResult / 1000}s
                </div>`;
        }
        totalResult += roundResult;
    }

    totalResult = Math.round(totalResult / rounds);
    const lang = get_language();
    const label = lang === "es" ? "MEDIA" : (lang === "de" ? "ERGEBNIS" : "AVERAGE");

    // Result summary card style
    document.querySelector('#result').innerHTML += `
        <div class="mt-4 p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
            <p class="text-sm text-muted-foreground uppercase tracking-wider">${label}</p>
            <p class="text-3xl font-bold">${totalResult / 1000}s</p>
        </div>`;
    
    endGame();
    return false;
}

function bin(n, pos, leds) {
    if (n < 1 || pos < 0) return;
    if (n % 2 == 1) leds[pos].src = "/images/LEDOn.png";
    bin(Math.floor(n / 2), pos - 1, leds);
}

var clicked = false;
async function waitEvent(){
    clicked = false;
    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (clicked) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });
}

function get_language(){
    return document.documentElement.lang || "en";
}