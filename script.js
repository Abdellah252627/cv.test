// ===== تبديل الوضع الليلي/النهاري =====
(function () {
    const header = document.querySelector('header');
    if (!header) return;

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.type = 'button';
    toggleBtn.textContent = getStoredTheme() === 'dark' ? '☀️ وضع نهاري' : '🌙 وضع ليلي';
    header.appendChild(toggleBtn);

    applyTheme(getStoredTheme());

    toggleBtn.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(current);
        localStorage.setItem('cv-theme', current);
        toggleBtn.textContent = current === 'dark' ? '☀️ وضع نهاري' : '🌙 وضع ليلي';
    });

    function getStoredTheme() {
        try {
            return localStorage.getItem('cv-theme') || 'light';
        } catch (e) {
            return 'light';
        }
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }
})();

// ===== زر التمرير للأعلى =====
(function () {
    const topBtn = document.createElement('button');
    topBtn.className = 'back-to-top';
    topBtn.type = 'button';
    topBtn.title = 'العودة للأعلى';
    topBtn.textContent = '▲';
    document.body.appendChild(topBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }
    });

    topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ===== التحقق من نموذج التواصل =====
(function () {
    const form = document.querySelector('form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const successBox = document.createElement('div');
    successBox.className = 'form-success';
    successBox.textContent = 'تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.';
    form.appendChild(successBox);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let valid = true;

        valid = validateField(nameInput, value => value.trim().length >= 2, 'الرجاء إدخال اسم صحيح (حرفان على الأقل)') && valid;
        valid = validateField(emailInput, value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()), 'الرجاء إدخال بريد إلكتروني صحيح') && valid;
        valid = validateField(messageInput, value => value.trim().length >= 10, 'الرجاء كتابة رسالة (10 أحرف على الأقل)') && valid;

        if (valid) {
            successBox.style.display = 'block';
            form.reset();
            setTimeout(function () {
                successBox.style.display = 'none';
            }, 6000);
        }
    });

    function validateField(input, testFn, errorText) {
        const wrapper = input.closest('p');
        let errorEl = wrapper.querySelector('.error-message');

        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'error-message';
            wrapper.appendChild(errorEl);
        }

        if (!testFn(input.value)) {
            input.classList.add('error');
            errorEl.textContent = errorText;
            errorEl.style.display = 'block';
            return false;
        }

        input.classList.remove('error');
        errorEl.style.display = 'none';
        return true;
    }

    [nameInput, emailInput, messageInput].forEach(function (input) {
        input.addEventListener('input', function () {
            input.classList.remove('error');
            const errorEl = input.closest('p').querySelector('.error-message');
            if (errorEl) errorEl.style.display = 'none';
        });
    });
})();

// ===== تحديث سنة حقوق الملكية =====
(function () {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const copyright = footer.querySelector('p:last-of-type');
    if (copyright) {
        copyright.textContent = copyright.textContent.replace(/20\d{2}/, new Date().getFullYear());
    }
})();

// ===== إبراز الرابط الخارجي في GitHub =====
(function () {
    const ghLinks = document.querySelectorAll('a[href*="github.com"]');
    ghLinks.forEach(function (link) {
        link.setAttribute('rel', 'noopener noreferrer');
    });
})();
