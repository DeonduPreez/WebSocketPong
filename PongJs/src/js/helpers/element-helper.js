export function createImageElement(imagePath) {
    const imageElement = document.createElement("img");
    imageElement.src = imagePath;
    document.body.appendChild(imageElement);
    return imageElement;
}
