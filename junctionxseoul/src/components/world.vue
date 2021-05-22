<template>
  <div class="hello">
    <button style="width: 100px;" value="시작하기"></button>
    <input id="code_html" type="text" value="몇 월 며칠 차량을 이용하시겠어요?" autocomplete="off" readonly="">
    <input type="button" value="시작하기">
    <div class="words" contenteditable>
    </div>
    <input id="code_direct" type="text" value="족발" autocomplete="off" readonly="">
    <input type="button" value="말하기" />
    <input id="code_reddit" type="text" value="수육" autocomplete="off" readonly="">
    <input type="button" value="말하기" />
    <div style="clear: both;"></div>
    <img src="../assets/icon_Mic@3x.png" id="micImg" style="margin-top: 65%;" @click="changeImg()" />
  </div>
</template>

<script>
  import unionWith from 'lodash/unionWith';
  import $ from 'jQuery';
  export default {
    data() {
      return {
        reservation: [],
      };
    },
    methods: {
      changeImg() {
        $("#micImg").click(function () {
          $(this).toggleClass("clicked");
        })
        this.createSST();
      },
      createSST() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        let recognition = new window.SpeechRecognition();
        recognition.interimResults = true;
        recognition.lang = 'ko-KR';
        let p = null;
        recognition.start();
        recognition.onstart = function () {
          // this.makeNewTextContent(p); // 음성 인식 시작시마다 새로운 문단을 추가한다.
          p = document.createElement('p');
          document.querySelector('.words').appendChild(p);
          console.log(typeof(p));
          // this.reservation.push(p);
          this.reservation = unionWith(this.reservation, p);
          console.log(this.reservation);
        };
        recognition.onend = function () {
          recognition.start();
        };

        recognition.onresult = function (e) {
          let texts = Array.from(e.results)
            .map(results => results[0].transcript).join("");
          p.textContent = texts;
          console.log(texts);
        };
      },
    },
    mounted() {
        // 여긴 음성
        var voices = [];

        function setVoiceList() {
          voices = window.speechSynthesis.getVoices();
        }
        setVoiceList();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = setVoiceList;
        }

        function speech(txt) {
          if (!window.speechSynthesis) {
            alert("음성 재생을 지원하지 않는 브라우저입니다. 크롬, 파이어폭스 등의 최신 브라우저를 이용하세요");
            return;
          }
          var lang = 'ko-KR';
          var utterThis = new SpeechSynthesisUtterance(txt);
          utterThis.onerror = function (event) {
            console.log('error', event);
          };
          var voiceFound = false;
          for (var i = 0; i < voices.length; i++) {
            if (voices[i].lang.indexOf(lang) >= 0 || voices[i].lang.indexOf(lang.replace('-', '_')) >= 0) {
              utterThis.voice = voices[i];
              voiceFound = true;
            }
          }
          if (!voiceFound) {
            alert('voice not found');
            return;
          }
          utterThis.lang = lang;
          utterThis.pitch = 1;
          utterThis.rate = 1.2; // 속도
          window.speechSynthesis.speak(utterThis);
        }
        document.addEventListener("click", function (e) {
          var t = e.target;
          var input = t.previousElementSibling;
          speech(input.value);
        });
    }
  }

</script>

<style>
  html {
    font-size: 10px;
  }

  body {
    font-family: 'helvetica neue';
    font-weight: 200;
    font-size: 20px;
  }

  .words {
    max-width: 500px;
    margin: 50px auto;
    background: white;
    border-radius: 5px;
    padding: 1rem 2rem 1rem 5rem;
    /* box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.1); */
    /* background: -webkit-gradient(linear, 0 0, 0 100%, from(#d9eaf3), color-stop(4%, #fff)) 0 4px; */
    background-size: 100% 3rem;
    position: relative;
    line-height: 3rem;
  }

  p {
    margin: 0 0 3rem;
  }

  /* #micImg {
    background-image: url("../assets/icon_Mic@3x.png");
    width: 20%;
    height: 150px;
    margin: auto;
    background-repeat: no-repeat;
  }
*/
  #micImg.clicked {
filter: drop-shadow(1px 3px 6px #FF8C67);
  }

</style>
