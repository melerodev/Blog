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
        postPreview.dataset.postId = id; // Añadir identificador al contenedor

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

        // Contenedor de botones
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('d-flex', 'gap-2', 'mb-2');

        // Crear botón de ver que abrirá el modal
        const viewButton = document.createElement('button');
        viewButton.classList.add('btn', 'btn-info', 'btn-sm');
        viewButton.dataset.bsToggle = 'modal';
        viewButton.dataset.bsTarget = '#viewPostModal';
        viewButton.dataset.id = id;
        viewButton.dataset.title = title;
        viewButton.dataset.content = content;
        viewButton.dataset.url = "/post/" + id;
        viewButton.dataset.method = "get";
        viewButton.textContent = 'View';

        // Crear botón de eliminar que abrirá el modal
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.dataset.bsToggle = 'modal';
        deleteButton.dataset.bsTarget = '#deletePostModal';
        deleteButton.dataset.id = id;
        deleteButton.dataset.title = title;
        deleteButton.dataset.url = "/post/" + id;
        deleteButton.dataset.method = "delete";
        deleteButton.textContent = 'Delete';
        
        // Crear botón de editar que abrirá el modal
        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-primary', 'btn-sm');
        editButton.dataset.bsToggle = 'modal';
        editButton.dataset.bsTarget = '#editPostModal';
        editButton.dataset.id = id;
        editButton.dataset.title = title;
        editButton.dataset.content = content;
        editButton.dataset.url = "/post/" + id;
        editButton.dataset.method = "put";
        editButton.textContent = 'Edit';
        
        // Añadir botones al contenedor
        buttonContainer.appendChild(viewButton);
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

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
        postPreview.appendChild(buttonContainer);
        postPreview.appendChild(postLink);
        postPreview.appendChild(postMeta);

        // Añadir el post al contenedor principal
        this.parent.appendChild(postPreview);
    }
}