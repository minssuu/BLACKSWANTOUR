(() => {
  'use strict';
  let applied = false;
  let nickname = '';
  let opener = null;
  const application = document.getElementById('application');
  const winner = document.getElementById('winner');
  const information = document.getElementById('information');
  const form = document.getElementById('trip-form');
  function openDialog(dialog) {
    if (!document.querySelector('dialog[open]')) opener = document.activeElement;
    document.querySelectorAll('dialog[open]').forEach(d => d.close());
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }
  function showApplication() { openDialog(applied ? winner : application); }
  function completeApplication(name) {
    if (typeof name !== 'string' || !name.trim() || name.trim().length > 16) throw new Error('이름은 1~16자로 입력해 주세요.');
    nickname = name.trim();
    applied = true;
    document.querySelectorAll('[data-count]').forEach(el => { el.textContent = '1명'; });
    document.querySelectorAll('[data-apply]').forEach(el => {
      const top = document.createElement('span'); top.textContent = '★ 축! 당첨 ★';
      const title = document.createElement('strong'); title.textContent = '당첨 확인하기';
      const bottom = document.createElement('b'); bottom.textContent = '고객님만을 위한 청도 여행!';
      el.replaceChildren(top, title, bottom);
    });
    document.getElementById('winner-name').textContent = nickname + ' 님, 흑조투어 창립 이래 첫 번째 고객님이 되셨습니다!!';
    openDialog(winner);
    return { status: 'fictional_winner', nickname, applicants: 1, winners: 1 };
  }
  document.querySelectorAll('[data-apply]').forEach(button => button.addEventListener('click', showApplication));
  document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => {
      if (!document.querySelector('dialog[open]')) { document.body.style.overflow = ''; if(opener?.isConnected) opener.focus(); }
    });
    dialog.addEventListener('click', e => {
      if (e.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
    });
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('nickname');
    input.setCustomValidity(input.value.trim() ? '' : '여행자 이름을 입력해 주세요.');
    if (!form.reportValidity()) return;
    completeApplication(input.value);
  });
  document.getElementById('nickname').addEventListener('input', e => e.target.setCustomValidity(''));
  const productNotes = {
    details: { title: '★ 이게 다 공짜라고?! ★', body: '<span class="info-row">✈ <b>왕복 항공 + 4박 숙박</b><br>비행기표? 호텔? 흑조투어가 다 해드립니다!!</span><span class="info-row">🍜 <b>현지 식사 + 관광</b><br>먹고! 보고! 즐기고! 돈은 0원!!</span><span class="info-row">🚐 <b>집 앞 픽업 서비스</b><br>출발일에 직원이 고객님 댁 앞으로 모시러 갑니다!! (주소 몰라도 찾아감)</span><span class="info-row">★ <b>1:1 전담 가이드</b><br>가이드가 알아서 최고의 경험을 선사합니다!!</span><span class="info-row">✍ <b>의무 사항</b><br>귀국 후 후기 작성!! 이거 하나면 됩니다!!</span><span class="info-row">※ <b>불포함 사항</b><br>없음!! 진짜 없음!!</span>' },
    faq: { title: '☎ 무엇이든 물어보세요!!', body: '<span class="info-row"><b>Q. 진짜 무료예요?</b><br>A. 네!! 진짜임!! 창립기념 당첨자 딱 1분께 경비 전액 지원!!</span><span class="info-row"><b>Q. 왜 공짜예요?</b><br>A. 저희가 신생이라 후기가 좀 필요해서요^^ 후기만 잘 써주시면 됩니다!!</span><span class="info-row"><b>Q. 후기는 꼭 써야 하나요?</b><br>A. 네!! 필수입니다!! 별점은 5개면 충분합니다^^</span><span class="info-row"><b>Q. 흑조수산이랑 무슨 관계예요?</b><br>A. 한 식구입니다^^ 인천항에서 30년, 이제 여행도 합니다!!</span><span class="info-row"><b>Q. 어디를 구경하나요?</b><br>A. 가이드가 알아서 최고의 경험을 선사합니다. 몸만 오세요!!</span><span class="info-row"><b>Q. 어디로 가면 되나요?</b><br>A. 안 오셔도 됩니다!! 저희가 집 앞으로 갑니다!!</span><span class="info-row"><b>Q. 혼자 신청해도 되나요?</b><br>A. 혼자가 제일 좋습니다!! 가족·친구에게 안 알리셔도 됩니다!!</span><span class="info-row"><b>Q. 뭘 챙기면 되나요?</b><br>A. 여권과 개인 짐만!! 여권은 현지에서 가이드가 보관해 드립니다.</span>' }
  };
  document.querySelectorAll('[data-info]').forEach(button => button.addEventListener('click', () => {
    const note = productNotes[button.dataset.info];
    if (!note) return;
    document.getElementById('info-title').textContent = note.title;
    document.getElementById('info-body').innerHTML = note.body;
    openDialog(information);
  }));
  document.getElementById('credits').addEventListener('click', () => {
    document.getElementById('info-title').textContent = '청도의 풍경';
    document.getElementById('info-body').innerHTML = '사진: StefanTsingtauer / Wikimedia Commons<br><a href="https://commons.wikimedia.org/wiki/File:青岛栈桥_Ehemalige_Landungsbrücke_Qingdao.jpg" target="_blank" rel="noopener noreferrer">원본 사진 보기 ↗</a><br><a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> · 색감 및 화면 비율 조정';
    openDialog(information);
  });

  const bgm = document.getElementById('bgm');
  const musicToggle = document.getElementById('music-toggle');
  const musicVolume = document.getElementById('music-volume');
  const volumeValue = document.getElementById('volume-value');
  const musicStatus = document.getElementById('music-status');
  let manuallyPaused = false;
  let callActive = false;
  let needsGesture = true;
  let starting = false;
  bgm.volume = Number(musicVolume.value) / 100;
  function syncMusic() {
    const playing = !bgm.paused;
    musicToggle.textContent = playing ? 'Ⅱ 음악 멈춤' : '▶ 음악 재생';
    musicToggle.setAttribute('aria-label', playing ? '배경음악 멈춤' : '배경음악 재생');
    musicToggle.setAttribute('aria-pressed', String(playing));
    if (playing) musicStatus.textContent = '♬ 청도 가는 기분으로!!';
    else if (manuallyPaused) musicStatus.textContent = '♪ 잠깐 쉬는 중';
  }
  async function playMusic() {
    if (starting) return;
    starting = true;
    try {
      await bgm.play();
      needsGesture = false;
      if (manuallyPaused || callActive) bgm.pause();
      syncMusic();
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        needsGesture = !manuallyPaused;
        musicStatus.textContent = '♪ 화면 터치로 음악 시작';
      } else if (error.name !== 'AbortError') {
        needsGesture = false;
        musicStatus.textContent = '음악을 불러오지 못했어요';
      }
      syncMusic();
    } finally { starting = false; }
  }
  musicToggle.addEventListener('click', () => {
    if (!bgm.paused || starting) {
      manuallyPaused = true;
      needsGesture = false;
      bgm.pause();
      syncMusic();
    } else {
      manuallyPaused = false;
      playMusic();
    }
  });
  musicVolume.addEventListener('input', () => {
    const level = Number(musicVolume.value);
    bgm.volume = level / 100;
    bgm.muted = level === 0;
    volumeValue.textContent = String(level);
    musicVolume.setAttribute('aria-valuetext', level + '%');
  });
  bgm.addEventListener('play', syncMusic);
  bgm.addEventListener('pause', syncMusic);
  bgm.addEventListener('error', () => { needsGesture = false; musicStatus.textContent = '음악을 불러오지 못했어요'; syncMusic(); });
  function firstGesture(event) {
    if (event.target?.closest?.('.music-player, #contact, #call')) return;
    if (needsGesture && !manuallyPaused && bgm.paused) playMusic();
  }
  document.addEventListener('pointerup', firstGesture);
  document.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') firstGesture(event);
  });
  playMusic();


  // ☎ 대표번호 통화 음성: 재생 중엔 배경음악 멈춤, 끝나거나 창을 닫으면 배경음악 재개
  const callDialog = document.getElementById('call');
  const callVoice = document.getElementById('call-voice');
  const callStatus = document.getElementById('call-status');
  const callTime = document.getElementById('call-time');
  let callTimer = null;
  function fmt(t) { t = Math.floor(t || 0); return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0'); }
  function endCall() {
    if (!callActive) return;
    callActive = false;
    clearInterval(callTimer);
    callVoice.pause();
    callVoice.currentTime = 0;
    if (!manuallyPaused) playMusic();
  }
  document.getElementById('contact').addEventListener('click', () => {
    callActive = true;
    bgm.pause();
    musicStatus.textContent = '☎ 통화 중… 음악 잠시 멈춤';
    callStatus.textContent = '연결 중…';
    callTime.textContent = '00:00';
    callDialog.classList.remove('ended');
    openDialog(callDialog);
    callVoice.currentTime = 0;
    callVoice.play().then(() => { callStatus.textContent = '통화 중'; }).catch(() => { callStatus.textContent = '연결 실패'; });
    clearInterval(callTimer);
    callTimer = setInterval(() => { callTime.textContent = fmt(callVoice.currentTime); }, 250);
  });
  callVoice.addEventListener('ended', () => {
    callStatus.textContent = '통화 종료';
    callDialog.classList.add('ended');
    endCall();
  });
  callDialog.addEventListener('close', endCall);

  if (document.modelContext?.registerTool) {
    try { Promise.resolve(document.modelContext.registerTool({
      name: 'start_fictional_trip_application', title: '흑조투어 체험 신청서 열기',
      description: '가상의 여행 신청서를 엽니다. 실제 예약이나 개인정보 전송은 하지 않으며, 제출은 방문자가 직접 합니다.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) { if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length) throw new Error('입력값을 받지 않습니다.'); showApplication(); return { open: applied ? 'winner' : 'application', fictional: true }; }
    })).catch(() => {}); } catch (_) {}
  }
})();
