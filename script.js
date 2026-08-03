// ===== CERTIFICATE DATA =====
const certificates = [
  {
    id: "AV-2026-001",
    organization: "MedTech Solutions Inc.",
    initials: "MS",
    standard: "ISO 13485:2016",
    scope: "Medical Device Quality Management",
    status: "active",
    issueDate: "2025-03-15",
    expiryDate: "2028-03-14",
    country: "United States",
    category: "Healthcare",
    tags: ["Medical Devices", "Quality"]
  },
  {
    id: "AV-2026-002",
    organization: "GreenBuild Architects",
    initials: "GA",
    standard: "ISO 14001:2015",
    scope: "Environmental Management Systems",
    status: "active",
    issueDate: "2024-11-01",
    expiryDate: "2027-10-31",
    country: "United Kingdom",
    category: "Construction",
    tags: ["Environmental", "Sustainability"]
  },
  {
    id: "AV-2026-003",
    organization: "DataVault Security Ltd.",
    initials: "DV",
    standard: "ISO 27001:2022",
    scope: "Information Security Management",
    status: "active",
    issueDate: "2025-06-20",
    expiryDate: "2028-06-19",
    country: "Germany",
    category: "Technology",
    tags: ["Cybersecurity", "InfoSec"]
  },
  {
    id: "AV-2026-004",
    organization: "NutriCare Laboratories",
    initials: "NL",
    standard: "ISO 22000:2018",
    scope: "Food Safety Management Systems",
    status: "pending",
    issueDate: "2026-07-01",
    expiryDate: "2029-06-30",
    country: "Canada",
    category: "Food & Beverage",
    tags: ["Food Safety", "HACCP"]
  },
  {
    id: "AV-2026-005",
    organization: "Stellar Aerospace Corp.",
    initials: "SA",
    standard: "AS9100D",
    scope: "Aerospace Quality Management",
    status: "active",
    issueDate: "2024-01-10",
    expiryDate: "2027-01-09",
    country: "France",
    category: "Aerospace",
    tags: ["Aerospace", "Defense"]
  },
  {
    id: "AV-2026-006",
    organization: "PharmaSync Global",
    initials: "PG",
    standard: "ISO 9001:2015",
    scope: "Quality Management Systems",
    status: "active",
    issueDate: "2023-09-15",
    expiryDate: "2026-09-14",
    country: "Switzerland",
    category: "Pharmaceutical",
    tags: ["Quality", "Pharma"]
  },
  {
    id: "AV-2026-007",
    organization: "EcoMotors GmbH",
    initials: "EM",
    standard: "IATF 16949:2016",
    scope: "Automotive Quality Management",
    status: "expired",
    issueDate: "2022-04-01",
    expiryDate: "2025-03-31",
    country: "Germany",
    category: "Automotive",
    tags: ["Automotive", "Quality"]
  },
  {
    id: "AV-2026-008",
    organization: "CloudNine Hosting",
    initials: "CH",
    standard: "SOC 2 Type II",
    scope: "Service Organization Controls",
    status: "active",
    issueDate: "2025-08-01",
    expiryDate: "2026-07-31",
    country: "United States",
    category: "Technology",
    tags: ["Cloud", "Compliance"]
  },
  {
    id: "AV-2026-009",
    organization: "BioGen Research",
    initials: "BR",
    standard: "GLP Compliance",
    scope: "Good Laboratory Practice",
    status: "pending",
    issueDate: "2026-06-15",
    expiryDate: "2029-06-14",
    country: "Japan",
    category: "Biotechnology",
    tags: ["Biotech", "Laboratory"]
  },
  {
    id: "AV-2026-010",
    organization: "SafeSteel Manufacturing",
    initials: "SM",
    standard: "ISO 45001:2018",
    scope: "Occupational Health & Safety",
    status: "active",
    issueDate: "2024-05-20",
    expiryDate: "2027-05-19",
    country: "Australia",
    category: "Manufacturing",
    tags: ["Safety", "OHS"]
  },
  {
    id: "AV-2026-011",
    organization: "FinTrust Banking",
    initials: "FB",
    standard: "PCI DSS v4.0",
    scope: "Payment Card Data Security",
    status: "active",
    issueDate: "2025-01-10",
    expiryDate: "2026-01-09",
    country: "Singapore",
    category: "Finance",
    tags: ["Finance", "PCI"]
  },
  {
    id: "AV-2026-012",
    organization: "AquaPure Water Systems",
    initials: "AW",
    standard: "ISO 14001:2015",
    scope: "Environmental Management",
    status: "expired",
    issueDate: "2021-11-01",
    expiryDate: "2024-10-31",
    country: "India",
    category: "Utilities",
    tags: ["Environmental", "Water"]
  }
];


// ===== DOM ELEMENTS =====
const directoryGrid = document.getElementById("directoryGrid");
const directorySearch = document.getElementById("directorySearch");
const filterChips = document.getElementById("filterChips");
const resultsCount = document.getElementById("resultsCount");
const directoryEmpty = document.getElementById("directoryEmpty");
const certModal = document.getElementById("certModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const navbar = document.getElementById("navbar");
const googleSignInContainer = document.getElementById("googleSignInContainer");
const authStatus = document.getElementById("authStatus");
const userProfile = document.getElementById("userProfile");
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.warn('Failed to parse Google credential:', error);
    return null;
  }
}

function resetAuthUi() {
  if (userProfile) {
    userProfile.hidden = true;
    userProfile.innerHTML = "";
  }
  if (authStatus) {
    authStatus.textContent = "Connect your Google account to continue.";
  }
}

function displayUser(user) {
  if (!userProfile || !authStatus) return;
  userProfile.hidden = false;
  userProfile.innerHTML = `
    <img src="${user.picture || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}" alt="${user.name}" />
    <div>
      <strong>${user.name}</strong>
      <span>${user.email}</span>
    </div>
    <button class="auth-signout-btn" type="button">Sign out</button>
  `;
  authStatus.textContent = `Welcome back, ${user.name}!`;
}

function handleCredentialResponse(response) {
  const payload = parseJwt(response.credential);
  if (!payload) {
    authStatus.textContent = "We could not read your Google sign-in response. Please try again.";
    return;
  }

  const user = {
    name: payload.name || payload.given_name || "Google user",
    email: payload.email || "",
    picture: payload.picture || ""
  };

  displayUser(user);
  localStorage.setItem("shafemGoogleUser", JSON.stringify(user));
}

function restoreAuthSession() {
  const cachedUser = localStorage.getItem("shafemGoogleUser");
  if (!cachedUser) return;
  try {
    displayUser(JSON.parse(cachedUser));
  } catch (error) {
    localStorage.removeItem("shafemGoogleUser");
    resetAuthUi();
  }
}

function initializeGoogleAuth() {
  if (!googleSignInContainer || !authStatus || !userProfile) return;

  if (!window.google?.accounts?.id) {
    authStatus.textContent = "Google sign-in is unavailable right now. Please try again later.";
    return;
  }

  const isPlaceholderClientId = GOOGLE_CLIENT_ID.includes("YOUR_GOOGLE_CLIENT_ID");
  if (isPlaceholderClientId) {
    googleSignInContainer.innerHTML = '<div class="auth-placeholder">Replace the placeholder Google client ID to enable sign-in.</div>';
    authStatus.textContent = "Add your Google OAuth client ID to enable sign-in.";
    return;
  }

  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse,
    auto_select: false,
    cancel_on_tap_outside: false
  });

  window.google.accounts.id.renderButton(googleSignInContainer, {
    theme: "outline",
    size: "large",
    text: "continue_with",
    shape: "pill",
    logo_alignment: "left"
  });
}

window.addEventListener("load", () => {
  restoreAuthSession();
  initializeGoogleAuth();
});

document.addEventListener("click", (event) => {
  const signOutButton = event.target.closest(".auth-signout-btn");
  if (!signOutButton) return;
  localStorage.removeItem("shafemGoogleUser");
  resetAuthUi();
});


// ===== RENDER CERTIFICATE CARDS =====
function createCertCard(cert, index) {
  const card = document.createElement("div");
  card.className = "cert-card";
  card.style.animationDelay = `${index * 0.06}s`;
  card.setAttribute("data-status", cert.status);
  card.setAttribute("data-id", cert.id);

  card.innerHTML = `
    <div class="cert-header">
      <div class="cert-org">
        <div class="cert-org-avatar">${cert.initials}</div>
        <div>
          <div class="cert-org-name">${cert.organization}</div>
          <div class="cert-org-id">${cert.id}</div>
        </div>
      </div>
      <span class="status-badge ${cert.status}">${cert.status}</span>
    </div>
    <div class="cert-details">
      <div class="cert-detail-item">
        <span class="cert-detail-label">Standard</span>
        <span class="cert-detail-value">${cert.standard}</span>
      </div>
      <div class="cert-detail-item">
        <span class="cert-detail-label">Country</span>
        <span class="cert-detail-value">${cert.country}</span>
      </div>
      <div class="cert-detail-item">
        <span class="cert-detail-label">Issued</span>
        <span class="cert-detail-value">${formatDate(cert.issueDate)}</span>
      </div>
      <div class="cert-detail-item">
        <span class="cert-detail-label">Expires</span>
        <span class="cert-detail-value">${formatDate(cert.expiryDate)}</span>
      </div>
    </div>
    <div class="cert-footer">
      <div class="cert-tags">
        ${cert.tags.map(t => `<span class="cert-tag">${t}</span>`).join("")}
      </div>
      <button class="cert-view-btn" data-cert-id="${cert.id}" aria-label="View certificate details for ${cert.organization}">
        View →
      </button>
    </div>
  `;
  return card;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function renderCertificates(list) {
  directoryGrid.innerHTML = "";
  if (list.length === 0) {
    directoryGrid.style.display = "none";
    directoryEmpty.style.display = "block";
  } else {
    directoryGrid.style.display = "grid";
    directoryEmpty.style.display = "none";
    list.forEach((cert, i) => {
      directoryGrid.appendChild(createCertCard(cert, i));
    });
  }
  resultsCount.textContent = list.length;
}


// ===== SEARCH & FILTER =====
let currentFilter = "all";
let currentSearch = "";

function applyFilters() {
  let filtered = dbCertificates;

  // Status filter
  if (currentFilter !== "all") {
    filtered = filtered.filter(c => c.status === currentFilter);
  }

  // Search
  if (currentSearch.trim()) {
    const q = currentSearch.toLowerCase();
    filtered = filtered.filter(c =>
      c.organization.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.standard.toLowerCase().includes(q) ||
      c.scope.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  renderCertificates(filtered);
}

// Search input
directorySearch.addEventListener("input", (e) => {
  currentSearch = e.target.value;
  applyFilters();
});

// Filter chips
filterChips.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  filterChips.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  chip.classList.add("active");
  currentFilter = chip.dataset.filter;
  applyFilters();
});


// ===== MODAL =====
directoryGrid.addEventListener("click", (e) => {
  const btn = e.target.closest(".cert-view-btn");
  if (!btn) return;
  const certId = btn.dataset.certId;
  const cert = dbCertificates.find(c => c.id === certId);
  if (!cert) return;
  openModal(cert);
});

function openModal(cert) {
  modalTitle.textContent = cert.organization;
  modalBody.innerHTML = `
    <div class="modal-detail-row">
      <span class="mdl">Certificate ID</span>
      <span class="mdv">${cert.id}</span>
    </div>
    <div class="modal-detail-row">
      <span class="mdl">Standard</span>
      <span class="mdv">${cert.standard}</span>
    </div>
    <div class="modal-detail-row">
      <span class="mdl">Scope</span>
      <span class="mdv">${cert.scope}</span>
    </div>
    <div class="modal-detail-row">
      <span class="mdl">Status</span>
      <span class="mdv"><span class="status-badge ${cert.status}">${cert.status}</span></span>
    </div>
    <div class="modal-detail-row">
      <span class="mdl">Category</span>
      <span class="mdv">${cert.category}</span>
    </div>
    <div class="modal-detail-row">
      <span class="mdl">Country</span>
      <span class="mdv">${cert.country}</span>
    </div>
    <div class="modal-detail-row">
      <span class="mdl">Issue Date</span>
      <span class="mdv">${formatDate(cert.issueDate)}</span>
    </div>
    <div class="modal-detail-row">
      <span class="mdl">Expiry Date</span>
      <span class="mdv">${formatDate(cert.expiryDate)}</span>
    </div>
    <div class="modal-detail-row">
      <span class="mdl">Tags</span>
      <span class="mdv">${cert.tags.join(", ")}</span>
    </div>
  `;
  certModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  certModal.classList.remove("active");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
certModal.addEventListener("click", (e) => {
  if (e.target === certModal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && certModal.classList.contains("active")) closeModal();
});


// ===== NAVBAR SCROLL =====
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle("scrolled", scrollY > 50);
  lastScroll = scrollY;
});


// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a:not(.nav-cta)");

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}
window.addEventListener("scroll", updateActiveNav);


// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

revealElements.forEach(el => revealObserver.observe(el));


// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById("navToggle");
const navLinksList = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinksList.style.display === "flex";
  navLinksList.style.display = isOpen ? "none" : "flex";
  navLinksList.style.flexDirection = "column";
  navLinksList.style.position = "absolute";
  navLinksList.style.top = "100%";
  navLinksList.style.left = "0";
  navLinksList.style.right = "0";
  navLinksList.style.background = "rgba(10, 14, 26, 0.97)";
  navLinksList.style.padding = "1rem 2rem";
  navLinksList.style.borderBottom = "1px solid rgba(255,255,255,0.08)";
  if (isOpen) {
    navLinksList.style.cssText = "";
  }
});


// ===== ANIMATED COUNTERS =====
function animateCounter(element, target, suffix = "") {
  const duration = 2000;
  const startTime = performance.now();
  const startVal = 0;

  // Parse numeric target
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ""));

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.floor(eased * numericTarget);

    // Format with commas
    element.textContent = currentVal.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

// Observe stat elements
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      animateCounter(el, text);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".hero-stat .number").forEach(el => statsObserver.observe(el));


// ===== SUPABASE INTEGRATION (OPTIONAL) =====
// Replace with your Supabase URL and Anon Key from Supabase Dashboard -> Project Settings -> API
const SUPABASE_URL = "https://omuyyzicwxnxmcrezkmq.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tdXl5emljd3hueG1jcmV6a21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3NDAyMDcsImV4cCI6MjEwMTMxNjIwN30.87NhpZk7RDNFjmjSlLCzRgdmgO-e1GfZqewimULwV6w"; 

let dbCertificates = [...certificates];

async function loadCertificates() {
  if (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase) {
    try {
      const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const { data, error } = await supabase.from('certificates').select('*');
      if (error) {
        console.warn('Supabase fetch error, using local data:', error);
      } else if (data && data.length > 0) {
        // Map database column snake_case to camelCase
        dbCertificates = data.map(item => ({
          id: item.id,
          organization: item.organization,
          initials: item.initials,
          standard: item.standard,
          scope: item.scope,
          status: item.status,
          issueDate: item.issue_date,
          expiryDate: item.expiry_date,
          country: item.country,
          category: item.category,
          tags: item.tags || []
        }));
      }
    } catch (e) {
      console.warn('Could not connect to Supabase, fallback to local data:', e);
    }
  }
  renderCertificates(dbCertificates);
}

// ===== INIT =====
loadCertificates();

