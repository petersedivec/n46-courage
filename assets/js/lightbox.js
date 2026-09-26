(function () {
  var gallery = document.getElementById('courage-gallery');
  var lightbox = document.getElementById('courage-lightbox');
  if (!gallery || !lightbox) return;

  var items = Array.prototype.slice.call(gallery.querySelectorAll('.gallery-thumb'));
  var img = lightbox.querySelector('.lightbox-img');
  var counter = lightbox.querySelector('.lightbox-counter');
  var closeBtn = lightbox.querySelector('.lightbox-close');
  var prevBtn = lightbox.querySelector('.lightbox-prev');
  var nextBtn = lightbox.querySelector('.lightbox-next');
  var idx = 0;

  function show(i) {
    idx = (i + items.length) % items.length;
    var item = items[idx];
    img.src = item.getAttribute('data-full');
    img.alt = item.getAttribute('data-alt') || '';
    counter.textContent = (idx + 1) + ' / ' + items.length;
  }

  function open(i) {
    show(i);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () { open(i); });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', function () { show(idx - 1); });
  nextBtn.addEventListener('click', function () { show(idx + 1); });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
