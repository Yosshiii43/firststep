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