# Arslan Hukuk & Danışmanlık Web Sitesi

Bu proje, **Av. Mustafa Emir Arslan**'a ait Arslan Hukuk ve Danışmanlık bürosunun resmi web sitesinin kaynak kodlarını içerir. Site, yüksek performans ve güvenlik standartları gözetilerek statik yapıda (HTML/CSS/JS) geliştirilmiştir.

## 📌 Sistem Mimarisi ve Altyapı Bilgileri

Sistem birbiriyle entegre çalışan çeşitli modern platformlar üzerine kurulmuştur. Herhangi bir teknik arıza veya güncelleme durumunda nereye müdahale edileceğini bilmek için aşağıdaki yapı haritası önemlidir:

- **Alan Adı (Domain):** `arslannhukuk.com.tr` 
  - **Kayıt Kuruluşu:** ODTÜ Metunic
  - **DNS Yönetimi:** Bütün DNS (TXT, MX vb.) kayıtları **Metunic** paneli üzerinden yapılmaktadır.

- **Barındırma (Hosting) ve Yayın:** `Vercel` & `GitHub`
  - Site statik bir proje olduğu için geleneksel bir sunucu (cPanel vb.) yoktur.
  - Dosyalar **GitHub** üzerinde tutulur. GitHub'a yapılan her yükleme (push), **Vercel** tarafından otomatik olarak algılanır ve saniyeler içinde canlıya (`arslannhukuk.com.tr`) yansıtılır.
  - Vercel sayesinde site bir CDN (İçerik Dağıtım Ağı) üzerinden tüm dünyaya en yüksek hızda, kesintisiz servis edilir.

- **Kurumsal E-Posta:** `Zoho Mail`
  - `info@arslannhukuk.com.tr` mail adresi ücretsiz **Zoho Mail** altyapısıyla çalışır.
  - Gelen/giden postaların çalışması için Metunic üzerinden gerekli DNS (TXT, MX) kayıtları yapılandırılmıştır.

- **Analiz ve Trafik Takibi:** `Google Analytics 4 (GA4)`
  - **Ölçüm Kimliği:** `G-3E25T5PT6M`
  - Sitenin tüm sayfalarında GA4 izleme kodu (`<head>` içerisinde) aktiftir.

- **Performans ve SEO:**
  - Resimlerin tamamı yeni nesil **WebP** formatına çevrilmiştir (Daha hızlı sayfa yüklenmesi için).
  - Arama motoru dostu `sitemap.xml` ve `robots.txt` dosyaları aktiftir.
  - **Sitemap Bilgisi:** Sitenin sitemap haritası `https://arslannhukuk.com.tr/sitemap.xml` adresinde çalışmaktadır. Sayfaların Google'da hızlı indeks alması için bu link **Google Search Console** hesabına eklenmiştir/eklenmelidir.

---

## 🛠️ Bakım Modu (Maintenance Mode) Nasıl Yönetilir?

Sitede büyük bir tasarım değişikliği yapılacağı zaman veya geçici olarak siteyi kapatmak gerektiğinde izlenecek yol şudur:

1. Ana dizinde her zaman yayında olan asıl dosya **`index.html`** dosyasıdır. Yedek olarak **`index_prod.html`** adında asıl tasarım tutulur.
2. Bakım modunu aktif etmek için, bakım tasarımını barındıran `bakim.html` dosyasının içeriği, ana `index.html` dosyasına kopyalanır.
3. Bakım bittikten sonra tekrar normal yayına dönmek için, `index_prod.html` içindeki kodlar tekrar `index.html` dosyasına kopyalanır ve değişiklikler GitHub'a gönderilir (push edilir).

---

## 📁 Klasör Yapısı

* **`/assets/`** : Sitede kullanılan resimler, ikonlar ve logolar (Tümü WebP formatında).
* **`index.html`** : Sitenin ana giriş sayfası.
* **`index_prod.html`** : Ana sayfanın yedek veya üretim hali (bakım modunda geçişler için referans).
* **`bakim.html`** : Site bakımda olduğunda gösterilecek "Yakında..." sayfası.
* **`style.css`** : Sitenin tüm tasarım (CSS) kuralları.
* **`script.js`** : Menü açıp kapama vb. etkileşimli özelliklerin çalıştığı Javascript kodları.
* **`sitemap.xml` & `robots.txt`** : Google'ın siteyi doğru indekslemesi için gereken arama motoru harita dosyaları.
* **Diğer `.html` dosyaları** : Hakkımızda, Hizmetlerimiz, İletişim gibi alt sayfalar.

---

## 🚀 Değişiklikler Nasıl Yayına Alınır?

Bilgisayarınızda HTML veya CSS kodlarında bir değişiklik yaptığınızda, bunun internette görünmesi için sırasıyla terminalde şu komutları çalıştırmanız yeterlidir:

```bash
git add .
git commit -m "Yapılan değişikliğin kısa açıklaması"
git push
```

*(Bu komutlar dosyaları GitHub'a gönderir, Vercel de bunu fark edip otomatik olarak sitenizi günceller.)*
