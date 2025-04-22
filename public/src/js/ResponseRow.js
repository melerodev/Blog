import HttpClient from "./HttpClient.js";

export default class ResponseRow {
    constructor(parent, currentPage, url, csrf) {
        this.parent = parent;
        this.currentPage = currentPage;
        this.url = url;
        this.csrf = csrf;
        this.httpClient = new HttpClient(this.url, this.csrf);
    }

    add({ id, title, content, user, created_at }) {
        // Crear el contenedor principal para el post
        const postPreview = document.createElement('div');
        postPreview.classList.add('post-preview');
        
        // Crear el enlace y cabeceras del post
        const postLink = document.createElement('a');
        postLink.href = `/post/${id}`; // Asumiendo una ruta para ver el post completo
        
        const postTitle = document.createElement('h2');
        postTitle.classList.add('post-title');
        postTitle.textContent = title;
        
        // Obtener un subtítulo del contenido (primeros 100 caracteres o primera línea)
        const postSubtitle = document.createElement('h3');
        postSubtitle.classList.add('post-subtitle');
        
        // Extraer texto plano del contenido HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const plainText = tempDiv.textContent || tempDiv.innerText || "";
        postSubtitle.textContent = plainText.substring(0, 100) + (plainText.length > 100 ? '...' : '');
        
        // Añadir título y subtítulo al enlace
        postLink.appendChild(postTitle);
        postLink.appendChild(postSubtitle);
        
        // Crear meta información del post
        const postMeta = document.createElement('p');
        postMeta.classList.add('post-meta');
        
        // Formatear fecha
        const postDate = new Date(created_at);
        const formattedDate = new Intl.DateTimeFormat('es-ES', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        }).format(postDate);
        
        // Crear enlace al perfil del usuario
        const userLink = document.createElement('a');
        userLink.href = '#!';
        userLink.textContent = user;
        
        // Agregar el texto y el enlace al usuario a la meta información
        postMeta.innerHTML = 'Posted by ';
        postMeta.appendChild(userLink);
        postMeta.innerHTML += ` on ${formattedDate}`;
        
        // Crear contenedor de botones para acciones (vista, edición, eliminación)
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttons', 'mt-3');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';
        
        // Botón para ver el post
        const buttonView = document.createElement('a');
        buttonView.textContent = 'View';
        buttonView.setAttribute('data-bs-toggle', 'modal');
        buttonView.setAttribute('data-bs-target', '#viewModal');
        buttonView.classList.add('btn', 'btn-primary', 'btn-sm');
        buttonView.dataset.id = id;
        buttonView.dataset.name = title;
        buttonView.dataset.url = `/post/${id}`;
        buttonView.dataset.method = "get";
        
        // Botón para editar el post
        const buttonEdit = document.createElement('a');
        buttonEdit.textContent = 'Edit';
        buttonEdit.setAttribute('data-bs-toggle', 'modal');
        buttonEdit.setAttribute('data-bs-target', '#editModal');
        buttonEdit.classList.add('btn', 'btn-warning', 'btn-sm');
        buttonEdit.dataset.id = id;
        buttonEdit.dataset.title = title;
        buttonEdit.dataset.content = content;
        buttonEdit.dataset.url = `/post/${id}`;
        buttonEdit.dataset.method = "put";
        
        // Botón para eliminar el post
        const buttonDelete = document.createElement('a');
        buttonDelete.textContent = 'Delete';
        buttonDelete.setAttribute('data-bs-toggle', 'modal');
        buttonDelete.setAttribute('data-bs-target', '#deleteModal');
        buttonDelete.classList.add('btn', 'btn-danger', 'btn-sm');
        buttonDelete.dataset.id = id;
        buttonDelete.dataset.name = title;
        buttonDelete.dataset.url = `/post/${id}`;
        buttonDelete.dataset.method = "delete";
        
        // Añadir botones al contenedor
        buttonContainer.append(buttonView, buttonEdit, buttonDelete);
        
        // Ensamblar todo el elemento del post
        postPreview.appendChild(postLink);
        postPreview.appendChild(postMeta);
        postPreview.appendChild(buttonContainer);
        
        // Añadir un separador después de cada post
        const divider = document.createElement('hr');
        divider.classList.add('my-4');
        
        // Añadir el post y el divisor al contenedor principal
        this.parent.appendChild(postPreview);
        this.parent.appendChild(divider);
    }
}