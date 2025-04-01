// List of domains to detect
const domainsList = [
    {
      "EspressoLab": [
        "https://espressolab.com",
        "https://x.com/espressolabtr",
        "https://www.instagram.com/espressolabtr"
      ]
    },
    {
      "D&R": [
        "https://www.dr.com.tr",
        "https://x.com/DRdunyasi",
        "https://www.instagram.com/dr_dunyasi"
      ]
    },
    {
      "İdefix": [
        "https://www.idefix.com",
        "https://x.com/idefix",
        "https://www.instagram.com/idefix"
      ]
    },
    {
      "Demirören AVM": [
        "https://www.demiroren.com.tr",
        "https://x.com/demirorencity",
        "https://www.instagram.com/demirorencity"
      ]
    },
    {
      "Kilim Mobilya": [
        "https://www.kilimmobilya.com.tr",
        "https://x.com/kilimmobilya",
        "https://www.instagram.com/kilimmobilya"
      ]
    },
    {
      "Ülker": [
        "https://www.ulker.com.tr",
        "https://x.com/ulker",
        "https://www.instagram.com/ulker"
      ]
    },
    {
      "TRT": [
        "https://www.trt.net.tr",
        "https://x.com/trthaber",
        "https://www.instagram.com/trthaber"
      ]
    },
    {
      "CNN Türk": [
        "https://www.cnnturk.com",
        "https://x.com/cnnturk",
        "https://www.instagram.com/cnnturk"
      ]
    },
    {
      "Fanatik": [
        "https://www.fanatik.com.tr",
        "https://x.com/fanatikcomtr",
        "https://www.instagram.com/fanatikcomtr"
      ]
    },
    {
      "TGRT": [
        "https://www.tgrthaber.com.tr",
        "https://x.com/tgrthabertv",
        "https://www.instagram.com/tgrthabertv"
      ]
    },
    {
      "İhlas Ev Aletleri": [
        "https://www.arzum.com.tr",
        "https://x.com/arzumcomtr",
        "https://www.instagram.com/arzumcomtr"
      ]
    },
    {
      "Turkuaz Yayınevi": [
        "https://www.turkuazyayinevi.com",
        "https://x.com/turkuazyayinevi",
        "https://www.instagram.com/turkuazyayinevi"
      ]
    },
    {
      "Milli Piyango": [
        "https://www.millipiyangoonline.com",
        "https://x.com/MPiyangoOnline",
        "https://www.instagram.com/millipiyangoonline"
      ]
    },
    {
      "misli.com": [
        "https://www.misli.com",
        "https://x.com/mislicom",
        "https://www.instagram.com/mislicom"
      ]
    },
    {
      "iddia.com": [
        "https://www.iddaa.com",
        "https://x.com/iddaa",
        "https://www.instagram.com/iddaa"
      ]
    },
    {
      "ETS Tur": [
        "https://www.etstur.com",
        "https://x.com/etstur",
        "https://www.instagram.com/etstur"
      ]
    },
    {
      "DHA": [
        "https://www.dha.com.tr",
        "https://x.com/dha_com_tr",
        "https://www.instagram.com/dha_com_tr"
      ]
    },
    {
      "İHA": [
        "https://www.iha.com.tr",
        "https://x.com/ihacomtr",
        "https://www.instagram.com/ihacomtr"
      ]
    },
    {
      "Akşam Gazetesi": [
        "https://www.aksam.com.tr/",
        "https://x.com/Aksam",
        "https://www.instagram.com/aksam"
      ]
    },
    {
      "Audi": [
        "https://www.audi.com.tr/tr/",
        "https://x.com/auditurkiye",
        "https://www.instagram.com/auditurkiye/"
      ]
    },
    {
      "Beyaz TV": [
        "https://beyaztv.com.tr/",
        "https://x.com/beyaztv",
        "https://www.instagram.com/beyaztv"
      ]
    },
    {
      "Doğuş Grubu": [
        "https://www.dogusgrubu.com.tr/",
        "https://x.com/dogusgrubu",
        "https://www.instagram.com/dogusgrubu/"
      ]
    },
    {
      "Kral FM": [
        "https://www.kralmuzik.com.tr/",
        "https://x.com/KralPop",
        "https://www.instagram.com/kralpop"
      ]
    },
    {
      "Günaydın Restoran": [
        "https://gunaydinet.com/tr/ana-sayfa.html",
        "https://x.com/gunaydinet",
        "https://www.instagram.com/gunaydinet/"
      ]
    },
    {
      "NTV": [
        "https://www.ntv.com.tr/",
        "https://x.com/ntv",
        "https://www.instagram.com/ntv/"
      ]
    },
    {
      "Nusret": [
        "https://www.nusr-et.com.tr/anasayfa.aspx",
        "https://x.com/nusret",
        "https://www.instagram.com/nusr_et/"
      ]
    },
    {
      "Škoda": [
        "https://www.skoda.com.tr",
        "https://x.com/SkodaTurkiye",
        "https://www.instagram.com/skodaturkiye/"
      ]
    },
    {
      "Volkswagen": [
        "https://www.vw.com.tr/",
        "https://x.com/vwbinekarac_tr",
        "https://www.instagram.com/vwturkiye/"
      ]
    },
    {
      "Türkiye Gazetesi": [
        "https://www.turkiyegazetesi.com.tr",
        "https://x.com/turkiyegazetesi",
        "https://www.instagram.com/turkiyegazetesicomtr/"
      ]
    },
    {
      "Yeni Şafak": [
        "https://www.yenisafak.com/",
        "https://x.com/yenisafak",
        "https://www.instagram.com/yenisafak/"
      ]
    },
  ];
  
  // Make the domains list available to other scripts
  if (typeof module !== 'undefined') {
    module.exports = { domainsList };
  } else {
    // For browser environment
    window.domainsList = domainsList;
  }
  