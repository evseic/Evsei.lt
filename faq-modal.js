// FAQ MODAL LOGIC
function openFaq() {
    const modal = document.getElementById('faqModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFaq() {
    const modal = document.getElementById('faqModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close on background click
window.addEventListener('click', (e) => {
    const modal = document.getElementById('faqModal');
    if (e.target === modal) closeFaq();
});

// Accordion Toggle
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
