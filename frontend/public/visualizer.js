// window.onload = () => {
//   const button = document.getElementById("control");
//   const audioEle = document.getElementById("audio");
//   const audioContext = new AudioContext();
//   const track = audioContext.createMediaElementSource(audioEle);

//   track.connect(audioContext.destination);

//   const gainNode = audioContext.createGain();

//   track.connect(gainNode.connect(audioContext.destination));

//   button.addEventListener("click", (e) => {
//     audioEle.play();
//   });
// };

window.onload = () => {
  const playBtn = document.getElementById("play");
  const pauseBtn = document.getElementById("pause");
  const audio = document.getElementById("audio");

  playBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    audio.play();
  });

  pauseBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    audio.pause();
  });
};
