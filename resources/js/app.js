    new Vue({
        el: '#crud',
        created: function() {
            this.getAll(); //traigo listado
        },
        data:{
            keeps:[], //todas las tareas
            newKeep: '',
            errors: [],
            fillKeep: { 'id': '', 'keep': ''},
            pagination: {
                'total'        : 0,
                'current_page' : 0,
                'per_page'     : 0,
                'last_page'    : 0,
                'from'         : 0,
                'to'           : 0
            },
            offset: 3
        },
        computed: { //funciones para activar el boton de la paginacion
            isActived: function(){
                return this.pagination.current_page;
            },
            pagesNumber: function(){
                if(!this.pagination.to){
                    return [];
                }

                var from = this.pagination.current_page - this.offset; 

                if(from < 1){
                    from = 1;
                }

                var to = from + (this.offset + 2);

                if(to >= this.pagination.last_page){
                    to = this.pagination.last_page;
                }

                var pagesArray = [];

                while( from <= to){
                    pagesArray.push(from);
                    from++;
                }

                return pagesArray;
            }
        },
        methods:{
            getAll: function(page){
                var urlKeeps = 'tasks?page='+page;
                axios.get(urlKeeps).then(response => {
                    this.keeps = response.data.tasks.data,
                    this.pagination = response.data.pagination //aca estamos cargando el array que viene del controlador
                });
            },
            deleteKeep: function(keep){
                var url = 'tasks/' + keep.id; 
                axios.delete(url).then(response=>{ //elimino y ejecuto funcion para volver a cargar la lista
                    this.getAll();
                    toastr.success('Eliminado Correctamente');
                });
            },
            createKeep: function(){
                var url = 'tasks';
                axios.post(url, { //guardo
                    keep: this.newKeep
                }).then(response => {
                    this.getAll();//listo tareas con la nueva guardada
                    this.newKeep = ''; //caja de texto q inicialmente tiene un contenido y queda vacia
                    this.errors = []; //blanqueo errores y cerramos form
                    $('#create').modal('hide');//cierro modal
                    toastr.success('Tarea creada con exito');
                }).catch(error => {
                    this.errors = 'ERROR INESPERADO :'+ error; //muestro error
                })
            },
            editKeep: function(keep){
                this.fillKeep.id = keep.id;
                this.fillKeep.keep = keep.keep;

                $('#edit').modal('show');
            },
            updateKeep: function(id){
                var url = 'tasks/' + id;
                axios.put(url, this.fillKeep).then(response=> {
                    this.getAll();
                    this.fillKeep= { 'id': '', 'keep': ''};
                    this.error = [];
                    $('#edit').modal('hide');
                    toastr.success('Tarea actualizado Correctamente');
                }).catch(error => {
                    this.errors = error.response.data;
                })
            },
            changePage: function(page){
                this.pagination.current_page = page;
                this.getAll(page);
            }
        }
        
    });
