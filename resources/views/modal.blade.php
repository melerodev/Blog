<!-- Modal Create Post -->
<div data-url="/post" data-method="create" class="modal fade" id="createPostModal" tabindex="-1" aria-labelledby="createPostModalLabel" aria-hidden="true">
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