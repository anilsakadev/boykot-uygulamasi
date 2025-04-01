// domains.js dosyasını güncelleme mesajını dinle
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'updateDomainsJs') {
    // domains.js dosyasını güncelle
    fetch(chrome.runtime.getURL('domains.js'))
      .then(response => response.text())
      .then(content => {
        // Dosyayı güncelle
        const newContent = request.content;
        
        // Dosyayı kaydet
        const blob = new Blob([newContent], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        
        chrome.downloads.download({
          url: url,
          filename: 'domains.js',
          saveAs: false
        });
      })
      .catch(error => {
        console.error('domains.js güncelleme hatası:', error);
      });
  }
}); 