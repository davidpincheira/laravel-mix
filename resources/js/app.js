    new Vue({
        el: '#crud',
        created: function() {
            this.getKeeps(); //traigo listado
        },
        data:{
            keeps:[] //todas las tareas
        },
        methods:{
            getKeeps: function(){
                var urlKeeps = 'tasks';
                axios.get(urlKeeps).then(response => {
                    this.keeps = response.data
                });
            },
            deleteKeep: function(keep){
                var url = 'tasks/' + keep.id; //elimino
                axios.delete(url).then(response=>{ //ejecuto funcion para volver a cargar la lista
                    this.getKeeps();
                });
            }
        }
        
    });
