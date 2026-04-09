/**
 * contact-modal.js
 * Global contact popup for EVSEI.LT (Main site and Blog).
 */

(function() {
    // 1. Inject Modal HTML
    function injectModal() {
        if (document.getElementById('evseiContactModal')) return;

        const modalHtml = `
            <div id="evseiContactModal" class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close material-symbols-outlined" id="closeEvseiModal">close</button>
                    <h2 class="modal-h2" data-i18n="contact_title">Let's Build Something Exceptional</h2>
                    <form class="modal-form" id="evseiMobalForm">
                        <div class="modal-field">
                            <input type="text" name="name" placeholder="Your Name" data-i18n="form_name" data-i18n-attr="placeholder" required />
                        </div>
                        <div class="modal-field">
                            <input type="email" name="email" placeholder="Email Address" data-i18n="form_email" data-i18n-attr="placeholder" required />
                        </div>
                        <div class="modal-field">
                            <input type="tel" name="phone" placeholder="Phone Number" data-i18n="form_phone" data-i18n-attr="placeholder" />
                        </div>
                        <div class="modal-field">
                            <select name="project_details" required>
                                <option value="" disabled selected data-i18n="form_message">Project Details</option>
                                <option value="Web Design" data-i18n="service_web">Web Design</option>
                                <option value="Branding & Marketing" data-i18n="service_brand">Branding & Marketing</option>
                                <option value="SEO Optimization" data-i18n="service_seo">SEO Optimization</option>
                                <option value="AI Automation" data-i18n="service_ai">AI Automation</option>
                            </select>
                        </div>
                        <button type="submit" class="modal-btn-submit" id="evseiModalSubmitBtn" data-i18n="form_submit">Submit Project</button>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    // 2. Translation logic
    function getTranslations() {
        let lang = localStorage.getItem('evsei_lang');
        if (!lang) {
            lang = document.documentElement.lang || 'lt';
        }
        return (typeof translations !== 'undefined') ? translations[lang] : null;
    }

    function applyModalTranslations() {
        const texts = getTranslations();
        if (!texts) return;

        // Ensure we use the correct lang for the sending button check later
        const currentLang = localStorage.getItem('evsei_lang') || document.documentElement.lang || 'lt';

        const container = document.getElementById('evseiContactModal');
        container.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (texts[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = texts[key];
                } else if (key.includes('title') || key.includes('h2') || key.includes('h3')) {
                    el.innerHTML = texts[key];
                } else {
                    el.textContent = texts[key];
                }
            }
        });

        container.querySelectorAll('[data-i18n-attr]').forEach(el => {
            const attrMapping = el.getAttribute('data-i18n-attr').split(':');
            const attrName = attrMapping[0];
            const translationKey = attrMapping[1];
            if (texts[translationKey]) {
                el.setAttribute(attrName, texts[translationKey]);
            }
        });
    }

    // 3. Modal Functionality
    function openModal(e) {
        if (e) e.preventDefault();
        const modal = document.getElementById('evseiContactModal');
        applyModalTranslations();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const modal = document.getElementById('evseiContactModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function initTriggerListeners() {
        // Universal class for triggers
        document.addEventListener('click', (e) => {
            const target = e.target.closest('.trigger-contact-modal, .nav-cta-pill, a[href="#contact"]');
            if (target) {
                // If it's a contact link in the mobile menu, close mobile menu first
                if (typeof closeMobile === 'function') closeMobile();
                openModal(e);
            }
        });

        // Modal specific listeners
        document.getElementById('closeEvseiModal').addEventListener('click', closeModal);
        document.getElementById('evseiContactModal').addEventListener('click', (e) => {
            if (e.target.id === 'evseiContactModal') closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // 4. Form Submission
    function initFormSubmission() {
        const form = document.getElementById('evseiMobalForm');
        const btn = document.getElementById('evseiModalSubmitBtn');

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const originalText = btn.innerHTML;
            const texts = getTranslations();
            
            const formData = new FormData(this);
            const leadData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                project_details: formData.get('project_details')
            };

            try {
                btn.innerHTML = (texts && texts['lt']) === translations['lt']['contact_title'] ? 'Siunčiama...' : 'Sending...'; 
                // Wait, simpler way to check lang
                const isLt = localStorage.getItem('evsei_lang') === 'lt';
                btn.innerHTML = isLt ? 'Siunčiama...' : 'Sending...';
                btn.disabled = true;

                if (typeof supabaseClient === 'undefined') {
                    throw new Error('Supabase client not loaded');
                }

                const { error } = await supabaseClient
                    .from('leads')
                    .insert([leadData]);

                if (error) throw error;

                btn.innerHTML = isLt ? 'Žinutė Išsiųsta ✓' : 'Message Sent ✓';
                form.reset();
                setTimeout(closeModal, 2000);
            } catch (err) {
                console.error('Submission error:', err);
                btn.innerHTML = isLt ? 'Klaida!' : 'Error!';
            } finally {
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 4000);
            }
        });
    }

    // Boot
    function boot() {
        injectModal();
        initTriggerListeners();
        initFormSubmission();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
