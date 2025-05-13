import HttpClient from './HttpClient.js';
import ResponseContent from './ResponseContent.js';

export default class ModalEvents {

    constructor(url, csrf) {
        this.url = url;
        this.csrf = csrf;

        this.content = document.getElementById('content');
        this.responseContent = new ResponseContent(this.content);

        this.fetchUrl = '';
        this.httpClient = new HttpClient(this.url, this.csrf);

        // Create post modal
        this.modalCreatePost = document.getElementById('createPostModal');
        this.modalCreatePostTitle = document.getElementById('post-title');
        this.modalCreatePostContent = document.getElementById('mytextarea');
        this.modalCreatePostButton = document.getElementById('modalCreatePostButton');

        // Delete post modal
        this.modalDeletePost = document.getElementById('deletePostModal');
        this.modalDeletePostButton = document.getElementById('modalDeletePostButton');

        // Warning post modal
        this.modalWarningPost = document.getElementById('warningPostModal');
        this.modalWarningPostContent = document.querySelector('#warningPostModal .modal-body p');

        // View post modal
        this.modalViewPost = document.getElementById('viewPostModal');
        this.modalViewPostTitle = document.getElementById('post-title-view');
        this.modalViewPostContent = document.getElementById('post-content-view');
        this.assignEvents();

        // Modal post edit
        this.modalEditPost = document.getElementById('editPostModal');
        this.modalEditPostTitle = document.getElementById('post-title-edit');
        this.modalEditPostContent = document.getElementById('mytextarea-edit');
        this.modalEditPostButton = document.getElementById('modalEditPostButton');
    }

    assignEvents() {
        this.modalCreatePost.addEventListener('show.bs.modal', event => {
            this.fetchUrl = this.modalCreatePost.dataset.url;
            this.modalCreatePostTitle.value = '';
            this.modalCreatePostContent.value = '';
        });

        this.modalCreatePostButton.addEventListener('click', event => {
            const formData = new FormData();
            
            // Usar la API de TinyMCE para obtener el contenido del editor
            const contenido = tinymce.get('mytextarea') ? tinymce.get('mytextarea').getContent() : '';
            
            formData.append('titulo', this.modalCreatePostTitle.value);
            formData.append('contenido', contenido);
            formData.append('user', 1);

            this.httpClient.postFormData(
                this.fetchUrl,
                formData,
                data => this.responseCreate(data)
            );
        });

        // Listener para mostrar el modal de eliminación
        this.modalDeletePost.addEventListener('show.bs.modal', event => {
            // Obtener información del botón que abrió el modal
            const button = event.relatedTarget;
            this.fetchUrl = button.dataset.url;
            
            // Mostrar el título del post en el modal para confirmar
            const modalBody = this.modalDeletePost.querySelector('.modal-body');
            modalBody.innerHTML = `<p>¿Estás seguro que deseas eliminar el post "<strong>${button.dataset.title}</strong>"?</p>`;
        });

        // Listener para el botón de confirmación de eliminación
        this.modalDeletePostButton.addEventListener('click', () => {
            this.httpClient.delete(
                this.fetchUrl,
                {},
                data => this.responseDelete(data)
            );
        });
    }

    formattedDate(date) {
        date = new Date(date);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    responseCommonContent(data) {
        this.responseContent.setContent(data);
        let link = document.getElementById('logoutLink');
        if (link) {
            link.addEventListener('click', event => {
                this.httpClient.post(
                    link.dataset.url,
                    {},
                    data => console.log(data)
                );
            });
        }
    }

    responseCreate(data) {
        console.log('responseCreate', data);
        if (data.result) {
            alert(data.message);

            // Cerrar el modal después de crear el post
            const modal = bootstrap.Modal.getInstance(this.modalCreatePost);
            if (modal) {
                modal.hide();
            }

            // Actualiza el contenido con los nuevos datos
            this.responseCommonContent(data);
        } else {
            alert("Error al crear el post: " + (data.message || "Error desconocido"));
        }
    }

    responseDelete(data) {
        console.log('responseDelete', data);
        if (data.result) {
            // Cerrar el modal después de eliminar el post
            const modal = bootstrap.Modal.getInstance(this.modalDeletePost);
            if (modal) {
                modal.hide();
            }
            
            alert(data.message);
            this.responseCommonContent(data);
        } else {
            // Mostrar mensaje de error dentro del modal
            const modalBody = this.modalDeletePost.querySelector('.modal-body');
            modalBody.innerHTML += `<div class="alert alert-danger mt-3">Error: ${data.message || 'No se pudo eliminar el post'}</div>`;
        }
    }

    responseEdit(data) {
        if (data.result) {
            this.productSuccess.style.display = 'block';
            bootstrap.Modal.getInstance(this.modalEdit).hide();
            this.responseCommonContent(data);
            setTimeout(() => {
                this.productSuccess.style.display = 'none';
            }, 4000);
        } else {
            document.getElementById('modalEditWarning').style.display = 'block';
            console.log('Error en la edición del post');
        }
    }

    responseShow(data) {
        const { titulo, contenido } = data.post;
        this.titulo.value = titulo;
        this.contenido.value = contenido;
    }

    init() {
        this.httpClient.get(
            '/post',
            {},
            (data) => {
                this.responseCommonContent(data);
            }
        );
    }
}