// This script handles the popup functionality
document.addEventListener('DOMContentLoaded', function() {
  const addDomainButton = document.getElementById('addDomain');
  const newDomainInput = document.getElementById('newDomain');
  const messageDiv = document.getElementById('message');

  // Hem domains.js hem de local storage'dan domainleri yükle
  function loadAllDomains(callback) {
    chrome.storage.local.get(['customDomains'], function(result) {
      const customDomains = result.customDomains || [];
      callback(customDomains);
    });
  }

  // Listeyi güncelle
  function updateCompaniesList(customDomains) {
    const companiesList = document.getElementById('companies-list');
    companiesList.innerHTML = '';
    
    // Önce domains.js'den gelen sabit listeyi göster
    if (window.domainsList) {
      window.domainsList.forEach(company => {
        const companyName = Object.keys(company)[0];
        const li = document.createElement('li');
        li.textContent = companyName;
        companiesList.appendChild(li);
      });
    }

    // Sonra custom domainleri göster
    customDomains.forEach(domain => {
      const li = document.createElement('li');
      li.textContent = domain;
      companiesList.appendChild(li);
    });
  }

  // Sayfa yüklendiğinde mevcut domainleri göster
  loadAllDomains(function(customDomains) {
    updateCompaniesList(customDomains);
  });

  addDomainButton.addEventListener('click', function() {
    const domain = newDomainInput.value.trim();
    
    if (!domain) {
      showMessage('Lütfen bir domain girin', 'error');
      return;
    }

    // Domain formatını kontrol et
    if (!isValidDomain(domain)) {
      showMessage('Geçersiz domain formatı', 'error');
      return;
    }

    // Custom domainleri al ve yeni domaini ekle
    chrome.storage.local.get(['customDomains'], function(result) {
      const customDomains = result.customDomains || [];
      
      if (customDomains.includes(domain)) {
        showMessage('Bu domain zaten listede', 'error');
        return;
      }

      customDomains.push(domain);
      
      // Storage'ı güncelle
      chrome.storage.local.set({ customDomains: customDomains }, function() {
        // Content script'i güncelle
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'updateCustomDomains',
            customDomains: customDomains
          });
        });

        showMessage('Domain başarıyla eklendi', 'success');
        newDomainInput.value = '';
        updateCompaniesList(customDomains);
      });
    });
  });

  function isValidDomain(domain) {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    return domainRegex.test(domain);
  }

  function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
      messageDiv.style.display = 'none';
    }, 3000);
  }
});
