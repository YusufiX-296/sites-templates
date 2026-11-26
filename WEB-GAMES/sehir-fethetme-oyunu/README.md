# Şehir & Toprak Fethi — Oyunun Kaynak Kodu

Bu klasör, oyunun **hilesiz, saf kaynak kodudur**. Hiçbir hile/script dosyası içermez;
tüm kod açık ve düzenlenebilir haldedir. `node_modules` ve derlenmiş çıktılar (`dist/`)
bilerek yoktur, `npm install` ile yeniden üretilir.

## Gereksinimler

- Node.js 18 veya üzeri
- npm

## Çalıştırma

```bash
npm install
npm run dev        # geliştirme sunucusu (http://localhost:5173)
npm run build      # dist/ klasörüne üretim derlemesi
npm run preview    # derlenmiş sürümü önizle
npm test           # tests/ altındaki birim testleri (node --test)
npm run lint       # oxlint
```

## Android APK derleme

Oyun Capacitor ile paketlenir; `android/` klasörü hazır Gradle projesidir.
Android Studio ve JDK 21 gerekir.

```bash
npm install
npm run build                 # web çıktısı (dist/)
npx cap sync android          # dist/ çıktısını android projesine kopyala
cd android
./gradlew assembleDebug       # android/app/build/outputs/apk/debug/app-debug.apk
./gradlew assembleRelease     # imzalı sürüm (keystore yapılandırıldıysa)
```

Uygulama kimliği ve görünen ad `capacitor.config.json` ile
`android/app/build.gradle` içinden değiştirilir.

## Klasör yapısı

```
index.html               Uygulama kabuğu (açılış ekranı, tema, kök div)
vite.config.js           Vite yapılandırması (React + Tailwind, sürüm bilgisi enjeksiyonu)
capacitor.config.json    Android uygulama kimliği / adı ve web dizini (dist)
android/                 Capacitor Android projesi (APK/AAB derlemesi)
public/                  Statik dosyalar: ikonlar, manifest, version.json, 404.html
src/
  main.jsx               React giriş noktası
  App.jsx                Ana oyun bileşeni: durum (state), sıra/tur akışı, modallar
  App.css, index.css     Tailwind katmanları ve özel stiller
  components/
    ModeSelection.jsx    Mod seçimi (klasik harita / dev dünya haritası)
    GameSetup.jsx        Oyuncu sayısı, isim ve renk seçimi
    GameBoard.jsx        Canvas oyun tahtası (boyama, tıklama, çizim)
    TurnControls.jsx     Tur kontrolleri (çark, yerleştirme, geri al, bitir)
    WheelModal.jsx       Çark çevirme ekranı
    DiplomacyModal.jsx   Diplomasi / antlaşma ekranı
    RulesModal.jsx       Kurallar
    DebugModal.jsx       Hata ayıklama paneli
    OnlineRoomModal.jsx  Çevrim içi oda arayüzü
    WorldGame/           Dev dünya haritası modu arayüzü
  utils/
    gameLogic.js         Saf oyun kuralları (genişleme, komşuluk, puanlama, bot hamlesi)
    multiplayer.js       PeerJS tabanlı eşler arası bağlantı
    audio.js             Ses efektleri
    versionCheck.js      Sürüm kontrolü
  world/
    worldEngine.js       Dünya simülasyon motoru: ülkeler, toprak, ordu, ekonomi, diplomasi
    worldRasterizer.js   Dünya haritası rasterleştirme (kara/su maskesi, ülke sınırları)
    worldRenderer.js     Dünya haritası çizimi (canvas)
    sharedWorldSync.js   Dünya durumunun oyuncular arası senkronizasyonu
    networkSecurity.js   İmzalama / doğrulama yardımcıları
    flagLibrary.js       Ülke bayrakları
  workerConfig.js        Sunucu (Worker) adres yapılandırması
tests/                   Birim testleri (gameLogic, ağ güvenliği, antlaşma tazminatı)
worker/                  Çok oyunculu dünya için Cloudflare Worker sunucusu
  wrangler.toml          Worker yapılandırması
  src/index.js           HTTP/WebSocket yönlendirici
  src/worldRoom.js       Oda (room) durumu ve yayın (broadcast) mantığı
```

## Sunucu (isteğe bağlı)

Dev dünya haritası modunun çevrim içi kısmı `worker/` içindeki Cloudflare Worker ile çalışır:

```bash
cd worker
npm install
npm run dev      # wrangler dev (varsayılan: http://localhost:8787)
```

Sunucu adresi `src/workerConfig.js` içinden değiştirilebilir. Sunucu çalışmadan da
düz harita modu ve dünya modunun yerel (tek oyunculu) kısmı çalışır.
