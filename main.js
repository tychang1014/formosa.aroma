function loadPage(page, targetId = null) {
  fetch(page)
    .then(res => res.text())
    .then(data => {
      document.getElementById("content").innerHTML = data;
      initObserver();

      const drawer = document.getElementById('mobile-menu-drawer');
      if (drawer && drawer.classList.contains('active')) {
          drawer.classList.remove('active'); // 讓導覽列彈回去
      }
      initObserver();

      // 2. 【關鍵修正】取得目前儲存的語系（如果沒存過，預設為 'en'）
      const currentLang = localStorage.getItem('preferredLanguage') || 'en';
      
      // 3. 【關鍵修正】立即對新塞入的內容進行翻譯
      setLanguage(currentLang);

      // === 新增：依頁面初始化 ===
      if (page.includes("tea")) {
        initTeaPage();
      }
      if (page.includes("feature")) {
        initCarousel();
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
        teaspresso: "Teaspresso",
        nitro_cold_brew: "Nitro Cold Brew",
        sparkling_tea: "Sparkling Tea",
        milk_tea: "Milk Tea",
        cream_foam: "Cream Foam",
        fruit_tea: "Fruit Tea",
        yogurt: "Yogurt",
        typhoon: "Typhoon",
        specialty: "Specialty",
        alhambra_menu: "Alhambra Menu",
        temple_city_menu: "Temple City Menu",
        san_jose_menu: "San Jose Menu",
        craft_own: "Craft Your Own Drink"
    },
    zh: {
        main: "首頁",
        about: "關於島嶼",
        product: "關於產品",
        whatsnew: "新品介紹",
        tealeave: "島嶼精選茶",
        menu: "飲品菜單",
        catering: "飲品承包服務",
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
        teaspresso: "島嶼純萃茶",
        nitro_cold_brew: "島嶼冷萃",
        sparkling_tea: "島嶼氣泡茶",
        milk_tea: "島嶼奶香",
        cream_foam: "島嶼奶蓋",
        fruit_tea: "島嶼果香",
        yogurt: "島嶼多多",
        typhoon: "島嶼颱風",
        specialty: "島嶼特調",
        alhambra_menu: "Alhambra 門市菜單",
        temple_city_menu: "Temple City 門市菜單",
        san_jose_menu: "San Jose 門市菜單",
        craft_own: "客製化飲品"
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


// 4. 網頁初始化 (當使用者第一次進入網站時)
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLang);
});

function toggleMenu() {
    const drawer = document.getElementById('mobile-menu-drawer');
    if (drawer) {
        drawer.classList.toggle('active');
    }
}

function closeDropdownMobile() {
    // 點擊選項後，如果是在手機版，可以連同導覽面板一起收起
    const drawer = document.getElementById('mobile-menu-drawer');
    if (drawer) {
        drawer.classList.remove('active');
    }
}

function openTab(evt, storeName) {
    // 1. Get all elements with class="tab-content" and hide them
    var tabContent = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
        tabContent[i].classList.remove("active-content");
    }

    // 2. Get all elements with class="tab-btn" and remove the class "active"
    var tabLinks = document.getElementsByClassName("tab-btn");
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    // 3. Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(storeName).style.display = "block";
    
    // Add a small timeout to allow display:block to render before adding opacity class for animation
    setTimeout(() => {
        document.getElementById(storeName).classList.add("active-content");
    }, 10);
    
    evt.currentTarget.className += " active";
}

function openSubTab(evt, storeId, btnId, targetSectionId) {
    // 阻止連結跳轉
    evt.preventDefault(); 

    // 1. 先執行切換內容
    openTab(evt, storeId);

    // 2. 修正：強制讓正確的主按鈕變亮
    // 因為 openTab 會把所有 tab-btn 的 active 拔掉，我們要補回來
    setTimeout(() => {
        var allBtns = document.querySelectorAll(".tab-btn");
        allBtns.forEach(btn => btn.classList.remove("active"));
        
        var mainBtn = document.getElementById(btnId);
        if (mainBtn) {
            mainBtn.classList.add("active");
        }
    }, 20); // 稍微延遲，確保在 openTab 的執行之後

    // 3. 跳轉到指定區塊
    if (targetSectionId) {
        setTimeout(() => {
            const target = document.getElementById(targetSectionId);
            if (target) {
                const yOffset = -100; // 你的 navbar 高度
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({
                top: y,
                behavior: 'smooth'
                });
            }
        }, 200); 
    }
}

function openTabAndScroll(tabId, sectionId, btnId) {
  // 1. 關掉所有 tab
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });

  // 2. 打開選中的 tab
  const activeTab = document.getElementById(tabId);
  activeTab.style.display = 'block';

  // 3. 移除所有 button active
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // 4. 讓對應 button 亮起來
  const activeBtn = document.getElementById(btnId);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // 5. scroll 到指定位置
  setTimeout(() => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, 200);
}

function toggleJobDetails(cardElement) {
    // 切換特定的 class 名稱以觸發展開效果
    cardElement.classList.toggle('job-active');
    
    // 如果你想讓使用者點開一個時，另一個自動收合，可以取消下面這段的註解
    /*
    document.querySelectorAll('.job-item-card').forEach(otherCard => {
        if (otherCard !== cardElement) {
            otherCard.classList.remove('job-active');
        }
    });
    */
}

const drinkList = [
        { en: "Golden Oolong Teaspresso", zh: "黃金萃取烏龍", desc: "嚴選台灣高山烏龍，琥珀色清澈茶湯與細緻蘭花香。", img: "https://resource.iyp.tw/static.iyp.tw/14491/files/743956ed-c3cc-479e-b0ed-8b02642d0c27.jpg", isRec: true, isNew: false },
        { en: "Brown Sugar Boba Milk", zh: "黑糖珍珠鮮奶", desc: "慢火熬煮黑糖珍珠，搭配純淨鮮乳，香濃醇厚。", img: "https://www.sunnysyrup.com/proimages/recipe/popular-drink/17%20Brown%20Sugar%20Pearls%20Milk.jpg", isRec: true, isNew: true },
        { en: "Ruby Grapefruit Green Tea", zh: "紅柚翡翠", desc: "新鮮紅柚果肉，完美融入清爽綠茶基底。", img: "https://v3-statics.mirrormedia.mg/images/20220607154624-860d70f55845fe579e1683c2ea1ca5c2.png", isRec: false, isNew: true },
        { en: "Uji Matcha Latte", zh: "宇治抹茶歐蕾", desc: "日本宇治抹茶粉，結合絲滑鮮乳，呈現極致口感。", img: "https://kyo-chikiriya.shop/cdn/shop/files/Cappuccino_latte_uji_matcha2.jpg?v=1769654485&width=600", isRec: true, isNew: false },
        { en: "Passionfruit Lychee Tea", zh: "百香荔枝果茶", desc: "酸甜百香果遇上清甜荔枝，果肉層次分明。", img: "https://p8.itc.cn/images01/20210226/cd5b847ad2f6442ca7c0a61226e2b528.jpeg", isRec: false, isNew: false }
    ];

let currentIdx = 0;
let domItems = [];
let autoPlay;

function initCarousel() {
    const stage = document.getElementById('carousel-stage');
    
    // 【關鍵 1】安全性檢查：如果畫面上找不到這個 ID，直接退出，不跑後面的程式碼
    if (!stage) return; 

    // 【關鍵 2】重置資料：避免切換頁面後，舊的圖片資料還殘留在陣列裡
    stage.innerHTML = ''; 
    domItems = []; 
    currentIdx = 0;

    // 開始生成內容
    drinkList.forEach((drink, i) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        
        // 這裡放你原本生成 item 的 innerHTML 內容...
        // item.innerHTML = `...`;
        item.style.backgroundImage = `url('${drink.img}')`;

        stage.appendChild(item);
        domItems.push(item);
    });

    updateCarousel();
}

function updateCarousel() {
    const len = domItems.length;
    
    domItems.forEach((item, i) => {
        let offset = i - currentIdx;
        
        // 無限輪播數學運算
        if (offset < -Math.floor(len / 2)) offset += len;
        if (offset > Math.floor(len / 2)) offset -= len;

        item.className = 'carousel-item';

        if (offset === 0) item.classList.add('pos-center');
        else if (offset === -1) item.classList.add('pos-left');
        else if (offset === 1) item.classList.add('pos-right');
        else if (offset < 0) item.classList.add('pos-hidden-left');
        else item.classList.add('pos-hidden-right');
    });

    updateText();
}

function navigateProduct(direction) {
    currentIdx = (currentIdx + direction + domItems.length) % domItems.length;
    updateCarousel();
    resetAutoPlay();
}

function updateText() {
    const cur = drinkList[currentIdx];
    const textPanel = document.getElementById('text-panel');

    textPanel.classList.add('is-switching');
    
    setTimeout(() => {
        document.getElementById('txt-en').innerText = cur.en;
        document.getElementById('txt-zh').innerText = cur.zh;
        document.getElementById('txt-desc').innerText = cur.desc;
        textPanel.classList.remove('is-switching');
    }, 300);
}

function startAutoPlay() {
    autoPlay = setInterval(() => { navigateProduct(1); }, 4000);
}

function resetAutoPlay() {
    clearInterval(autoPlay);
    startAutoPlay();
}

function scrollToSection() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

const slider = document.querySelector('.main-product-scroller');
const scrollBar = document.querySelector('.scroller-bar');

let isDown = false;
let startX;
let scrollLeft;
let velocity = 0;
let rafID;

// --- 核心物理參數 (調整這裡可以改變手感) ---
let targetX = 0;      // 目標捲動位置
let currentX = 0;     // 當前顯示位置
const lerpFactor = 0.05; // 越小越輕、越軟 (建議 0.03 ~ 0.06)
const dragSpeed = 2.0;   // 拖拽靈敏度
// ---------------------------------------

function updateProgressBar() {
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (maxScroll <= 0) return;
    const scrollPercent = slider.scrollLeft / maxScroll;
    
    // 動態計算滑塊位移 (200 是容器寬，60 是滑塊寬)
    const barTranslate = scrollPercent * (200 - 60);
    scrollBar.style.transform = `translateX(${barTranslate}px)`;
}

function animate() {
    // 核心物理公式：讓 current 慢慢追上 target
    currentX += (targetX - currentX) * lerpFactor;
    
    // 更新實際捲動位置
    slider.scrollLeft = currentX;
    
    // 更新 Bar
    updateProgressBar();
    
    rafID = requestAnimationFrame(animate);
}

// 啟動動畫
animate();

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.style.cursor = 'grabbing';
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    cancelAnimationFrame(rafID);
    animate();
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * dragSpeed;
    
    // 更新目標位置
    targetX = scrollLeft - walk;
    
    // 限制邊界，防止拖過頭
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (targetX < 0) targetX = 0;
    if (targetX > maxScroll) targetX = maxScroll;
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.style.cursor = 'grab';
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.style.cursor = 'grab';
});

// 讓滾輪也變得輕盈
slider.addEventListener('wheel', (e) => {
    e.preventDefault();
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    
    // 滾輪力度緩衝
    targetX += e.deltaY * 0.8;
    
    if (targetX < 0) targetX = 0;
    if (targetX > maxScroll) targetX = maxScroll;
}, { passive: false });

// 初始化
targetX = slider.scrollLeft;
currentX = slider.scrollLeft;