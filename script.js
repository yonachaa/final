// script.js

// cursor 요소 (body에 .cursor 엘리먼트가 있다고 가정)
const cursor = document.querySelector('.cursor');

document.addEventListener('DOMContentLoaded', function() {
  const iframe         = document.getElementById('mainVideo');
  const player         = new Vimeo.Player(iframe);
  const initialLogo    = document.querySelector('.initial-logo');
  const videoContainer = document.querySelector('.video-container');
  const hero           = document.querySelector('.hero');
  const heroTitle      = document.querySelector('.hero-title');
  const smallOverlay   = document.querySelector('.small-overlay');

  // 1) 비디오 재생 중 커서 숨기기
  cursor.style.display = 'none';

  // 2) 9초 후 초기 로고 fade in
  setTimeout(() => {
    initialLogo.style.opacity = '0.8';
  }, 9000);

  // 3) 12초 후 비디오 → 히어로 전환 & 버튼 애니메이션
  setTimeout(() => {
    // 비디오/로고 fade out
    videoContainer.style.opacity = '0';
    initialLogo.style.opacity    = '0';

    setTimeout(() => {
      videoContainer.style.display = 'none';
      initialLogo.style.display    = 'none';
      hero.style.display           = 'block';
      hero.style.opacity           = '1';
      heroTitle.style.opacity      = '0.8';
      cursor.style.display         = 'block';

      // 0.8초 후 오버레이 & 버튼 애니메이션 시작
      setTimeout(() => {
        smallOverlay.style.transition = 'opacity 1s ease-in';
        smallOverlay.classList.add('show');

        const buttonOrder = [
          '.flowerbutton1',
          '.flowerbutton5',
          '.flowerbutton4',
          '.flowerbutton3',
          '.flowerbutton2'
        ];
        const initialDelay      = 600;
        const fadeInDuration    = 800;
        const fadeOutDuration   = 800;
        const buttonVisibleTime = 1500;
        const overlapDuration   = 200;
        const firstToSecondDelay= 300;
        let currentDelay        = initialDelay;
        let lastFadeOutMoment   = 0;

        buttonOrder.forEach((cls, idx) => {
          const btn = document.querySelector(cls);
          const inDur = (idx === 0 || idx === 1)
            ? fadeInDuration - 100
            : fadeInDuration;

          if (idx === 1) {
            currentDelay = initialDelay + firstToSecondDelay;
          }

          // fade in
          setTimeout(() => {
            btn.style.transition = `opacity ${inDur}ms ease-in`;
            btn.style.opacity    = '0.8';
          }, currentDelay - overlapDuration);

          // fade out
          const outTime = currentDelay + buttonVisibleTime - overlapDuration;
          setTimeout(() => {
            btn.style.transition = `opacity ${fadeOutDuration}ms ease-out`;
            btn.style.opacity    = '0';
          }, outTime);

          lastFadeOutMoment = Math.max(lastFadeOutMoment, outTime + fadeOutDuration);
          currentDelay += Math.max(200, initialDelay - (idx * 400));
        });

        // 모든 버튼 사라진 뒤 hover 활성화 및 모바일에선 1초 후 재노출
        setTimeout(() => {
          buttonOrder.forEach(cls => {
            const btn = document.querySelector(cls);
            btn.classList.add('hover-enabled');
            btn.style.transition = 'opacity 0.3s ease-in-out';
          });

          if (window.innerWidth <= 768) {
            buttonOrder.forEach(cls => {
              const btn = document.querySelector(cls);
              btn.style.transition = 'opacity 1.2s ease-in';
              setTimeout(() => {
                btn.style.opacity = '1';
              }, 1000);
            });
          }
        }, lastFadeOutMoment + 100);

      }, 800);
    }, 1000);
  }, 12000);

  // 4) 모바일 전용: 가로 스와이프 메뉴 & 텍스트
  if (window.innerWidth <= 768) {
    const labels      = ['Furniture', 'Philosophy', 'Books & Accents', 'News', 'About'];
    const logoButtons = document.querySelector('.logo-buttons');
    const visualGroup = document.querySelector('.visual-group');

    const menuText = document.createElement('div');
    menuText.className   = 'mobile-menu-text';
    menuText.textContent = labels[0];
    visualGroup.appendChild(menuText);

    const indicator = document.createElement('div');
    indicator.className   = 'swipe-indicator';
    indicator.textContent = '← Swipe →';
    visualGroup.appendChild(indicator);

    let scrollTimer;
    logoButtons.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const idx = Math.round(logoButtons.scrollLeft / logoButtons.clientWidth);
        if (idx >= 0 && idx < labels.length) {
          menuText.textContent = labels[idx];
        }
      }, 100);
    });
  }
});

// 뒤로가기 버튼 이벤트 리스너 추가
window.addEventListener('popstate', function(event) {
    // 비디오 컨테이너 숨기기
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        videoContainer.style.display = 'none';
    }

    // 초기 로고 숨기기
    const initialLogo = document.querySelector('.initial-logo');
    if (initialLogo) {
        initialLogo.style.display = 'none';
    }

    // 히어로 섹션 표시
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.display = 'block';
        hero.style.opacity = '1';
    }

    // 히어로 타이틀 표시
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0.8';
    }

    // small-overlay 표시
    const smallOverlay = document.querySelector('.small-overlay');
    if (smallOverlay) {
        smallOverlay.style.display = 'flex';
        smallOverlay.style.opacity = '1';
    }

    // flowerbutton 표시
    const flowerButtons = document.querySelectorAll('.flowerbutton');
    flowerButtons.forEach(button => {
        button.style.opacity = '0.8';
        button.classList.add('active');
    });
});
