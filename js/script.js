document.addEventListener('DOMContentLoaded', function() {
    // 커서 생성
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    // 마우스 움직임 추적
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const iframe = document.getElementById('mainVideo');
    const player = new Vimeo.Player(iframe);
    const initialLogo = document.querySelector('.initial-logo');
    const videoContainer = document.querySelector('.video-container');
    const hero = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero-title');
    const smallOverlay = document.querySelector('.small-overlay');

    // 메인 비디오 섹션에서는 커서 숨기기
    cursor.style.display = 'none';

    // 9초 후 로고 표시
    setTimeout(() => {
        initialLogo.style.opacity = '0.8';
    }, 9000);

    // 12초 후 페이지 전환
    setTimeout(() => {
        videoContainer.style.opacity = '0';
        initialLogo.style.opacity = '0';
        setTimeout(() => {
            videoContainer.style.display = 'none';
            initialLogo.style.display = 'none';
            hero.style.display = 'block';
            hero.style.opacity = '1';
            heroTitle.style.opacity = '0.8';
            
            // 커서 보이기
            cursor.style.display = 'block';
            
            // 0.8초 후 logo-stroke 표시
            setTimeout(() => {
                smallOverlay.style.transition = 'opacity 1s ease-in';
                smallOverlay.classList.add('show');
                
                // 버튼 순서 정의
                const buttonOrder = [
                    '.flowerbutton1',
                    '.flowerbutton5',
                    '.flowerbutton4',
                    '.flowerbutton3',
                    '.flowerbutton2'
                ];

                // 애니메이션 타이밍 설정
                const initialDelay = 600;
                const fadeInDuration = 800;  // 버튼 등장 시간을 더 길게 설정
                const fadeOutDuration = 800; // 버튼 사라지는 시간을 더 길게 설정
                const delayDecrement = 400;  // 버튼들 사이의 간격을 늘려서 더 부드럽게 연결
                const buttonVisibleDuration = 1500; // 버튼이 화면에 보이는 시간
                const overlapDuration = 200;
                const firstToSecondDelay = 300;

                // 버튼 순차 등장
                let currentDelay = initialDelay;
                let lastButtonFadeOutTime = 0;

                buttonOrder.forEach((buttonClass, index) => {
                    const button = document.querySelector(buttonClass);
                    
                    const isSpecialButton = buttonClass === '.flowerbutton1' || buttonClass === '.flowerbutton2';
                    const currentFadeInDuration = isSpecialButton ? fadeInDuration - 100 : fadeInDuration;

                    if (index === 1) {
                        currentDelay = initialDelay + firstToSecondDelay;
                    }
                    
                    setTimeout(() => {
                        button.style.transition = `opacity ${currentFadeInDuration}ms ease-in`;
                        button.style.opacity = '0.8';
                    }, currentDelay - overlapDuration);
                    
                    const fadeOutTime = currentDelay + buttonVisibleDuration - overlapDuration;
                    setTimeout(() => {
                        button.style.transition = `opacity ${fadeOutDuration}ms ease-out`;
                        button.style.opacity = '0';
                    }, fadeOutTime);

                    lastButtonFadeOutTime = Math.max(lastButtonFadeOutTime, fadeOutTime + fadeOutDuration);
                    
                    currentDelay += Math.max(200, initialDelay - (index * delayDecrement));  // 버튼 등장 간격을 늘려서 흐름을 부드럽게 함
                });

                // 모든 버튼이 사라진 후 hover 효과 활성화
                setTimeout(() => {
                    buttonOrder.forEach(buttonClass => {
                        const button = document.querySelector(buttonClass);
                        button.classList.add('hover-enabled');
                        button.style.transition = 'opacity 0.3s ease-in-out';
                    });
                }, lastButtonFadeOutTime + 100);
            }, 800);
        }, 1000);
    }, 12000);
});
