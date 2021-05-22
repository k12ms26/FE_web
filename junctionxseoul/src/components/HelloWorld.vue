<template>
  <div>
    <!-- <button class="click" @click="clickthis()" /> -->
    <div class="check"></div>
    <img src="../assets/icon_Mic@3x.png" id="micImg" @click="clickthis()" />
    <div class="words" contenteditable>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  export default {
    created() {

    },
    methods: {
      clickthis() {
        $(this).toggleClass("clicked");
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        let recognition = new window.SpeechRecognition();
        recognition.interimResults = true;
        recognition.lang = 'ko-KR';

        let makeNewTextContent = function () {
          p = document.createElement('p');
          document.querySelector('.words').appendChild(p);
        };

        let p = null;

        recognition.start();
        recognition.onstart = function () {
          makeNewTextContent(); // 음성 인식 시작시마다 새로운 문단을 추가한다.
        };
        // recognition.onend = function () {
        //   // recognition.start();
        // };

        recognition.onresult = function (e) {
          let texts = Array.from(e.results)
            .map(results => results[0].transcript).join("");

          p.textContent = texts;
        };
      }
    },
  }

</script>
<style>
  html {
    font-size: 10px;
  }

  body {
    /* background: #FF8C67; */
    font-family: 'helvetica neue';
    font-weight: 200;
    font-size: 24px;
  }

  .words {
    max-width: 500px;
    margin: 50px auto;
    background: white;
    border-radius: 5px;
    /* box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.1); */
    padding: 1rem 2rem 1rem 5rem;
    /* background: -webkit-gradient(linear, 0 0, 0 100%, from(#d9eaf3), color-stop(4%, #fff)) 0 4px; */
    background-size: 100% 3rem;
    position: relative;
    line-height: 3rem;
    line-height: 260%;
    text-align: right;
  }

  .words p {
    border: 1px solid rgb(255 140 103);
    border-radius: 15px;
    padding: 5px;
    background-color: #FF8C67;
  }
.words p:after {
/* border-top: 0px solid transparent;
    border-left: 18px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 12px solid rgb(255 140 103);
    content: "";
    position: absolute;
    top: 2.5%;
    left: 330px; */
    	/* top: 100%;
	left: 50%;
	border: solid transparent;
	content: "";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none; */
      content: '';
    border-top: 15px solid orange;
    border-left: 15px solid transparent
}
  p {
    margin: 0 0 3rem;
  }

  /* .words:before {
    content: '';
    position: absolute;
    width: 4px;
    top: 0;
    left: 30px;
    bottom: 0;
    border: 1px solid;
    border-color: transparent #efe4e4;
  } */
  #micImg.clicked {
filter: drop-shadow(1px 3px 6px #FF8C67);
  }

</style>
