from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import uvicorn

# Modeli yükle
model = load_model("alzheimer_detection_model.h5")

app = FastAPI()

# Frontend'e izin ver
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Görüntüyü oku ve modeli beklediği formatta RGB'ye çevir
    img = Image.open(file.file).convert("RGB").resize((224, 224))
    
    # NumPy array'e çevir
    img = np.array(img) / 255.0
    
    # Model 4 boyut ister -> (1, 224, 224, 3)
    img = np.expand_dims(img, axis=0)

    # Tahmin yap
    pred = model.predict(img)
    class_id = np.argmax(pred)

    # Sınıf etiketleri
    classes = ["NonDemented", "VeryMildDemented", "MildDemented", "ModerateDemented"]

    return {
        "raw_prediction": pred.tolist(),
        "class_id": int(class_id),
        "class_name": classes[class_id]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
