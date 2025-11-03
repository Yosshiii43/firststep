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
/*
document.addEventListener('DOMContentLoaded', () => {
 const targets = document.querySelectorAll(".c-blurTrigger");

  const options = {
    root: null, // ビューポートを基準
    rootMargin: "0px 0px -100px 0px", // 下方向に100px分早めに発火
    threshold: 0.3, // 30%入ったら検知
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
*/
//--------------------------------------------------------------------------
// お問い合わせフォーム
//--------------------------------------------------------------------------
document.querySelectorAll('.js-form').forEach(form => {
  const body = form.querySelector('.c-form__body');
  const btn  = form.querySelector('.js-formBtn');
  const msg  = form.querySelector('.js-thanksMsg');

  if (!form || !btn || !msg || !body) {
    console.warn('フォーム部品が見つかりません');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.reportValidity()) return;  // 必須・型チェック

    btn.disabled = true;
    btn.classList.add('is-disabled'); 

    try {
      /** 1) HTTP レイヤーのエラーを確認 */
      const res = await fetch(form.action, {
        method: 'POST',
        body  : new FormData(form),
        credentials: 'same-origin'
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      /** 2) JSON をパースしてアプリケーションエラーを確認 */
      const data = await res.json();               // ← ここで壊れた JSON なら catch へ
      if (data.status !== 'ok') throw new Error('API status NG');

      /** 3) 成功処理 */
      //const h = body.offsetHeight;                 // 現在の高さを取得
      //form.style.minHeight = `${h}px`;             // フォーム全体の最小高さを固定
      body.style.display = 'none';                 // 入力・ボタン・注意書きを隠す
      msg.style.display  = 'block';                // サンクスメッセージ表示

    } catch (err) {
      alert('送信に失敗しました。時間をおいて再度お試しください');
      btn.disabled = false;
      btn.classList.remove('is-disabled');
      console.error(err);                          // console で原因を確認できる
    }
  });
});

//--------------------------------------------------------------------------
// スムーススクロール
//--------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // ヘッダー情報
  const header = document.querySelector(".p-header");
  const headerHeight = header ? header.offsetHeight + 20 : 0;

  // ページ内のスムーススクロール
  for (const link of document.querySelectorAll('a[href*="#"]')) {
    link.addEventListener('click', (e) => {
      const hash = e.currentTarget.hash;
      const target = document.getElementById(hash.slice(1));

      // ページトップへ("#"と"#top"）
      if (!hash || hash === '#top') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

      // アンカーへ
      } else if (target) {
        e.preventDefault();
        const position = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: position,
          behavior: "smooth",
        });

        // URLにハッシュを含める
        history.pushState(null, '', hash);
      }
    });
  };

  // 別ページ遷移後にスムーススクロール
  const urlHash = window.location.hash;
  if (urlHash) {
    const target = document.getElementById(urlHash.slice(1));
    if (target) {
      // ページトップから開始（ブラウザ差異を考慮して併用）
      history.replaceState(null, '', window.location.pathname);
      window.scrollTo(0, 0);

      window.addEventListener("load", () => {
        const position = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: position,
          behavior: "smooth",
        });

        // ハッシュを再設定
        history.replaceState(null, '', window.location.pathname + urlHash);
      });
    }
  }
});
//--------------------------------------------------------------------------
// パララックス
//--------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const rellax = new Rellax('.rellax', {
    center: false,
    vertical: true,
    horizontal: false,
  });

  const rellaxElements = document.querySelectorAll('.rellax');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add('is-active');
      } else {
        el.classList.remove('is-active');
      }
    });
  }, {
    root: null,
    threshold: 0.1
  });

  rellaxElements.forEach((el) => observer.observe(el));
});