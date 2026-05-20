/* ── Mobile hamburger toggle ── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileNav.classList.remove('open');
        }
    });
}

/* ── Auto-dismiss flash messages after 4s ── */
document.querySelectorAll('.flash').forEach(el => {
    setTimeout(() => {
        el.style.transition = 'opacity 0.5s';
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 500);
    }, 4000);
});

/* ── Card entrance animation ── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.card, .service-card, .stat-item').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = `opacity 0.45s ease ${i * 0.07}s, transform 0.45s ease ${i * 0.07}s`;
    observer.observe(el);
});


/* ── Pop-up Logic ── */
const modal = document.getElementById('cardModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');

document.querySelectorAll('.btn-read-more').forEach(button => {
    // Skip the "Ready to Recover" button if it doesn't have a description
    button.addEventListener('click', (e) => {
        const card = button.closest('.card');
        const detailedInfo = card.getAttribute('data-description');

        // Only trigger modal if a description exists
        if (detailedInfo) {
            e.preventDefault();
            
            const title = card.querySelector('h3').innerText;
            const symptoms = card.querySelector('p:nth-of-type(1)').innerHTML;

            modalBody.innerHTML = `
                <h2 style="color: var(--green-dark); margin-bottom: 15px;">${title}</h2>
                <p style="font-size: 0.95rem; color: var(--text-soft);">${symptoms}</p>
                <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">
                <p><strong>Detailed Care Overview:</strong></p>
                <p style="line-height: 1.6;">${detailedInfo}</p>
                <a href="/services" class="btn-read-more" style="display:inline-block; margin-top:20px;">Book Appointment →</a>
            `;

            modal.classList.add('active');
        }
    });
});

// Close triggers
if (closeModal) {
    closeModal.addEventListener('click', () => modal.classList.remove('active'));
}

// Close on clicking outside the white box
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
});