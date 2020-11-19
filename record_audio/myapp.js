var x;
var startstop = 0;
let recordedUsing = false;

// function startStop() { /* Toggle StartStop */
//   startstop = startstop + 1;
//   if (startstop === 1) {
//     start();
//     document.getElementById("start").innerHTML = "Stop";
//   } else if (startstop === 2) {
//     document.getElementById("start").innerHTML = "Start";
//     startstop = 0;
//     stop();
//   }
// }

function start() {
  x = setInterval(timer, 10);   ////// it was 10 ===================
} /* Start */
function stop() {
  clearInterval(x);
} /* Stop */
var milisec = 0;
var sec = 0; /* holds incrementing value */
var min = 0;
var hour = 0;
/* Contains and outputs returned value of  function checkTime */
var miliSecOut = 0;
var secOut = 0;
var minOut = 0;
var hourOut = 0;
/* Output variable End */
function timer() {
  /* Main Timer */
  miliSecOut = checkTime(milisec);
  secOut = checkTime(sec);
  minOut = checkTime(min);
  hourOut = checkTime(hour);

  milisec = ++milisec;

  if (milisec === 100) {
    milisec = 0;
    sec = ++sec;
  }

  if (sec == 60) {
    min = ++min;
    sec = 0;
  }

  if (min == 60) {
    min = 0;
    hour = ++hour;

  }
  // document.getElementById("milisec").innerHTML = miliSecOut;
  // document.getElementById("sec").innerHTML = secOut;
  // document.getElementById("min").innerHTML = minOut;
  // document.getElementById("hour").innerHTML = hourOut;
  document.getElementById('record-time').innerText = `${minOut}:${secOut}`;

}


/* Adds 0 when value is <10 */


function checkTime(i) {
  if (i < 10) {     ///// it was 10 =============
    i = "0" + i;
  }
  return i;
}

function reset() {
  /*Reset*/

  milisec = 0;
  sec = 0;
  min = 0
  hour = 0;
}


// =============================================================================================================================================================




const recordAudio = () => {
  return new Promise(resolve => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        const start = () => {
          mediaRecorder.start();
        };

        const stop = () => {
          return new Promise(resolve => {
            mediaRecorder.addEventListener("stop", () => {
              const audioBlob = new Blob(audioChunks, {type:'audio/mpeg-3'}); //mpeg-3
              const audioUrl = URL.createObjectURL(audioBlob);
              const audio = new Audio(audioUrl);

              const play = () => {
                audio.play();
              };

              resolve({ audioBlob, audioUrl, play });
            });

            mediaRecorder.stop();
            let track = stream.getAudioTracks()[0];
            track.stop();
          });
        };

        resolve({ start, stop });
      });
  });
};

InboxSDK.load(2, 'sdk_NatApp_7b065e53fa').then(function(sdk){

    // the SDK has been loaded, now do something with it!
    sdk.Compose.registerComposeViewHandler(function(composeView){
      let statusBar;
      let recorder;
      let recordBtn = document.getElementById('record');
      let stopRecordBtn = document.getElementById('stopRecord');

      // ===============================================================================================================

      let t = chrome.extension.getURL("images/icon_white.png"),
      o = document.createElement("div");
      o.id = "record-div";
      let n = `\n        <div id="discard-wrapper" class="hidden">\n            <img id="discard-audio" data-tooltip="Discard" aria-label="Discard" src=${chrome.extension.getURL(
          "images/close.png"
      )}>\n        </div>\n        <div id="content-blue-wrapper">\n            <img src='${t}' id='record-img'/>\n            <img id="save-audio" class="hidden" data-tooltip="Save" aria-label="Save" src=${chrome.extension.getURL(
          "images/check.png"
      )}>\n            <label class="hidden" id="record-time">0:00</label>\n        </div>\n    `;
      o.innerHTML = n;
      var r = composeView.getBodyElement().closest("div.AD");
      let b = (null === r && (r = composeView.getBodyElement().closest("div.M9")), r.querySelector(".gU.Up  > .J-J5-Ji").parentElement.appendChild(o), o);
      // queryselectors here for record, discard, and save
      (y = b.querySelector("#record-time")),
        b.querySelector("#record-img").addEventListener("click", async() => {
            // actions to perform when record btn is clicked... i()
            b.querySelector("#content-blue-wrapper").classList.add("recording"),
            b.querySelector("#content-blue-wrapper").classList.remove("not-recording"),
            b.querySelector("#content-blue-wrapper").style.width = '92px';
            b.querySelector("#discard-wrapper").classList.remove("hidden"),
            b.querySelector("#discard-wrapper").classList.add("not-hidden"),
            b.querySelector("#record-img").classList.add("hidden"),
            b.querySelector("#record-img").classList.remove("not-hidden"),
            b.querySelector("#record-time").classList.add("not-hidden"),
            b.querySelector("#record-time").classList.remove("hidden"),
            b.querySelector("#save-audio").classList.add("not-hidden"),
            b.querySelector("#save-audio").classList.remove("hidden");
            console.log('recordBtn was clicked');
            recorder = await recordAudio();
            recorder.start();
            start();
        }),
        b.querySelector("#discard-audio").addEventListener("click", async() => {
            // s()
            b.querySelector("#content-blue-wrapper").classList.add("not-recording"),
            b.querySelector("#content-blue-wrapper").style.width = '33px';
            b.querySelector("#discard-wrapper").classList.add("hidden"),
            b.querySelector("#discard-wrapper").classList.remove("not-hidden"),
            b.querySelector("#record-img").classList.remove("hidden"),
            b.querySelector("#record-img").classList.add("not-hidden"),
            b.querySelector("#record-time").classList.remove("not-hidden"),
            b.querySelector("#record-time").classList.add("hidden"),
            b.querySelector("#save-audio").classList.remove("not-hidden"),
            b.querySelector("#save-audio").classList.add("hidden");
            await recorder.stop();
            stop();
            reset();
        }),
        b.querySelector("#save-audio").addEventListener("click", async() => {
            // s()
            b.querySelector("#content-blue-wrapper").classList.add("not-recording"),
            b.querySelector("#content-blue-wrapper").style.width = '33px';
            b.querySelector("#discard-wrapper").classList.add("hidden"),
            b.querySelector("#discard-wrapper").classList.remove("not-hidden"),
            b.querySelector("#record-img").classList.remove("hidden"),
            b.querySelector("#record-img").classList.add("not-hidden"),
            b.querySelector("#record-time").classList.remove("not-hidden"),
            b.querySelector("#record-time").classList.add("hidden"),
            b.querySelector("#save-audio").classList.remove("not-hidden"),
            b.querySelector("#save-audio").classList.add("hidden");
            if (statusBar) {
              statusBar.destroy();
            }
            statusBar = composeView.addStatusBar({height:55});
            statusBarCreated = true;
            statusBar.el.innerHTML = `<audio id="recordedAudio" style="margin-left: 22px;width: 500px;height: 40px;margin-top: 9px;" src="" controls="" autoplay=""></audio>`;
            let recordedAudioPlayback = document.getElementById('recordedAudio');
            const audio = await recorder.stop();
            console.log(audio.audioBlob);
            const file = new File([audio.audioBlob], `NatApp_recording.mp3`, {type: audio.audioBlob.type})
            composeView.attachFiles([file]);
            recordedAudioPlayback.src = audio.audioUrl;
            recordedAudioPlayback.controls = true;
            recordedAudioPlayback.autoplay = true;
            stop();
            reset();
            recordedUsing = true;
        });

        //Lower

    //    console.log(recordBtn);
    //  recordBtn.addEventListener('click', async () => {
    //    console.log('recordBtn was clicked');
    //   recorder = await recordAudio();
    //    recordBtn.disabled = true;
    //    recordBtn.style.backgroundColor = "red"
    //    stopRecordBtn.disabled=false;
    //    recorder.start();
    //  })
    //    stopRecordBtn.addEventListener('click', async () => {
    //    recordBtn.disabled = false;
    //    recordBtn.style.backgroundColor = "#7367F0";
    //   stopRecordBtn.disabled = true;
    //    const audio = await recorder.stop();
    //    console.log(audio.audioBlob);
    //    const file = new File([audio.audioBlob], `NatApp_recording.mp3`, {type: audio.audioBlob.type})
    //    composeView.attachFiles([file]);
    //    recordedAudioPlayback.src = audio.audioUrl;
    //    recordedAudioPlayback.controls = true;
    //    recordedAudioPlayback.autoplay = true;
    //    let emailBodyBefore = composeView.getHTMLContent();
    //    composeView.setBodyHTML(emailBodyBefore + '\n            <div><br></div>\n            <div id="footer">\n                <a href="http://Nat.app" target="_blank" style="color: #7367F0; text-decoration: none;">\n                    <img src="https://i.ibb.co/zbpGMNm/Just-Logo-Without-Background.png" style="vertical-align: middle; width: 40px; padding-right: 10px;">Recorded with <b>Nat.app</b>\n                </a>\n            </div>\n            ');
    //   })

    //    document.getElementById('btn').addEventListener('click', async () => {
    //     const response = await fetch('https://m.media-amazon.com/images/I/81N2BjAH2PL.jpg');
    //     const blob = await response.blob();
    //     const file = new File([blob], 'image.jpg', {type: blob.type});
    //     composeView.attachFiles([file]);
    //   });


       // Upper 
      composeView.on("presending", function (event) {
        if (recordedUsing) {
          let emailBodyBefore = composeView.getHTMLContent();
          composeView.setBodyHTML(emailBodyBefore + '\n            <div><br></div>\n            <div id="footer">\n                <a href="http://Nat.app" target="_blank" style="color: #7367F0; text-decoration: none;">\n                    <img src="https://i.ibb.co/zbpGMNm/Just-Logo-Without-Background.png" style="vertical-align: middle; width: 40px; padding-right: 10px;">Recorded with <b>Nat.app</b>\n                </a>\n            </div>\n            ');
        }
      });
    });
  
  });