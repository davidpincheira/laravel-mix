<form action="PUT" v-on:submit.prevent="updateKeep(fillKeep.id);">
    <div class="modal fade" id="edit">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h4>Editar</h4>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <label for="keep">Actualizar Tarea</label>
                    <input type="text" name="keep" class="form-control" v-model="fillKeep.keep">
                    <span v-for="error in errors" class="text-danger">@{{ error }}</span>
                </div>
                <div class="modal-footer">
                    <input type="submit" class="btn btn-primary" value="Actualizar">
                </div>
            </div>
        </div>
    </div>
</form>