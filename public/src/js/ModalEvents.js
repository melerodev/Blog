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

        this.buttomCreatePost = document.getElementById('buttonCreatePost');
        this.modalCreatePost = document.getElementById('createPostModal');
        this.modalCreatePostButton = document.getElementById('modalCreatePostButton');
        this.createTitle = document.getElementById('modalPostTitle');
        this.createContent = document.getElementById('modalPostContent');

        // this.modalDelete = document.getElementById('deleteModal');
        // this.modalDeleteButton = document.getElementById('modalDeleteButton');
        // this.deleteName = document.getElementById('deleteName');

        // this.modalEdit = document.getElementById('editPostModal');
        // this.modalEditButton = document.getElementById('modalEditPostButton');
        // this.editTitle = document.getElementById('modalEditPostTitle');
        // this.editContent = document.getElementById('modalEditPostContent');

        // this.productError = document.getElementById('productError');
        // this.productSuccess = document.getElementById('successAlert'); // Ajuste del ID para coincidir con el archivo Blade

        this.assignEvents();
    }

    assignEvents() {
        // this.buttomCreatePost.addEventListener('show.bs.modal', event => {
        //     console.log('show.bs.modal');
        //     // document.getElementById('modalCreateWarning').style.display = 'none';
        //     this.fetchUrl = event.relatedTarget.dataset.url;
        //     this.createTitle.value = '';
        //     this.createContent.value = '';
        // });

        // Listener para mostrar el modal de eliminación
        // this.modalDelete.addEventListener('show.bs.modal', event => {
        //     document.getElementById('modalDeleteWarning').style.display = 'none';
        //     this.fetchUrl = event.relatedTarget.dataset.url;
        //     this.deleteName.textContent = event.relatedTarget.dataset.name;
        // });

        // // Listener para el botón de eliminación
        // this.modalDeleteButton.addEventListener('click', event => {
        //     this.httpClient.delete(
        //         this.fetchUrl,
        //         {
        //             page: this.responseContent.currentPage
        //         },
        //         data => this.responseDelete(data)
        //     );
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
        if(link) {
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
        if(data.result) {
            this.productSuccess.style.display = 'block';
            bootstrap.Modal.getInstance(this.modalCreatePost).hide();
            // Actualiza el contenido con los nuevos datos
            this.responseCommonContent(data);
            setTimeout(() => {
                this.productSuccess.style.display= 'none';
            }, 4000);
        } else {
            document.getElementById('modalCreateWarning').style.display = 'block';
            console.log('Error en la creación del post');
        }
    }

    responseDelete(data) {
        console.log('responseDelete', data);
        if(data.result) {
            this.productSuccess.style.display = 'block';
            bootstrap.Modal.getInstance(this.modalDelete).hide();
            this.responseCommonContent(data);
            setTimeout(() => {
                this.productSuccess.style.display= 'none';
            }, 4000);
        } else {
            document.getElementById('modalDeleteWarning').style.display = 'block';
            console.log('Error en la eliminación del post');
        }
    }

    responseEdit(data) {
        if(data.result) {
            this.productSuccess.style.display = 'block';
            bootstrap.Modal.getInstance(this.modalEdit).hide();
            this.responseCommonContent(data);
            setTimeout(() => {
                this.productSuccess.style.display= 'none';
            }, 4000);
        } else {
            document.getElementById('modalEditWarning').style.display = 'block';
            console.log('Error en la edición del post');
        }
    }

    responseShow(data) {
        const {titulo, contenido} = data.post;
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
        // this.responseCommonContent("x");
    }
}