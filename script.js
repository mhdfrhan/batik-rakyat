const navbar = document.getElementById('navbar');
let ticking = false;

function updateNavbar() {
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	const desktopLogo = document.querySelector('.nav-brand .logo');
	const desktopLogoWhite = document.querySelector('.nav-brand .logo-white');

	const mobileLogo = document.querySelector('.mobile-brand .logo');
	const mobileLogoWhite = document.querySelector('.mobile-brand .logo-white');

	if (scrollTop > 50) {
		navbar.classList.add('scrolled');

		desktopLogo?.classList.add('active');
		desktopLogoWhite?.classList.remove('active');

		mobileLogo?.classList.add('active');
		mobileLogoWhite?.classList.remove('active');
	} else {
		navbar.classList.remove('scrolled');

		desktopLogo?.classList.remove('active');
		desktopLogoWhite?.classList.add('active');

		mobileLogo?.classList.remove('active');
		mobileLogoWhite?.classList.add('active');
	}

	ticking = false;
}


function requestTick() {
	if (!ticking) {
		requestAnimationFrame(updateNavbar);
		ticking = true;
	}
}

window.addEventListener('scroll', requestTick, { passive: true });


const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const closeBtn = document.getElementById('closeBtn');

function toggleSidebar() {
	sidebar.classList.toggle('active');
	sidebarOverlay.classList.toggle('active');
	document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}

hamburgerBtn?.addEventListener('click', toggleSidebar);
closeBtn?.addEventListener('click', toggleSidebar);
sidebarOverlay?.addEventListener('click', toggleSidebar);

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && sidebar.classList.contains('active')) {
		toggleSidebar();
	}
});

document.addEventListener('click', (e) => {
	if (sidebar.classList.contains('active') &&
		!sidebar.contains(e.target) &&
		!hamburgerBtn.contains(e.target)) {
		toggleSidebar();
	}
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth'
			});
		}
	});
});


let cartCount = 0;
const cartLinks = document.querySelectorAll('a[href="#keranjang"]');

cartLinks.forEach(cartLink => {
	cartLink.addEventListener('click', function (e) {
		e.preventDefault();
		cartCount++;
		const bagCountElement = document.querySelector('.bag-count');
		if (bagCountElement) {
			bagCountElement.textContent = `(${cartCount})`;

			bagCountElement.style.transform = 'scale(1.3)';
			bagCountElement.style.color = 'var(--gold-accent)';
			setTimeout(() => {
				bagCountElement.style.transform = 'scale(1)';
				bagCountElement.style.color = 'white';
			}, 300);
		}
	});
});


const bottomBarLinks = document.querySelectorAll('.bottom-bar a');
bottomBarLinks.forEach(link => {
	link.addEventListener('click', function () {
		bottomBarLinks.forEach(l => l.classList.remove('active'));
		this.classList.add('active');
	});
});


const wishlistLinks = document.querySelectorAll('a[href="#wishlist"]');
wishlistLinks.forEach(link => {
	link.addEventListener('click', function (e) {
		e.preventDefault();
		const icon = this.querySelector('i');
		if (icon) {
			icon.style.color = 'var(--gold-accent)';
			icon.style.transform = 'scale(1.2)';
			setTimeout(() => {
				icon.style.color = '';
				icon.style.transform = 'scale(1)';
			}, 500);
		}
	});
});


setInterval(() => {
	const brands = document.querySelectorAll('.nav-brand, .mobile-brand');
	brands.forEach(brand => {
		brand.style.color = 'var(--gold-accent)';
		setTimeout(() => {
			brand.style.color = 'var(--dark-brown)';
		}, 2000);
	});
}, 10000);

const searchLinks = document.querySelectorAll('a[href="#"]');
const searchModal = document.getElementById('searchModal');
const searchClose = document.getElementById('searchClose');
const searchInput = document.querySelector('.search-input');

function toggleSearchModal() {
	searchModal.classList.toggle('active');
	document.body.style.overflow = searchModal.classList.contains('active') ? 'hidden' : '';
	if (searchModal.classList.contains('active')) {
		setTimeout(() => {
			searchInput.focus();
		}, 300);
	}
}

searchLinks.forEach(link => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		toggleSearchModal();
	});
});

searchClose.addEventListener('click', toggleSearchModal);

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && searchModal.classList.contains('active')) {
		toggleSearchModal();
	}
});

searchModal.addEventListener('click', (e) => {
	if (e.target === searchModal) {
		toggleSearchModal();
	}
});

document.querySelector('.search-modal-content').addEventListener('click', (e) => {
	e.stopPropagation();
});

const suggestionTags = document.querySelectorAll('.suggestion-tag');
suggestionTags.forEach(tag => {
	tag.addEventListener('click', () => {
		searchInput.value = tag.textContent;
		searchInput.focus();
	});
});

