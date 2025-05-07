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

        // <button class="btn btn-danger btn-sm mt-2" onclick="deletePost()">Delete</button>
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'mt-2');
        deleteButton.dataset.id = id;
        deleteButton.dataset.title = title;
        deleteButton.dataset.url = "/post/" + id;
        deleteButton.dataset.method = "delete";
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', () => {
            if (confirm(`¿Estás seguro de que deseas eliminar el post "${title}"?`)) {
                this.httpClient.delete(`/post/${id}`, {}, (response) => {
                    console.log(response);
                    if (response.result) {
                        // Eliminar el post del DOM
                        postPreview.remove();
                        alert(response.message);
                    } else {
                        alert(response.message);
                    }
                });
            }
        });

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

        const hr = document.createElement('hr');
        hr.classList.add('my-4');
        postMeta.appendChild(hr);

        // Ensamblar todo el elemento del post
        postPreview.appendChild(deleteButton);
        postPreview.appendChild(postLink);
        postPreview.appendChild(postMeta);

        // Añadir el post al contenedor principal
        this.parent.appendChild(postPreview);
    }
}