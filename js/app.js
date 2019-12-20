const app = new Vue({
    el: '#app',
    data: {
        menu: true,
        respuesta: '',
        listar: [],
        buscar: '',
        itemId: '',
        formEditar: {},
        userPost: ''
    },
    created() {
        axios.get('http://127.0.0.1/snipets/api/crud/getPost.php')
            .then(res => {
                this.listar = res.data
            })
        this.getId();
        this.getUser();
        this.getCategoria();
    },
    computed: {
        datosFiltrados() {
            return this.listar.filter((filtro) => {
                return filtro.titulo.toUpperCase().match(this.buscar.toUpperCase()) || filtro.descripcion.toUpperCase().match(this.buscar.toUpperCase())
            })
        }
    },
    methods: {
        alta() {
            const form = document.getElementById('altaPost');
            axios.post('../api/crud/altaPost.php', new FormData(form))
                .then(res => {
                    this.respuesta = res.data
                    if (res.data == 'success') {
                        swal({
                            title: 'Buen Trabajo',
                            text: 'Post guardado',
                            icon: 'success',
                            button: 'ok'
                        })
                        form.reset();
                    } else {
                        swal({
                            title: 'Error..!!!',
                            text: 'No se pudo guardar el Post',
                            icon: 'error',
                            button: 'ok'
                        });
                    }
                })
        },
        getId() {
            let uri = window.location.href.split('?');
            if (uri.length == 2) {
                let vars = uri[1].split('&');
                let getVars = {};
                let tmp = '';
                vars.forEach(function(v) {
                    tmp = v.split('=');
                    if (tmp.length == 2) {
                        getVars[tmp[0]] = tmp[1];
                    }
                });
                this.itemId = getVars
                    //console.log(this.itemId.id)
                axios.get('http://localhost/snipets/api/crud/getId.php?id=' + this.itemId.id)
                    .then(res => {
                        this.formEditar = res.data
                    })
            }
        },
        editar() {
            const form = document.getElementById('editarPost')
            axios.post('../api/crud/editarPost.php', new FormData(form))
                .then(res => {
                    this.respuesta = res.data
                    if (res.data == 'success') {

                        swal({
                            title: 'Buen Trabajo',
                            text: 'Post guardado',
                            icon: 'success',
                            button: 'ok',
                            position: 'top-end',
                        })
                        location.href = 'index.php'
                        idButton == 1;
                        this.rutas(idButton)
                    } else {
                        swal('El post no se pudo editar')
                    }
                })
        },
        eliminar(id) {
            swal({
                    title: 'Seguro que deseas eliminar el post',
                    text: 'Al eliminarlo no podras recuperarlo',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true,
                })
                .then((aceptar) => {
                    if (aceptar) {
                        axios.get('http://localhost/snipets/api/crud/eliminar.php?id=' + id)
                            .then(res => {
                                if (res.data == 'success') {
                                    swal('post eliminado')
                                    this.getCategoria()
                                } else {
                                    swal('post no eliminado')
                                }
                            })
                    } else {
                        return false
                    }
                })
        },
        getUser() {
            axios.get('http://127.0.0.1/snipets/api/crud/getUser.php')
                .then(res => {
                    this.userPost = res.data
                })
        },
        getCategoria() {
            let uri = window.location.href.split('?');
            if (uri.length == 2) {
                let vars = uri[1].split('&');
                let getVars = {};
                let tmp = '';
                vars.forEach(function(v) {
                    tmp = v.split('=');
                    if (tmp.length == 2) {
                        getVars[tmp[0]] = tmp[1];
                    }
                });
                this.itemId = getVars
                console.log(this.itemId.id)
                axios.get('http://127.0.0.1/snipets/api/crud/getCategoria.php?cat=' + this.itemId.cat)
                    .then(res => {
                        this.listar = res.data
                    })
            } else {
                axios.get('http://127.0.0.1/snipets/api/crud/getPost.php')
                    .then(res => {
                        this.listar = res.data
                    })
            }
        },
        rutas(idButton) {
            var ruta1 = document.getElementById('ruta1');
            var ruta2 = document.getElementById('ruta2');

            switch (idButton) {
                case 1:
                    ruta1.style.display = 'block';
                    ruta2.style.display = 'none';
                    break;

                case 2:
                    ruta1.style.display = 'none';
                    ruta2.style.display = 'block';
                    break;

                default:
                    alert("hay un problema: No existe la Ruta.")
            }

        }
    }
})