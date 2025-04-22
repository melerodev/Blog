<!-- Modal Create Post -->
<div class="modal fade" id="createPostModal" tabindex="-1" aria-labelledby="createPostModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createPostModalLabel">Create New Post</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="#" method="POST">
                    <div class="mb-3">
                        <label for="modalPostTitle" class="form-label">Post Title</label>
                        <input type="text" class="form-control" id="modalPostTitle" name="title" required>
                    </div>
                    <div class="mb-3">
                        <label for="modalPostContent" class="form-label">Post Content</label>
                        <textarea id="modalPostContent" name="content"></textarea>
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