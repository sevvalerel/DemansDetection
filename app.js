// ==========================================
// 1. SÜRÜKLE & BIRAK (DRAG & DROP)
// ==========================================
const drop = document.getElementById("drop-area");
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const analyzeBtn = document.getElementById("analyzeBtn");
const box = document.getElementById("diagnosisBox");

drop.addEventListener("dragover", (e) => {
    e.preventDefault();
    drop.style.background = "#ecfeff";
    drop.style.borderColor = "#06b6d4";
});

drop.addEventListener("dragleave", () => {
    drop.style.background = "#f8fafc";
    drop.style.borderColor = "#cbd5e1";
});

drop.addEventListener("drop", (e) => {
    e.preventDefault();
    drop.style.background = "#f8fafc";
    drop.style.borderColor = "#cbd5e1";
    fileInput.files = e.dataTransfer.files;
    showPreview();
});

fileInput.onchange = showPreview;

function showPreview() {
    const file = fileInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    }
}



// ==========================================
// 2. MODEL ANALİZİ – TERS MANTIKLI 2 SINIF
// ==========================================
analyzeBtn.onclick = async function () {

    if (!preview.src || preview.style.display === "none") {
        alert("Lütfen önce bir MR görüntüsü yükleyin!");
        return;
    }

    box.innerHTML = `
        <i class="ri-loader-4-line ri-spin" style="font-size: 3rem; color: #06b6d4;"></i>
        <p style="margin-top:15px; color:#64748b;">Analiz yapılıyor...</p>
    `;

    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = "Analiz Ediliyor...";

    try {
        const formData = new FormData();
        formData.append("file", fileInput.files[0]); // backend ile uyumlu

        const API_URL = "http://127.0.0.1:8000/predict";

        const response = await fetch(API_URL, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Sunucu Hatası: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const predicted = data.class_name;

        let baslik, renk, ikon, mesaj;

        // ===============================
        //   TERS MANTIKLI İKİ SINIF:
        //
        //   NonDemented       → DEMANS VAR
        //   VeryMild/Mild/Mod → DEMANS YOK
        // ===============================

        if (predicted === "NonDemented") {
            baslik = "⚠️ DEMANS BULGUSU TESPİT EDİLDİ";
            renk = "#ef4444"; // kırmızı
            ikon = "ri-alert-fill";
            mesaj = `
                Analiz tamamlandı.
            `;
        } else {
            baslik = "🧠 DEMANS BULGUSU YOK";
            renk = "#10b981"; // yeşil
            ikon = "ri-checkbox-circle-line";
            mesaj = `
                Analiz tamamlandı.
            `;
        }

        // Sonucu Ekrana Yazdır
        box.innerHTML = `
            <i class="${ikon}" style="font-size: 4rem; color: ${renk}; margin-bottom: 15px;"></i>
            <h3 style="color: ${renk}; margin:0; font-size: 1.6rem;">${baslik}</h3>
            <p style="color: #64748b; margin-top: 10px;">${mesaj}</p>
        `;

    } catch (error) {
        console.error("Hata:", error);
        box.innerHTML = `
            <i class="ri-wifi-off-line" style="font-size: 3rem; color: #94a3b8;"></i>
            <h3 style="color: #64748b; margin: 10px 0;">Bağlantı Hatası</h3>
            <p style="color: #94a3b8;">Backend çalışmıyor veya erişilemedi.</p>
            <small style="color: #ef4444;">${error.message}</small>
        `;
    } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<i class="ri-refresh-line"></i> Yeni Analiz Yap';
    }
};
