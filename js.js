console.log("JS07 Fetch API");

const getUsers = () => {
    const url = `https://reqres.in/api/users?delay=3` ;
    fetch(url)
        .then( response=> {
            console.log("Status: " + response.status);
            return response.json();
        })
        .then( users => {
            console.log("Total de elementos: " +  users.total  );
            localStorage.setItem("users", JSON.stringify(users)  );
            mostrarUsuarios(users); 

        })
        .catch( error => console.log(error));
}

const mostrarUsuarios = ( users ) => {
    localStorage.setItem("users", JSON.stringify(users)  );
    let usuarios = "";
            for (let dato of users.data){
                usuarios += `<tr>
                            <td>${dato.id}</td>
                            <td>${dato.first_name}</td>
                            <td>${dato.last_name}</td>
                            <td>${dato.email}</td>
                            <td><img src="${dato.avatar}" alt="avatar"</td>
                            </tr>`;

                            document.getElementById('lista').innerHTML = usuarios;
            }       
}

const revisarFecha = () => {
    let fechaAVencer = localStorage.getItem('caducatedDate');
    if(fechaAVencer === null){
        localStorage.setItem('caducatedDate', (new Date().getTime() + 60_000 ));
        getUsers();
    }else if(fechaAVencer > new Date().getTime()){
        getUsers();
    } else {
        localStorage.clear();
        getUsers();
    }
}

window.addEventListener('load', () => {
    const cargando = document.querySelector('.loading');
    cargando.style.opacity = 0;
    cargando.style.visibility = "hidden";
});

