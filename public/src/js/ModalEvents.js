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

        this.buttomCreatePost = document.getElementById('createPostButton');
        this.modalCreatePost = document.getElementById('createPostModal');
        this.modalCreatePostTitle = document.getElementById('post-title');
        this.modalCreatePostContent = document.getElementById('mytextarea');
        this.modalCreatePostButton = document.getElementById('modalCreatePostButton');
        this.assignEvents();
    }

    assignEvents() {
        this.buttomCreatePost.addEventListener('click', event => {
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
            formData.append('user', 1); // Cambiado de "Alejandro" a 1 (entero)

            this.httpClient.postFormData(
                this.fetchUrl,
                formData,
                data => this.responseCreate(data)
            );
        });

        // Listener para mostrar el modal de eliminación
        // this.modalDelete.addEventListener('show.bs.modal', event => {
        //     document.getElementById('modalDeleteWarning').style.display = 'none';
        //     this.fetchUrl = event.relatedTarget.dataset.url;
        //     this.deleteName.textContent = event.relatedTarget.dataset.name;
        // });

        // // Listener para el botón de edición
        // this.modalEditButton.addEventListener('click', event => {
        //     const formData = {
        //         title: this.editTitle.value,
        //         content: this.editContent ? this.editContent.getContent() : '',
        //         page: this.responseContent.currentPage
        //     };

        //     this.httpClient.put(
        //         this.fetchUrl,
        //         formData,
        //         data => this.responseEdit(data)
        //     );
        // });
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
            alert(data.message);
            this.responseCommonContent(data);
            setTimeout(() => {
                this.productSuccess.style.display = 'none';
            }, 4000);
        } else {
            document.getElementById('modalDeleteWarning').style.display = 'block';
            console.log('Error en la eliminación del post');
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