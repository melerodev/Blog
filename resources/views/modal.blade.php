<!-- Modal Create Post -->
<div data-url="/post" data-method="create" class="modal fade" id="createPostModal" tabindex="-1"
    aria-labelledby="createPostModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createPostModalLabel">Create New Post</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="#" method="POST">
                    <div class="mb-3">
                        <label for="post-title" class="form-label">Post Title</label>
                        <input type="text" class="form-control" id="post-title" name="titulo" required>
                    </div>
                    <div class="mb-3">
                        <label for="post-content" class="form-label">Post Content</label>
                        <textarea id="mytextarea" name="contenido"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" id="modalCreatePostButton" class="btn btn-primary">Publish</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Delete Post -->
<div data-url="/post" data-method="delete" class="modal fade" id="deletePostModal" tabindex="-1"
    aria-labelledby="deletePostModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deletePostModalLabel">Delete Post</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete this post?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" id="modalDeletePostButton" class="btn btn-danger">Delete</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Edit Post -->
<div data-url="/post" data-method="update" class="modal fade" id="editPostModal" tabindex="-1"
    aria-labelledby="createPostModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createPostModalLabel">Create New Post</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="#" method="POST">
                    <div class="mb-3">
                        <label for="post-title-edit" class="form-label">Post Title</label>
                        <input type="text" class="form-control" id="post-title-edit" name="titulo" required>
                        <input type="hidden" id="post-id" name="id">
                    </div>
                    <div class="mb-3">
                        <label for="post-content" class="form-label">Post Content</label>
                        <textarea id="mytextarea-edit" name="contenido"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" id="modalEditPostButton" class="btn btn-primary">Publish</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal warning Post -->
<div data-url="/post" data-method="warning" class="modal fade" id="warningPostModal" tabindex="-1"
    aria-labelledby="warningPostModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="warningPostModalLabel">Warning</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" id="modalWarningPostButton" class="btn btn-danger">Delete</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal View Post -->
<div data-url="/post" data-method="view" class="modal fade" id="viewPostModal" tabindex="-1"
    aria-labelledby="viewPostModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="viewPostModalLabel">View Post</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h5 id="post-title-view"></h5>
                <p id="post-content-view"></p>

                <!-- Contenedor de comentarios -->
                <div id="comments-container" class="mt-3">
                    <!-- Formulario para añadir comentarios -->
                    <div id="createCommentModal" data-url="/comment" data-method="create">
                        <div class="mb-3">
                            <label for="comment-content" class="form-label">Añadir un comentario</label>
                            <textarea id="comment-content" class="form-control" rows="3" required></textarea>
                            <input type="hidden" id="comment-post-id" name="articulo">
                        </div>
                        <button id="modalAddCommentButton" class="btn btn-primary">Enviar</button>
                    </div>
                    
                    <h5>Comentarios</h5>
                    <ul id="comments-list" class="list-group">
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Success Post -->
<div class="modal fade" id="successPostModal" tabindex="-1" aria-labelledby="successPostModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="successPostModalLabel">Operación exitosa</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="alert alert-success">
                    <p id="success-message"></p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>