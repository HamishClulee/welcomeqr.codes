<template>
    <!-- <div id="square5">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div> -->
    <div>
      <svg version="1.1" width="320" height="320" viewBox="0 0 320 320" fill="none" stroke="royalblue" stroke-linecap="round"
     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <path id="r1">
      <animate id="p1" attributeName="d" values="m160,160l0,0 0,0;m130,110l30,-17 30,17;m130,60l30,-17 30,17;m160,20l0,0 0,0" dur="6s" repeatCount="indefinite"/>
      <animate attributeName="stroke-width" values="0;4;4;4;0" dur="6s" repeatCount="indefinite" begin="p1.begin"/>
    </path>
    <path id="r2">
      <animate attributeName="d" values="m160,160l0,0 0,0;m130,110l30,-17 30,17;m130,60l30,-17 30,17;m160,20l0,0 0,0" dur="6s" repeatCount="indefinite" begin="p1.begin+1s"/>
      <animate attributeName="stroke-width" values="0;4;4;4;0" dur="6s" repeatCount="indefinite" begin="p1.begin+1s"/>
    </path>
    <path id="r3">
      <animate attributeName="d" values="m160,160l0,0 0,0;m130,110l30,-17 30,17;m130,60l30,-17 30,17;m160,20l0,0 0,0" dur="6s" repeatCount="indefinite" begin="p1.begin+2s"/>
      <animate attributeName="stroke-width" values="0;4;4;4;0" dur="6s" repeatCount="indefinite" begin="p1.begin+2s"/>
    </path>
    <path id="r4">
      <animate id="p1" attributeName="d" values="m160,160l0,0 0,0;m130,110l30,-17 30,17;m130,60l30,-17 30,17;m160,20l0,0 0,0" dur="6s" repeatCount="indefinite" begin="p1.begin+3s"/>
      <animate attributeName="stroke-width" values="0;4;4;4;0" dur="6s" repeatCount="indefinite" begin="p1.begin+3s"/>
    </path>
    <path id="r5">
      <animate attributeName="d" values="m160,160l0,0 0,0;m130,110l30,-17 30,17;m130,60l30,-17 30,17;m160,20l0,0 0,0" dur="6s" repeatCount="indefinite" begin="p1.begin+4s"/>
      <animate attributeName="stroke-width" values="0;4;4;4;0" dur="6s" repeatCount="indefinite" begin="p1.begin+4s"/>
    </path>
    <path id="r6">
      <animate attributeName="d" values="m160,160l0,0 0,0;m130,110l30,-17 30,17;m130,60l30,-17 30,17;m160,20l0,0 0,0" dur="6s" repeatCount="indefinite" begin="p1.begin+5s"/>
      <animate attributeName="stroke-width" values="0;4;4;4;0" dur="6s" repeatCount="indefinite" begin="p1.begin+5s"/>
    </path>
  </defs>
  <use xlink:href="#r1"/>
  <use xlink:href="#r1" transform="rotate(60 160 160)"/>
  <use xlink:href="#r1" transform="rotate(120 160 160)"/>
  <use xlink:href="#r1" transform="rotate(180 160 160)"/>
  <use xlink:href="#r1" transform="rotate(240 160 160)"/>
  <use xlink:href="#r1" transform="rotate(300 160 160)"/>
  <use xlink:href="#r2" transform="rotate(30 160 160)"/>
  <use xlink:href="#r2" transform="rotate(90 160 160)"/>
  <use xlink:href="#r2" transform="rotate(150 160 160)"/>
  <use xlink:href="#r2" transform="rotate(210 160 160)"/>
  <use xlink:href="#r2" transform="rotate(270 160 160)"/>
  <use xlink:href="#r2" transform="rotate(330 160 160)"/>
  <use xlink:href="#r3"/>
  <use xlink:href="#r3" transform="rotate(60 160 160)"/>
  <use xlink:href="#r3" transform="rotate(120 160 160)"/>
  <use xlink:href="#r3" transform="rotate(180 160 160)"/>
  <use xlink:href="#r3" transform="rotate(240 160 160)"/>
  <use xlink:href="#r3" transform="rotate(300 160 160)"/>
  <use xlink:href="#r4" transform="rotate(30 160 160)"/>
  <use xlink:href="#r4" transform="rotate(90 160 160)"/>
  <use xlink:href="#r4" transform="rotate(150 160 160)"/>
  <use xlink:href="#r4" transform="rotate(210 160 160)"/>
  <use xlink:href="#r4" transform="rotate(270 160 160)"/>
  <use xlink:href="#r4" transform="rotate(330 160 160)"/>
  <use xlink:href="#r5"/>
  <use xlink:href="#r5" transform="rotate(60 160 160)"/>
  <use xlink:href="#r5" transform="rotate(120 160 160)"/>
  <use xlink:href="#r5" transform="rotate(180 160 160)"/>
  <use xlink:href="#r5" transform="rotate(240 160 160)"/>
  <use xlink:href="#r5" transform="rotate(300 160 160)"/>
  <use xlink:href="#r6" transform="rotate(30 160 160)"/>
  <use xlink:href="#r6" transform="rotate(90 160 160)"/>
  <use xlink:href="#r6" transform="rotate(150 160 160)"/>
  <use xlink:href="#r6" transform="rotate(210 160 160)"/>
  <use xlink:href="#r6" transform="rotate(270 160 160)"/>
  <use xlink:href="#r6" transform="rotate(330 160 160)"/>
</svg>
    <h1>Welcome To Welcome Land</h1>
    </div>
</template>

<script>
export default {
    name: 'loading',
}
</script>

<style scoped>
#square5 {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 50px;
  width: 50px;
  margin: -25px 0 0 -25px;
}

#square5 span {
  color: white;
  font-family: 'Open Sans Condensed', sans-serif;
  padding: 2px;
  width: 17px;
  height: 17px;
  background-color: #000;
  display: inline-block;
  -webkit-animation: square5 1.4s infinite ease-in-out both;
          animation: square5 1.4s infinite ease-in-out both;
}

#square5 span:nth-child(1) {
  left: 11px;
  border-radius: 50%;
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
  background: #F57C00;
}

#square5 span:nth-child(2) {
  left: 22px;
  -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s;
  background: #009688;
}

#square5 span:nth-child(3) {
  left: 33px;
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
  background: #1976D2;
}

#square5 span:nth-child(4) {
  left: 44px;
  border-radius: 50%;
  -webkit-animation-delay: 0.8s;
          animation-delay: 0.8s;
  background: #F44336;
}

@keyframes square5 {
  0% {
    -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
    -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
  }
  50% {
    -webkit-transform: rotateY(180deg);
            transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
            transform: rotateY(180deg);
  }
  100% {
    -webkit-transform: rotateX(180deg);
            transform: rotateX(180deg);
    -webkit-transform: rotateX(180deg);
            transform: rotateX(180deg);
  }
}
@-webkit-keyframes square5 {
  0% {
    -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
  }
  50% {
    -webkit-transform: rotateY(180deg);
            transform: rotateY(180deg);
  }
  100% {
    -webkit-transform: rotateX(180deg);
            transform: rotateX(180deg);
  }
}
</style>