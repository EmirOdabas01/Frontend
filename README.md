Konuşarak Öğren Chat App Frontend
https://frontend-git-master-emirs-projects-176678a2.vercel.app/register  ==> Vercel üzerinden kaldırıldı
Her component kendi stil dosyasıyle birlikte tek bir klasör içerisinde bulunuyor. Stil için AI'dan yardım alındı.
Button ve Input en basit bileşenler

MessageInput ve MessageList Chat ekranı için ayarlandı.
Messagelist messages dizisini alır
MessageInput kullanıcı mesajını alır ve gönderir

Chat 
Mesajları API’den çeker ve listeler.
Yeni mesaj gönderir, kullanıcı kayıtlı değilse yönlendirir.
“History” ve “Log Out” butonlarıyla gezinme sağlar.
Bağlantı durumunu ve kullanıcı adını gösterir.

Register
Kullanıcıdan nickname alır ve API’ye gönderir.
Başarılıysa bilgiyi storage’a kaydedip chat sayfasına yönlendirir.

History
API’den kullanıcının mesajlarını çeker.

Toplam mesaj ve duygu istatistiklerini gösterir.
“Return Chat” ve “Log Out” butonlarıyla yönlendirme yapar.

api: Kullanıcı kaydı, mesajları getirme ve oluşturma işlemlerini yapar.
storage: Kullanıcı ID ve nickname bilgisini localStorage’da saklar veya siler.
https://chatapiapi-g8cacedmf6b0gsdw.spaincentral-01.azurewebsites.net/api/ ==> adresine istek atar

In the project directory, you can run:
### `npm start`

 
 
