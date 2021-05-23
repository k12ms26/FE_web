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
  import axios from 'axios';
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
        questions: ['회원가입한 자녀가 있나요? 있으시다면 자녀의 전화번호를, 없으시다면 아니오 라고 말씀해주십시오.',
          '몇 월 몇 일에 차량을 이용하시겠어요?',
          '몇 시에 차량을 이용하시겠어요?',
          '동행인이 있나요? 있다면 인원 수를, 없다면 아니오 라고 말씀해주십시오.',
          '예약이 완료되었습니다. 이용해주셔서 감사합니다.'
        ],
        questionIndex: 0,
        answers: [0],
        tmp: null,
        id: 0,
      }
    },
    created() {
      this.$axios.get('http://18.217.211.176:3000/course')
        .then((response) => console.log(response.data));
    },
    methods: {
      clickthis: function () {
        var ref = this;
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        const recognition = new window.SpeechRecognition();
        recognition.interimResults = true;
        recognition.lang = 'ko-KO';

        let div = null;
        let p = null;
        const id = this.id++;
        div = document.createElement('div');
        document.querySelector('.words').appendChild(div);
        div.textContent = this.questions[this.questionIndex++];
        var msg = new SpeechSynthesisUtterance(div.textContent);
        msg.pitch = 0.95;
        msg.rate = 0.95;
        window.speechSynthesis.speak(msg);
        div.id = id;
        if (div.id === '4') {

          $('#micImg').attr('style', 'display: none;');
          $('#micExp').attr('style', 'display: none;');

        }
        recognition.start();
        recognition.onspeechstart = function () {
          // makeNewQuestion();
          if (id <= 3) {
            p = document.createElement('p');
            document.querySelector('.words').appendChild(p);
            p.id = '0' + id;
          }
          // makeNewTextContent(); // 음성 인식 시작시마다 새로운 문단을 추가한다.
        };

        // recognition.onend = function () {
        //   // recognition.start();
        // };

        recognition.onresult = function (e) {
          p.textContent = e.results[0][0].transcript;
          later();

        };

        // 이부분은 api받기를 위한 것
        const later = function () {
          var tmp = ref.questionIndex - 1
          if ('#0' + tmp === '#01') {
            var month = '월';
            var day = '일';
            if (($('#0' + tmp).html().charAt($('#0' + tmp).html().length - 1) === day) && (($('#0' + tmp).html()
                .charAt($('#0' + tmp).html().length - 5) === month) || ($('#0' + tmp).html().charAt($('#0' + tmp)
                .html().length - 4) === month))) {
              console.log($('#0' + tmp).html())
              var data = $('#0' + tmp).html();

              axios.post('http://18.217.211.176:3000/reservation/date', {
                  text: data,
                })
                .then(res => {
                  console.log(res.data)
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          } else if ('#0' + tmp === '#02') {
            var time = '시';
            if ($('#0' + tmp).html().charAt($('#0' + tmp).html().length - 1) === time) {

              data = $('#0' + tmp).html().slice(0, $('#0' + tmp).html().length - 1);
              axios.post('http://18.217.211.176:3000/reservation/time', {
                  text: data,
                })
                .then(res => {
                  console.log(res.data)
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          } else if ('#0' + tmp === '#03') {
            // var people = '명';
            console.log($('#0' + tmp).html())
            // if ($('#0' + tmp).html().charAt($('#0' + tmp).html().length - 1) === people) {
              if($('#0'+tmp).html()) {

              // data = $('#0' + tmp).html().slice(0, $('#0' + tmp).html().length - 1);
              data = $('#0' + tmp).html();
              ref.$axios.post('http://18.217.211.176:3000/reservation/companion', {
                  text: data,
                })
                .then(res => {
                  console.log(res.data)
                })
                .catch((err) => {
                  console.error(err);
                });
            } else {
              ref.$axios.post('http://18.217.211.176:3000/reservation/companion', {
                  text: 1,
                })
                .then(res => {
                  console.log(res.data)
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          }
        }
      }

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
    animation: ibot_comeUp 1.5s ease-in-out 1 alternate;
    -webkit-animation: ibot_comeUp 1.5s ease-in-out 1 alternate;
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
    /* border: none; */
  }

  p {
    margin: 0 0 3rem;
  }

</style>
