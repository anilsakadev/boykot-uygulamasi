// Import domains list from shared file
const domains = window.domainsList || [];
let customDomains = [];

// Storage'dan custom domainleri yükle
chrome.storage.local.get(['customDomains'], function(result) {
  if (result.customDomains) {
    customDomains = result.customDomains;
  }
});

// Custom domain listesi güncellendiğinde
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'updateCustomDomains') {
    customDomains = request.customDomains;
  }
});

// Function to check if domain is in custom list
function isInCustomDomains(currentDomain) {
  return customDomains.some(domain => 
    currentDomain === domain || currentDomain.endsWith('.' + domain)
  );
}

// Function to extract domain from URL
function extractDomain(url) {
  try {
    // Create a URL object to parse the URL
    const urlObj = new URL(url);
    return urlObj.hostname.toLowerCase().replace(/^www\./, '');
  } catch (e) {
    // If URL parsing fails, return the original string
    return url.toLowerCase();
  }
}

// Function to detect companies
function detectCompanies() {
  if (!document.body) {
    setTimeout(detectCompanies, 100);
    return;
  }
  
  const currentDomain = window.location.hostname.toLowerCase().replace(/^www\./, '');
  const currentFullUrl = window.location.href.toLowerCase();
  
  // Önce custom domainleri kontrol et
  if (isInCustomDomains(currentDomain)) {
    displayNotification('Boykot Listesindeki Site');
    return;
  }

  // Sonra sabit listedeki domainleri kontrol et
  for (const companyObj of domains) {
    const companyName = Object.keys(companyObj)[0];
    const companyUrls = companyObj[companyName];
    
    for (const url of companyUrls) {
      const lowerUrl = url.toLowerCase();
      
      // For social media URLs, we need to check if the current URL contains the path from our list
      if (
        lowerUrl.includes('x.com/') ||
        lowerUrl.includes('twitter.com/') ||
        lowerUrl.includes('instagram.com/')
      ) {
        if (currentFullUrl === lowerUrl) {
          displayNotification(companyName);
          return;
        }
      }
      // For regular domains
      else {
        const domainToCheck = extractDomain(lowerUrl);
        
        if (currentDomain === domainToCheck || currentDomain.endsWith('.' + domainToCheck)) {
          displayNotification(companyName);
          return;
        }
      }
    }
  }
}

// Function to display the notification image
function displayNotification(companyName) {
  if (document.getElementById('boykot-overlay')) {
    return;
  }
  
  // Add CSS animation to the document if it doesn't exist yet
  if (!document.getElementById('boykot-animation-style')) {
    const style = document.createElement('style');
    style.id = 'boykot-animation-style';
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
  
  const overlay = document.createElement('div');
  overlay.id = 'boykot-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 10);
    z-index: 999999999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.5s ease-in-out;
    font-family: Arial, Helvetica, sans-serif;
  `;
  
  // Add warning icon
  const warningIcon = document.createElement('div');
  warningIcon.innerHTML = '⚠️';
  warningIcon.style.cssText = `
    font-size: 64px;
    margin-bottom: 20px;
  `;
  overlay.appendChild(warningIcon);
  
  // Add warning text
  const warningText = document.createElement('div');
  warningText.textContent = 'BOYKOT UYARISI';
  warningText.style.cssText = `
    margin-top: 20px;
    color: #ff0000;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  `;
  overlay.appendChild(warningText);
  
  // Add company name
  const companyText = document.createElement('div');
  companyText.textContent = companyName;
  companyText.style.cssText = `
    color: #ffffff;
    font-size: 24px;
    margin-bottom: 30px;
    text-align: center;
  `;
  overlay.appendChild(companyText);
  
// Add message container
const messageContainer = document.createElement('div');
messageContainer.style.cssText = `
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  max-width: 80%;
  line-height: 1.5;
`;

// Ana mesaj
const messageText = document.createElement('div');
messageText.textContent = "Bu firma, Türkiye'deki adaletsizliklere göz yuman firmalardan biridir.";
messageContainer.appendChild(messageText);

// İlk alt satır
const line1 = document.createElement('div');
line1.textContent = 'Sessiz kalanlar, suça ortaktır.';
messageContainer.appendChild(line1);

// İkinci alt satır
const line2 = document.createElement('div');
line2.textContent = 'Vicdanınıza kulak verin.';
messageContainer.appendChild(line2);

// Tümünü ekle
overlay.appendChild(messageContainer);

  
  // Add close button
  const closeButton = document.createElement('button');
  closeButton.textContent = 'SİTEYİ KAPAT';
  closeButton.style.cssText = `
    margin-top: 30px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #ff0000;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  `;
  
  closeButton.addEventListener('mouseover', function() {
    this.style.backgroundColor = '#cc0000';
  });
  
  closeButton.addEventListener('mouseout', function() {
    this.style.backgroundColor = '#ff0000';
  });
  
  closeButton.addEventListener('click', function() {
    // Kullanıcıyı ana sayfaya yönlendir
    window.location.href = 'https://www.google.com.tr';
  });
  
  overlay.appendChild(closeButton);
  
  document.body.appendChild(overlay);
}

// Run detection when page is loaded
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(detectCompanies, 500);
});

// Also run detection on DOM changes to catch dynamically loaded content
const observer = new MutationObserver(function() {
  detectCompanies();
});

// Start observing once the DOM is ready
window.addEventListener('load', function() {
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }
});

// Initial detection attempt
detectCompanies();

// Sayfa yüklenmeden önce domain kontrolü yap
const currentUrl = window.location.href.toLowerCase();

if (window.domainsList) {
  for (const company of window.domainsList) {
    const companyName = Object.keys(company)[0];
    const urls = company[companyName];

    if (urls.some(url => currentUrl === url.toLowerCase())) {
      document.documentElement.innerHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Erişim Engellendi</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #f5f5f5;
            }
            .container {
              text-align: center;
              padding: 20px;
              background-color: white;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              max-width: 500px;
            }
            h1 {
              color: #d32f2f;
              margin-bottom: 20px;
            }
            p {
              color: #333;
              line-height: 1.6;
            }
            .logo {
              width: 64px;
              height: 64px;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="${chrome.runtime.getURL('images/icon128.png')}" alt="Boykot Logo" class="logo">
            <h1>Erişim Engellendi</h1>
            <p>Bu site (${companyName}), boykot listesinde yer almaktadır.</p>
            <p>Bu firma, halkın değil, sarayın yanında saf tuttu.</p>
            <p>Lütfen vicdanınıza kulak verin ve bu siteye erişmeyin.</p>
          </div>
        </body>
        </html>
      `;
      break;
    }
  }
}