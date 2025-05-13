import ResponseRow from './ResponseRow.js';

export default class ResponseContent {
    constructor(content) {
        this.content = content;
        this.responseRow = new ResponseRow(this.content, null, document.querySelector('meta[name="url-base"]')['content'], document.querySelector('meta[name="csrf-token"]')['content']);
    }

    cleanContent(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    setContent(result) {
        this.cleanContent(this.content);
        console.log(result.articulos);

        // result.articulos.links.forEach(link => {
        //     this.pageItem.add(link, (data) => {
        //         this.setContent(data);
        //     });
        // });

        result.articulos.forEach(article => {
            this.responseRow.add({
                id: article.id,
                title: article.titulo,
                content: article.contenido,
                user: article.user,
                created_at: article.created_at,
                updated_at: article.updated_at
            });
        });
    }
}