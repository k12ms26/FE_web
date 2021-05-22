<template>
  <div>
    <div class="check"></div>
    <div class="words" contenteditable>
    </div>

    <img src="../assets/icon_Mic@3x.png" id="micImg" @click="clickthis()" />
  </div>
</template>

<script>
  //     1. 회원가입 한 자녀가 있나요? 있으시다면 자녀의 전화번호를, 없으시다면 아니오라고 말씀해주십시오.
  //     2. 몇 월 몇 일에 차량을 이용하시겠어요?
  //     3. {날짜} 에는 {장소} 여행이 가능합니다. 가능한 시간대는 { 시간대 } 입니다.
  //     어느 시간대가 좋으신가요?
  //     4. 동행인이 있나요? 있다면 인원 수를, 없다면 0명이라고 말씀해주십시오.
  //     5. 예약을 확인해드리겠습니다.
  //     {날짜}, {시간대}, {장소}, {명수}
  //     맞으시다면 네, 아니라면 아니오 라고 말씀해주십시오.
  //     6. 예약이 완료되었습니다. 이용해주셔서 감사합니다.
  export default {
    data() {
      return {
        questions: ['회원가입 한 자녀가 있나요? 있으시다면 자녀의 전화번호를, 없으시다면 아니오라고 말씀해주십시오.',
          '몇 월 몇 일에 차량을 이용하시겠어요?',
          '{날짜} 에는 {장소} 여행이 가능합니다. 가능한 시간대는 { 시간대 } 입니다.',
          '동행인이 있나요? 있다면 인원 수를, 없다면 0명이라고 말씀해주십시오.',
          '예약을 확인해드리겠습니다.\n{날짜}\n{시간대}\n{장소}\n{명수}\n맞으시다면 네, 아니라면 아니오 라고 말씀해주십시오.',
          '예약이 완료되었습니다. 이용해주셔서 감사합니다.'
        ],
        questionIndex: 0,
      }
    },
    created() {

    },
    methods: {
      clickthis() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        let recognition = new window.SpeechRecognition();
        recognition.interimResults = true;
        recognition.lang = 'ko-KR';

        let div = null;
        div = document.createElement('div');
        document.querySelector('.words').appendChild(div);
        div.textContent = this.questions[this.questionIndex++];
        // let makeNewQuestion = function () {

        // };

        let makeNewTextContent = function () {
          p = document.createElement('p');
          document.querySelector('.words').appendChild(p);
        };

        let p = null;


        recognition.start();
        recognition.onstart = function () {
          // makeNewQuestion();
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
    margin: 50px 0;
    background: white;
    border-radius: 5px;
    /* box-shadow: 10px 10px 0 rgb(0 0 0 / 10%); */
    padding: 1rem 2rem;
    /* background: -webkit-gradient(linear, 0 0, 0 100%, from(#d9eaf3), color-stop(4%, #fff)) 0 4px; */
    background-size: 100% 3rem;
    position: relative;
    line-height: 200%;

  }

  .words p {
    border: 1px solid rgb(255 140 103);
    border-radius: 15px;
    padding: 5px;
    background-color: #FF8C67;
    width: 83%;
    margin-left: 17%;
    color: white;
    font-weight: 800;
    margin-bottom: 35%;
    text-align: right;
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

  .words div {
    /* border: 1px solid rgb(255 140 103); */
    border-radius: 15px;
    padding: 5px;
    /* background-color: #FF8C67; */
    width: 83%;
    color: black;
    font-weight: 800;
    margin-bottom: 35%;
    text-align: left;
  }

  p {
    margin: 0 0 3rem;
  }

</style>
