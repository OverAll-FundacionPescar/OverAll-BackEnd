//Despreciado
const button = document.getElementById("btnsub")
button.addEventListener("click", async () => {
    const email = document.getElementById("email")
    const password = document.getElementById("password")

    
    const body = { email:email.value, password:password.value}
    
    const respuesta = await fetch("http://localhost:4300/signin/login", {method:"POST", headers: 
        {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)})
    if(!respuesta.ok){
        console.log("ERROR: " + respuesta.status)
    }
    console.log(respuesta)
    // const token = await respuesta.json()
    // document.cookie = `token=${token.token}`
    // window.location.href = "/"
})