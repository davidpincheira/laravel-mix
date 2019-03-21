    new Vue({
        el: '#crud',
        created: function() {
            this.getKeeps(); //traigo listado
        },
        data:{
            keeps:[], //todas las tareas
            newKeep: '',
            errors: []
        },
        methods:{
            getKeeps: function(){
                var urlKeeps = 'tasks';
                axios.get(urlKeeps).then(response => {
                    this.keeps = response.data
                });
            },
            deleteKeep: function(keep){
                var url = 'tasks/' + keep.id; 
                axios.delete(url).then(response=>{ //elimino y ejecuto funcion para volver a cargar la lista
                    this.getKeeps();
                    toastr.success('Eliminado Correctamente');
                });
            },
            createKeep: function(){
                var url = 'tasks';
                axios.post(url, {               //guardo
                    keep: this.newKeep
                }).then(response => {
                    this.getKeeps();//listo tareas con la nueva guardada
                    this.newKeep = ''; //caja de texto q inicialmente tiene un contenido y queda vacia
                    this.errors = []; //blanqueo errores y cerramos form
                    $['#create'].modal('hide');
                    toastr.success('Tarea creada con exito');
                }).catch(error => {
                    console.log(error.response.data);
                    this.errors = error.response.data; //muestro error
                })
            },
        }
        
    });
