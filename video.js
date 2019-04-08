const result = document.getElementById("jsResult");
const video = document.getElementById("jsVideo");

const WIDTH = 640;
const HEIGHT = 360;

result.width = WIDTH;
result.height = HEIGHT;

const ctx = result.getContext("2d");

function setBg() {
  result.style.backgroundImage =
    'url("https://scontent-hkg3-2.xx.fbcdn.net/v/t1.0-9/49336100_1885308894915070_8104276389001166848_n.jpg?_nc_cat=107&_nc_ht=scontent-hkg3-2.xx&oh=e6141acb4b22b4909b056c2dc0ef4279&oe=5D3252EB")';
  result.style.backgroundPosition = "center -350px";
}

function handlePlay(event) {
  ctx.drawImage(video, 0, 0, WIDTH, HEIGHT);
  let frame = ctx.getImageData(0, 0, WIDTH, HEIGHT);
  let pxNumber = frame.data.length / 4;
  for (let i = 0; i < pxNumber; i++) {
    let r = frame.data[i * 4 + 0];
    let g = frame.data[i * 4 + 1];
    let b = frame.data[i * 4 + 2];
    if (r <= 126 && g >= 80 && b <= 80) {
      frame.data[i * 4 + 3] = 0;
    }
  }
  ctx.putImageData(frame, 0, 0);
  setBg();
  setTimeout(handlePlay, 0);
}

if (video) {
  video.addEventListener("play", handlePlay);
}
