// Obtener los elementos
const commentForm = document.getElementById('comment-form');
const commentText = document.getElementById('comment-text');
const commentImage = document.getElementById('comment-image');
const imagePreviewContainer = document.getElementById('image-preview-container');
const commentsContainer = document.getElementById('comments-container');

// Función para mostrar las imágenes previsualizadas
commentImage.addEventListener('change', function(event) {
    const files = event.target.files;

    // Limpiar las imágenes previas antes de mostrar una nueva
    imagePreviewContainer.innerHTML = '';
  
    // Mostrar la nueva imagen
    const file = files[0]; // Solo permitimos una imagen
    const reader = new FileReader();
  
    reader.onload = function(e) {
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        imgElement.classList.add('preview-image');
    
        // Crear un botón para cancelar la imagen
        const cancelBtn = document.createElement('div');
        cancelBtn.classList.add('cancel-btn');
        cancelBtn.textContent = 'X';
        cancelBtn.addEventListener('click', () => cancelImage(imgElement, cancelBtn));
    
        // Añadir la imagen y el botón de cancelar al contenedor
        imagePreviewContainer.appendChild(imgElement);
        imgElement.appendChild(cancelBtn);
    };
  
    reader.readAsDataURL(file);
});

// Función para cancelar la imagen seleccionada
function cancelImage(imgElement, cancelBtn) {
    imgElement.remove();
    cancelBtn.remove();
}

// Manejar el envío del formulario de comentario
commentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const commentTextValue = commentText.value;
    const commentImages = imagePreviewContainer.querySelectorAll('img');

    if (commentTextValue || commentImages.length > 0) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');

        const textParagraph = document.createElement('p');
        textParagraph.textContent = commentTextValue;
        commentDiv.appendChild(textParagraph);

        // Añadir las imágenes al comentario
        commentImages.forEach(img => {
            const imgClone = document.createElement('img');
            imgClone.src = img.src;
            imgClone.classList.add('preview-image');
            commentDiv.appendChild(imgClone);
        });

        // Insertar el nuevo comentario al principio (comentarios más recientes primero)
        commentsContainer.insertBefore(commentDiv, commentsContainer.firstChild);

        // Limpiar el formulario después de enviar
        commentText.value = '';
        commentImage.value = '';
        imagePreviewContainer.innerHTML = '';
    }
});
