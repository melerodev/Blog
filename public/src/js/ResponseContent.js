import PageItem from './PageItem.js';
import ResponseRow from './ResponseRow.js';

console.log('ResponseContent.js loaded');

export default class ResponseContent {


    constructor(content) {
        this.content = content;
        this.responseRow = new ResponseRow(this.content, null, document.querySelector('meta[name="url-base"]')['content'], document.querySelector('meta[name="csrf-token"]')['content']);
    }

    // cleanContent(element) {
    //     while (element.firstChild) {
    //         element.removeChild(element.firstChild);
    //     }
    // }

    setContent(result) {
        console.log('setContent');
        // this.cleanContent(this.content);

        // this.currentPage = result.songs.current_page;

        <button id="createPostButton" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#createPostModal">Create Post</button>
        const buttonCreate = document.getElementById('createPostButton');
        buttonCreate.setAttribute('data-bs-toggle', 'modal');
        buttonCreate.setAttribute('data-bs-target', '#createPostModal');
        buttonCreate.dataset.url = "/postcreate";
        buttonCreate.dataset.method = "post";
        buttonCreate.style.margin = '5px 5px 5px';
        buttonCreate.classList.add('btn', 'btn-success');
        this.content.appendChild(buttonCreate);


        // result.articulos.links.forEach(link => {
        //     this.pageItem.add(link, (data) => {
        //         this.setContent(data);
        //     });
        // });

        // result.articulos.data.forEach(song => {
        //     this.responseRow.add({
        //         id: song.id,
        //         name: song.title,
        //         imageUrl: song.route_image,
        //         songUrl: song.route_song,
        //         artist: song.artist,
        //         category: song.category_id,
        //         created_at: song.created_at,
        //         updated_at: song.updated_at
        //     });
        // });
    }
}