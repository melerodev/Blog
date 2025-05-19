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

        // Success post modal
        this.modalSuccessPost = document.getElementById('successPostModal');
        this.modalSuccessPostContent = document.querySelector('#successPostModal #success-message');

        // View post modal
        this.modalViewPost = document.getElementById('viewPostModal');
        this.modalViewPostTitle = document.getElementById('post-title-view');
        this.modalViewPostContent = document.getElementById('post-content-view');

        this.modalAddComment = document.getElementById('createCommentModal');
        this.modalAddCommentContent = document.getElementById('comment-content');
        this.modalAddCommentButton = document.getElementById('modalAddCommentButton');
        this.modalAddCommentId = document.getElementById('post-id');

        // Edit post modal
        this.modalEditPost = document.getElementById('editPostModal');
        this.modalEditPostTitle = document.getElementById('post-title-edit');
        this.modalEditPostContent = document.getElementById('mytextarea');
        this.modalEditPostButton = document.getElementById('modalEditPostButton');
        this.modalEditPostId = document.getElementById('post-id');

        this.assignEvents();
    }

    assignEvents() {
        this.modalCreatePost.addEventListener('show.bs.modal', event => {
            this.fetchUrl = this.modalCreatePost.dataset.url;
            this.modalCreatePostTitle.value = '';
            this.modalCreatePostContent.value = '';
            // Asegúrate de que TinyMCE esté inicializado y limpio
            if (tinymce.get('mytextarea')) {
                tinymce.get('mytextarea').setContent('');
            }
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

        // Listener para mostrar el modal de edición
        this.modalEditPost.addEventListener('show.bs.modal', event => {
            // Obtener información del botón que abrió el modal
            const button = event.relatedTarget;
            this.fetchUrl = button.dataset.url;

            // Llenar el formulario con los datos del post
            this.modalEditPostId.value = button.dataset.id;
            this.modalEditPostTitle.value = button.dataset.title;

            // Cargar el contenido del post en el editor TinyMCE
            const content = button.dataset.content;

            // Esperar a que el modal esté completamente visible antes de inicializar TinyMCE
            setTimeout(() => {
                if (tinymce.get('mytextarea-edit')) {
                    tinymce.get('mytextarea-edit').setContent(content);
                } else {
                    // Si el editor no está inicializado, inicializarlo
                    tinymce.init({
                        selector: '#mytextarea-edit',
                        setup: function (editor) {
                            editor.on('init', function () {
                                editor.setContent(content);
                            });
                        }
                    });
                }
            }, 300);
        });

        // Listener para el botón de confirmación de edición
        this.modalEditPostButton.addEventListener('click', () => {
            const formData = new FormData();

            formData.append('id', this.modalEditPostId.value);
            formData.append('titulo', this.modalEditPostTitle.value);
            formData.append('contenido', tinymce.get('mytextarea-edit') ? tinymce.get('mytextarea-edit').getContent() : '');
            formData.append('user', 1);

            this.httpClient.put(
                this.fetchUrl,
                Object.fromEntries(formData),
                data => this.responseEdit(data)
            );
        });

        // Listener para mostrar el modal de visualización
        this.modalViewPost.addEventListener('show.bs.modal', event => {
            // Obtener información del botón que abrió el modal
            const button = event.relatedTarget;
            this.fetchUrl = button.dataset.url;

            // Llenar el modal con los datos del post
            this.modalViewPostTitle.textContent = button.dataset.title;
            this.modalViewPostContent.innerHTML = button.dataset.content;
        });

        // Listener para mostrar el modal de agregar comentario
        this.modalAddCommentButton.addEventListener('click', event => {
            const formData = new FormData();
            formData.append('texto', this.modalAddCommentContent.value);
            // Obtener el ID del artículo de la URL actual de visualización
            const articuloId = this.fetchUrl.split('/').pop();
            formData.append('articulo', articuloId);
            formData.append('user', 1);

            // Configurar correctamente la URL de fetch antes de enviar el formulario
            // Usar solo la URL base sin añadir el ID del artículo
            const commentUrl = this.modalAddComment.dataset.url;

            this.httpClient.postFormData(
                commentUrl,
                formData,
                data => {
                    console.log(data);
                    if (data.result) {
                        // Cerrar el modal después de agregar el comentario
                        const modal = bootstrap.Modal.getInstance(this.modalAddComment);
                        if (modal) {
                            modal.hide();
                        }

                        // Mostrar el mensaje de éxito en el modal de éxito
                        this.showSuccessModal(data.message || "Comentario agregado exitosamente");

                        // Actualiza el contenido con los nuevos datos
                        this.responseCommonContent(data);
                    } else {
                        // Mostrar el mensaje de error en el modal de warning
                        this.showWarningModal("Error al agregar el comentario: " + (data.message || "Error desconocido"));
                    }
                }
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

    showSuccessModal(message) {
        this.modalSuccessPostContent.textContent = message;
        const modal = new bootstrap.Modal(this.modalSuccessPost);
        modal.show();
    }

    showWarningModal(message) {
        this.modalWarningPostContent.textContent = message;
        const modal = new bootstrap.Modal(this.modalWarningPost);
        modal.show();
    }

    responseCreate(data) {
        console.log('responseCreate', data);
        if (data.result) {
            // Cerrar el modal después de crear el post
            const modal = bootstrap.Modal.getInstance(this.modalCreatePost);
            if (modal) {
                modal.hide();
            }

            // Mostrar el mensaje de éxito en el modal de éxito
            this.showSuccessModal(data.message || "Post creado exitosamente");

            // Actualiza el contenido con los nuevos datos
            this.responseCommonContent(data);
        } else {
            // Mostrar el mensaje de error en el modal de warning
            this.showWarningModal("Error al crear el post: " + (data.message || "Error desconocido"));
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

            // Mostrar el mensaje de éxito en el modal de éxito
            this.showSuccessModal(data.message || "Post eliminado exitosamente");

            // Actualiza el contenido con los nuevos datos
            this.responseCommonContent(data);
        } else {
            // Cerrar el modal de eliminación
            const modal = bootstrap.Modal.getInstance(this.modalDeletePost);
            if (modal) {
                modal.hide();
            }

            // Mostrar el mensaje de error en el modal de warning
            this.showWarningModal(data.message || "Error al eliminar el post");
        }
    }

    responseEdit(data) {
        if (data.result) {
            // Cerrar el modal de edición
            const modal = bootstrap.Modal.getInstance(this.modalEditPost);
            if (modal) {
                modal.hide();
            }

            // Mostrºar mensaje de éxito
            this.showSuccessModal(data.message || "Post actualizado exitosamente");

            // Actualizar la lista de posts
            this.responseCommonContent(data);
        } else {
            // Mostrar mensaje de error
            this.showWarningModal(data.message || "Error al actualizar el post");
        }
    }

    responseShow(data) {
        const { titulo, contenido } = data.post;
        this.modalViewPostTitle.textContent = titulo;
        this.modalViewPostContent.innerHTML = contenido;

        const modal = new bootstrap.Modal(this.modalViewPost);
        modal.show();
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