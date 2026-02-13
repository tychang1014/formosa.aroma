function loadPage(page, targetId = null) {
  fetch(page)
    .then(res => res.text())
    .then(data => {
      document.getElementById("content").innerHTML = data;
      initObserver();

      // 2. 【關鍵修正】取得目前儲存的語系（如果沒存過，預設為 'en'）
      const currentLang = localStorage.getItem('preferredLanguage') || 'en';
      
      // 3. 【關鍵修正】立即對新塞入的內容進行翻譯
      setLanguage(currentLang);

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

// 1. 翻譯資料字典
const translations = {
    en: {
        main: "Main",
        about: "About Us",
        product: "Product",
        whatsnew: "What’s New",
        tealeave: "Tea Selection",
        menu: "Menu",
        catering: "Catering Service",
        store: "Store Location",
        join: "Join Us",
        job: "Job Opportunity",
        franchise: "Franchise",
        language: "Language",
        about_title: "About Formosa Aroma",
        about_desc: "is dedicated to preserving and delivering authentic Taiwanese tea using carefully selected premium tea leaves. We honor traditional craftsmanship while embracing modern innovation, ensuring every cup reflects the rich heritage, purity, and exceptional quality of Taiwan’s tea culture.",
        about_desc2: "With over 20 cusomizable toppings, we offer a unique and personalized tea experience. Our commitment to quality and innovation has made us a beloved brand in the community, and we invite you to craft your own flavor journey, where tradition meets creativity in every sip.",
        location_title: "Store Location",
        address: "Address: ",
    },
    zh: {
        main: "首頁",
        about: "關於島嶼",
        product: "關於產品",
        whatsnew: "新品介紹",
        tealeave: "島嶼精選茶",
        menu: "飲品菜單",
        catering: "飲品服務",
        store: "門市位置",
        join: "加入我們",
        job: "工作機會",
        franchise: "加盟",
        language: "語言",
        about_title: "關於島嶼茶鄉",
        about_desc: "島嶼茶鄉致力於傳承與呈現正宗台灣茶香。堅持以嚴選高品質茶葉，融合傳統工藝與創新技術，確保每一杯茶都展現台灣茶深厚的底蘊、純淨風味與卓越品質。",
        about_desc2: "我們提供超過 20 種可客製化配料選擇，為顧客打造獨一無二的個人化品茶體驗。憑藉對品質與創新的堅持，Formosa Aroma 在市場中持續建立良好的口碑。我們誠摯的邀請您來打造屬於您的專屬風味，讓每一口都能喝到台灣的細緻與創新。",
        location_title: "門市位置",
        address: "地址：",
      }
};

// 2. 切換語言函式
function setLanguage(lang) {
    // 儲存選擇到瀏覽器記憶體
    localStorage.setItem('preferredLanguage', lang);
    
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}



function toggleMenu() {
            const drawer = document.getElementById('mobile-menu-drawer');
            drawer.classList.toggle('active');

        }
