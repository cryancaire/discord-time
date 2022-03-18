const tzPicker = document.querySelector('.tz-picker-container .form-select');
const dtPicker = document.querySelector('.date-time-picker');
const stylePicker = document.querySelector('.stlye-select');
const resultInput = document.querySelector('.result-input');
const resultPane = document.querySelector('.result-pane');

let tz, dt, style;
let finalDate;
let finalCode;

tzArray.forEach(timezone => {
    let opt = document.createElement('option');
    opt.value = timezone.utc[0];
    opt.innerHTML = timezone.text;
    tzPicker.appendChild(opt);
});

resultInput.addEventListener("click", e => {
    navigator.clipboard.writeText(finalCode);
    resultPane.classList.add('flash');
    setTimeout(() => {
        resultPane.classList.remove('flash');
    }, 250);
});

stylePicker.addEventListener("change", e => {
    style = e.target.value;
    checkAllInputs();
});

tzPicker.addEventListener("change", e => {
    tz = e.target.value;
    checkAllInputs();
});

dtPicker.addEventListener("change", e => {
    dt = e.target.value;

    checkAllInputs();
});


function convertTime(dt, tz) {
    let date = new Date(dt).toLocaleString("en-US", {timeZone: tz})

    let newDate = new Date(date.valueOf());
    newDate = newDate/1000;
    finalDate = newDate;
}

function checkAllInputs () {
    if (tzPicker.value && dtPicker.value && stylePicker.value) {
        convertTime(dtPicker.value, tzPicker.value);
        formatAndCopy(finalDate, stylePicker.value);
    }
 }

function formatAndCopy(ts, style){
    let textToCopy;
    switch (style) {
        case "1" : 
            textToCopy = `<t:${ts}:d>`;
            break;
        case "2" : 
            textToCopy = `<t:${ts}:D>`;
            break;
        case "3" : 
            textToCopy = `<t:${ts}:t>`;
            break;
        case "4" : 
            textToCopy = `<t:${ts}:T>`;
            break;
        case "5" : 
            textToCopy = `<t:${ts}:f>`;
            break;
        case "6" : 
            textToCopy = `<t:${ts}:F>`;
            break;
        case "7" : 
            textToCopy = `<t:${ts}:R>`;
            break;
        default:
            textToCopy = "";
            break;
    }
    
    navigator.clipboard.writeText(textToCopy);
    finalCode = textToCopy;
    resultPane.classList.add('show');
    resultInput.textContent = "Copied to clipboard: " + textToCopy;
}
