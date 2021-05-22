<template>
  <div>
    <div class="check"></div>
    <div class="words" contenteditable>
    </div>
    <img src="../assets/icon_Mic@3x.png" id="micImg" @click="clickthis()" />
    <p style="font-size: 15px; margin-top: 20px;" id="micExp">마이크를 클릭해서 대답해 주세요</p>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap" rel="stylesheet">
  </div>

</template>

<script>
  import $ from 'jquery';
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
        questions: ['회원가입 한 자녀가 있나요? 있으시다면 자녀의 전화번호를, 없으시다면 아니오 라고 말씀해주십시오.',
          '몇 월 몇 일에 차량을 이용하시겠어요?',
          '{날짜} 에는 {장소} 여행이 가능합니다. 가능한 시간대는 { 시간대 } 입니다.',
          '동행인이 있나요? 있다면 인원 수를, 없다면 아니오 라고 말씀해주십시오.',
          '예약을 확인해드리겠습니다.\n{날짜}\n{시간대}\n{장소}\n{명수}\n맞으시다면 네, 아니라면 아니오 라고 말씀해주십시오.',
          '예약이 완료되었습니다. 이용해주셔서 감사합니다.'
        ],
        questionIndex: 0,
        answers: [],
        tmp: null,
        id: 0,
      }
    },
    created() {
      // this.$axios.get('http://18.217.211.176:3000/course')
      //             .then((response) => (console.log(response.data)));
    },
    methods: {
      clickthis: function () {
        var ref = this;
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        let recognition = new window.SpeechRecognition();
        recognition.interimResults = true;
        recognition.lang = 'ko-KR';

        let div = null;
        div = document.createElement('div');
        document.querySelector('.words').appendChild(div);
        div.textContent = this.questions[this.questionIndex++];

        let p = null;
        let id = this.id++;
        recognition.start();
        recognition.onstart = function () {
          // makeNewQuestion();
          p = document.createElement('p');
          document.querySelector('.words').appendChild(p);
          p.id = id;
          if (p.id === '5') {
            console.log($('#0').html());
            $('#5').attr('style', 'display: none;');
            $('#micImg').attr('style', 'display: none;');
            $('#micExp').attr('style', 'display: none;');

          }
          // makeNewTextContent(); // 음성 인식 시작시마다 새로운 문단을 추가한다.

        };
        // recognition.onend = function () {
        //   // recognition.start();
        // };

        recognition.onresult = function (e) {
          console.log(e.results[0][0].transcript);
          p.textContent = e.results[0][0].transcript;
          later();

        };

        let later = function() {
          var tmp = ref.questionIndex-1
          console.log('#'+tmp);
          console.log($('#'+tmp).html());
        }


      },
    },

  };

</script>


<style>
  html {
    font-size: 10px;
  }

  body {
    font-family: 'Poppins', sans-serif;
    font-weight: 200;
    font-size: 24px;
  }

  .words {
    max-width: 500px;
    margin: auto;
    margin-top: 50px;
    background: white;
    border-radius: 5px;
    padding: 1rem 2rem;
    background-size: 100% 3rem;
    position: relative;
    line-height: 200%;

  }

  .words p {
    border: 1px solid rgb(255 140 103);
    border-radius: 40px;
    padding: 5px;
    background-color: #FF8C67;
    width: 83%;
    margin-left: 17%;
    color: white;
    font-weight: 800;
    margin-bottom: 20%;
    text-align: right;
  }

  .words p:after {
    content: '';
    border-top: 11px solid rgb(255 140 103);
    border-left: 15px solid transparent;
  }

  .words div {
    border-radius: 15px;
    padding: 5px;
    width: 92%;
    color: black;
    font-weight: 800;
    margin-bottom: 10%;
    text-align: left;
  }

  p {
    margin: 0 0 3rem;
  }

</style>
