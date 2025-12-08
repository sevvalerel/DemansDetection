README 

MRIgentic, beyin MRI görüntülerini analiz ederek erken demans tespiti yapmayı amaçlayan yapay zeka destekli bir web uygulamasıdır. Arka planda TensorFlow ile eğitilmiş bir model, ön tarafta ise HTML, CSS ve JavaScript kullanılarak geliştirilmiş modern ve kullanıcı dostu bir arayüz bulunur.

Uygulama MRI görüntülerini analiz eder ve sonucu iki sınıf altında gösterir:

Demans Var

Demans Yok

Model aslında dört sınıf üretir (Mild Impairment, Moderate Impairment, No Impairment, Very Mild Impairment). Ancak sistem bu sınıfları iki kategoriye indirger:
“No Impairment” → Demans Yok
Diğer üç sınıf → Demans Var

PROJE DOSYA YAPISI:

app.py — FastAPI backend
alzheimer_detection_model.h5 — Eğitilmiş model
index.html — Arayüz
style.css — Tasarım dosyası
app.js — Frontend mantığı

GEREKSİNİMLER:

Projeyi çalıştırmak için aşağıdaki Python paketleri gereklidir:

pip install fastapi uvicorn tensorflow pillow python-multipart

TensorFlow’un CPU sürümü yeterlidir.

PROJENİN ÇALIŞTIRILMASI:

GitHub deposunu klonlayın:

git clone https://github.com/
<kullanıcı-adın>/MRIgentic.git
cd MRIgentic

Model dosyasını proje klasörüne yerleştirin:

alzheimer_detection_model.h5

Backend sunucusunu başlatın:

uvicorn app:app --reload

Başarılı bir başlangıçtan sonra sunucu şu adreste çalışır:

http://127.0.0.1:8000

API dokümantasyonu için:
http://127.0.0.1:8000/docs

Arayüzü açın:

index.html dosyasına çift tıklayın.
Ardından MRI görüntüsü yükleyerek modelin tahminini görebilirsiniz.

KULLANILAN TEKNOLOJİLER:

FastAPI
TensorFlow / Keras
HTML / CSS / JavaScript
Uvicorn

