import PIL
import tensorflow as tf
import numpy as np
from sanic import Sanic
from sanic.response import json
from PIL import Image
from pathlib import Path
import os

# import cv2

classes = [
    "Abyssinian",
    "American Bobtail",
    "American Shorthair",
    "Bengal",
    "Birman",
    "Bombay",
    "British Shorthair",
    "Egyptian Mau",
    "Maine Coon",
    "Persian",
    "Ragdoll",
    "Russian Blue",
    "Siamese",
    "Sphynx",
    "Tuxedo",
]

app = Sanic(__name__)


def resizeAndCrop(img_path):
    im = Image.open(img_path)
    # convert
    img = im.convert("RGB")
    # resize
    resizedImage = img.resize((int(96), int(96)), PIL.Image.ANTIALIAS)
    # save
    resizedImage.save(img_path)


# load the saved AI model
# model = tf.keras.models.load_model('test_model')
model = tf.saved_model.load("./model_2")


@app.get("/predict")
async def predict(request):
    imgname = request.args.get("name")
    img_path = os.path.join(
        Path(__file__).parent.parent, os.path.join("uploads", f"{imgname}")
    )
    resizeAndCrop(img_path)
    img = tf.keras.preprocessing.image.load_img(img_path)
    print("1:", img)
    img_arr = tf.keras.preprocessing.image.img_to_array(img)
    print("2:", img_path)
    preprocessed_img = np.expand_dims(img_arr, axis=0)
    print("3:", preprocessed_img)
    predictions = model(preprocessed_img, training=False)
    print("4:", predictions)
    predicted_class = np.argmax(predictions)
    print("5:", predicted_class)
    result = classes[predicted_class]
    print("6:", result)
    return json({"result": result})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
