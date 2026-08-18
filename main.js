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

  document.querySelectorAll('.tea-item, .main-grid-section').forEach(element => {
    observer.observe(element);
  });

}

document.addEventListener("DOMContentLoaded", function () {
initObserver();
});

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
        brand_story: "Brand Story",
        brand_story_content: "Formosa Aroma is a local Los Angeles brand founded by a group of young entrepreneurs with a passion for Taiwanese culture. Staying true to the natural essence of tea, we carefully select premium loose-leaf teas and natural ingredients to bring out their pure, authentic aroma. In our cozy space, where contemporary aesthetics meet vintage charm, we share the warmth and memories of Taiwan through thoughtful craftsmanship, making every sip a rich and comforting experience.",
        signature_drinks: "Signature Drinks",
        signature_drinks_content: "Every signature drinks begins with a genuine appreciation for tea. From selecting the leaves to brewing and preparing each drink, we pay attention to the details to bring out the natural aroma and character of the tea. A modern interpretation of Taiwanese tea culture, proudly presented by Formosa Aroma.",
        learn_our_story: "LEARN OUR STORY",
        tea_collection: "TEA COLLECTION",
        tea_selection_content: "A good cup of tea starts with good leaves. We carefully select over 12 Taiwanese teas, from Alishan Jin Xuan and Ruby Red to Wenshan Pouchong, each with its own aroma and character. We take the time to find the right way to brew each tea, allowing its natural flavors to come through with a smooth aroma and lingering finish. Paired with a variety of quality milk options, each tea offers a different way to enjoy the flavors of Taiwan.",
        explore_our_menu: "EXPLORE OUR MENU",
        store_location: "STORE LOCATION",
        store_location_content: "From Alhambra and Temple City to San Jose, Formosa Aroma brings our love for Taiwanese tea to different communities. Each location has its own atmosphere and exclusiveness, but our attention to tea quality remains the same. Stop by, take a seat, and find a tea that feels right for you.",
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
        craft_own: "Craft Your Own Drink",
        catering_hero_title: "Boba Catering Experience",
        catering_hero_subtitle: "Elevated Tea Service for Every Occasion",
        catering_section_title: "Our Catering Services",
        catering_office_title: "Office Catering",
        catering_office_content: "Boost your team building with refreshing drinks. Spark conversations, connections, and shared moments.",
        catering_wedding_title: "Weddings",
        catering_wedding_content: "An elegant tea bar experience crafted to elevate every moment of your special day.",
        catering_school_title: "School Events",
        catering_school_content: "Thoughtfully crafted beverages to refresh, recharge, and elevate the campus experience for students and staffs.",
        catering_birthday_title: "Birthdays",
        catering_birthday_content: "A fun and delightful experience for your birthday, filled with laughter, handcrafted drinks, and unforgettable memories.",
        catering_cta_title: "Let’s Plan Your Event"
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
        brand_story: "品牌故事",
        brand_story_content: "源於洛杉磯的在地品牌 Formosa Aroma「島嶼茶鄉」，由一群熱愛台灣文化的青年創業家共同打造。我們秉持還原茶飲本味的初衷，嚴選優質原葉茶與天然食材，讓每一杯茶都保留茶葉自然純粹的香氣。在揉合當代美學與復古風情的舒適空間裡，我們以職人精神傳遞台灣的茶文化與記憶，讓每一口茶湯都帶來醇厚、溫潤的享受。",
        signature_drinks: "招牌飲品",
        signature_drinks_content: "每一杯招牌飲品都從一份對茶的講究開始。從茶葉的選擇、沖泡到每一杯的製作，我們在意每個細節，把茶本身的香氣與風味好好呈現。為您呈現台灣茶文化的現代詮釋。",
        learn_our_story: "島嶼的故事",
        tea_collection: "精選茶葉",
        tea_selection_content: "一杯好喝的茶，從茶葉開始。我們精選 12 款以上台灣茶，從阿里山金萱、紅玉紅茶到文山包種，每一款都有自己的香氣與個性。我們也花時間研究每款茶適合的沖泡方式，讓茶葉原本的風味自然展開，留下舒服的茶香與回甘。再搭配不同的優質奶類，讓熟悉的茶，也能有更多值得探索的風味。",
        explore_our_menu: "探索菜單",
        store_location: "門市位置",
        store_location_content: "Formosa Aroma 將我們對台灣茶的喜愛帶到不同的城市，從 Alhambra、Temple City 到 San Jose。每間店都有自己的氛圍及專屬菜單，但不變的是我們對茶葉品質的講究，以及希望讓每位客人都能好好喝一杯茶的初衷。歡迎來店裡坐坐，找一杯適合自己的茶。",
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
        craft_own: "客製化飲品",
        catering_hero_title: "飲品承包服務",
        catering_hero_subtitle: "為不同場合量身規劃的質感茶飲服務。",
        catering_section_title: "服務內容",
        catering_office_title: "公司聚會",
        catering_office_content: "以手工飲品提升團隊凝聚力，拉近彼此距離，打造更緊密的團隊關係。",
        catering_wedding_title: "婚禮宴會",
        catering_wedding_content: "為您的特別日子提供優雅的茶飲吧體驗，讓每一刻都更加動人與難忘。",
        catering_school_title: "校園活動",
        catering_school_content: "精心打造的飲品，為學生與教職員帶來清新及充滿活力的校園體驗。",
        catering_birthday_title: "生日派對",
        catering_birthday_content: "為您的生日帶來歡樂與美味的體驗，讓手工飲品和難忘回憶充滿整個派對。",
        catering_cta_title: "聯繫島嶼"
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
  const section = document.getElementById('catering-info'); // 替換成你想要滾動到的區塊 ID
  
  // If the element exists, scroll to it smoothly
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

const slider = document.querySelector('.main-product-scroller');
const scrollBar = document.querySelector('.scroller-bar');

if (slider && scrollBar) {

    let isDown = false;
    let startX;
    let scrollLeft;

    // --- 核心物理參數 ---
    let targetX = 0;
    let currentX = 0;
    const lerpFactor = 0.05;
    const dragSpeed = 1.8;
    let rafID;

    function updateProgressBar() {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        if (maxScroll <= 0) return;
        const scrollPercent = slider.scrollLeft / maxScroll;
        const barTranslate = scrollPercent * 140;
        scrollBar.style.transform = `translateX(${barTranslate}px)`;
    }

    const isTouchDevice =
        window.matchMedia("(pointer: coarse)").matches;

    if (!isTouchDevice) {
        function animate() {
            currentX += (targetX - currentX) * lerpFactor;
            slider.scrollLeft = currentX;
            updateProgressBar();
            rafID = requestAnimationFrame(animate);
        }

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
            targetX = scrollLeft - walk;
            const maxScroll =
                slider.scrollWidth - slider.clientWidth;
            targetX = Math.max(
                0,
                Math.min(targetX, maxScroll)
            );
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        slider.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                const maxScroll =
                    slider.scrollWidth - slider.clientWidth;
                targetX += e.deltaY * 0.8;
                targetX = Math.max(
                    0,
                    Math.min(targetX, maxScroll)
                );
            }
        }, { passive: false });

    } else {

        slider.style.overflowX = 'auto';
        slider.style.scrollBehavior = 'smooth';
        slider.style.webkitOverflowScrolling = 'touch';
        slider.addEventListener('scroll', () => {
            requestAnimationFrame(updateProgressBar);
        });
    }
    updateProgressBar();
}

document.addEventListener("click", function (event) {
    const button = event.target.closest(".gallery-arrow");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    const gallery = button.closest(".store-gallery");
    if (!gallery) return;
    // 動畫中不要重複點
    if (gallery.classList.contains("is-sliding")) {
        return;
    }

    // ==========================================
    // 第一次使用時，自動建立 gallery-track
    // ==========================================
    let track = gallery.querySelector(".gallery-track");
    if (!track) {
        const originalImages =
            Array.from(gallery.querySelectorAll(".gallery-image"));
        if (originalImages.length < 2) return;
        track = document.createElement("div");
        track.className = "gallery-track";

        // 把原本的圖片放進 track
        originalImages.forEach(function (image) {
            track.appendChild(image);
        });

        // 放回 gallery
        gallery.insertBefore(
            track,
            gallery.querySelector(".gallery-arrow")
        );

        // Clone 第一張和最後一張
        const firstClone =
            originalImages[0].cloneNode(true);
        const lastClone =
            originalImages[originalImages.length - 1].cloneNode(true);
        track.insertBefore(
            lastClone,
            track.firstChild
        );
        track.appendChild(firstClone);

        // 初始位置：真正第一張
        track.style.transform =
            "translateX(-100%)";
        track.offsetWidth;
        gallery.dataset.currentIndex = "1";
        gallery.dataset.initialized = "true";
    }

    // ==========================================
    // 取得所有照片
    // ==========================================
    const images =
        track.querySelectorAll(".gallery-image");
    const total = images.length;

    let currentIndex =
        parseInt(
            gallery.dataset.currentIndex || "1",
            10
        );
    let nextIndex;

    // ==========================================
    // NEXT
    // ==========================================
    if (button.classList.contains("gallery-next")) {
        nextIndex = currentIndex + 1;
    }

    // ==========================================
    // PREVIOUS
    // ==========================================
    else {
        nextIndex = currentIndex - 1;
    }

    // ==========================================
    // 開始滑動
    // ==========================================
    gallery.classList.add("is-sliding");
    track.style.transition =
        "transform 0.55s cubic-bezier(0.65, 0, 0.35, 1)";
    track.style.transform =
        `translateX(-${nextIndex * 100}%)`;
    gallery.dataset.currentIndex =
        nextIndex;


    // ==========================================
    // 動畫結束
    // ==========================================

    setTimeout(function () {

        // 從最後一張 clone
        // 無縫回到真正第一張
        if (nextIndex === total - 1) {
            track.style.transition = "none";
            track.style.transform =
                "translateX(-100%)";
            gallery.dataset.currentIndex = "1";
        }


        // 從第一張 clone
        // 無縫回到真正最後一張
        if (nextIndex === 0) {
            track.style.transition = "none";
            track.style.transform =
                `translateX(-${total - 2}00%)`;
            gallery.dataset.currentIndex =
                total - 2;
        }
        gallery.classList.remove("is-sliding");
    }, 570);
});