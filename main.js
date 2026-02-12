function loadPage(page, targetId = null) {
  fetch(page)
    .then(res => res.text())
    .then(data => {
      document.getElementById("content").innerHTML = data;
      initObserver();

      // === 新增：依頁面初始化 ===
      if (page.includes("tea")) {
        initTeaPage();
      }

      if (targetId) {
        setTimeout(() => {
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }, 50);
      } else {
        window.scrollTo(0, 0);
      }
    })
    .catch(console.error);
}

function initObserver() {

  const observerOptions = {
    threshold: 0.25
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.tea-item').forEach(item => {
    observer.observe(item);
  });

}