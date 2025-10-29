/*************************************************************************
 * main.js  –  ver.1.0
 *************************************************************************/

//--------------------------------------------------------------------------
// heroが画面から消えると画面下にボタンを出す
//--------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.p-hero')
  const buttons = document.querySelector('.p-fixedButtons');
  const callback = function(entries, observer) {
    entries.forEach(entry => {  
      if (entry.isIntersecting) {
        buttons.classList.remove('is--fixed');
      } else {
        buttons.classList.add('is--fixed');
      }
    })
  }
  const io = new IntersectionObserver(callback); //初期化
  io.observe(hero); //監視を開始
});

//--------------------------------------------------------------------------
// 足跡をじわっと出す
//--------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
 const targets = document.querySelectorAll(".c-blurTrigger");

  const options = {
    root: null, // ビューポートを基準
    rootMargin: "0px 0px -60px 0px", // 下方向に60px分早めに発火
    threshold: 0.5, // 全部入ったら検知
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-blurActive");
        obs.unobserve(entry.target);// 一度反応したら監視を停止
      }
    });
  }, options);

  targets.forEach((target) => observer.observe(target));
  });