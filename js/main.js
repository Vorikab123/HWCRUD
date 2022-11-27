

const API ="http://localhost:8000/todos"

let inpName = document.getElementById("inpName");
let inpSur = document.getElementById("inpSur");
let inpTel = document.getElementById("inpTel");
let inpImg = document.getElementById("inpImg");
let btn = document.getElementById("btn-add");
// console.log(inpImg,inpName,inpSur,inpTel,btn);

btn.addEventListener("click", async (e)=>{
    let newTodo = {
        Name:inpName.value,
        SurName:inpSur.value,
        Tel:inpTel.value,
        Image:inpImg.value
    }
    // console.log(newTodo);
    if (newTodo.Name.trim()==="" || newTodo.SurName.trim()==="" || newTodo.Tel.trim()==="" ||newTodo.Image.trim()===""){
        alert("заполните поле!")
        return;
    }
    await fetch(API,{
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
    })
    inpName.value = "";
    inpSur.value = "";
    inpTel.value = "";
    inpImg.value = "";
    getTodos()
})
getTodos()
let list= document.getElementById("list");
// console.log(list)
async function getTodos(){
  let response = await fetch(API).then((res)=>res.json());
//   console.log(response)
    list.innerHTML = "";
    response.forEach((item)=>{
        let newElem= document.createElement("div");
        let img = document.createElement("img")
        newElem.id=item.id;
      
        img.src=`${item.Image}`
        img.style.width = "150px"
        img.style.height = "100px"
        img.style.margin = "20px 0px"

        newElem.innerHTML = ` <span>${item.Name}</span>,<span>${item.SurName}</span> <span>${item.Tel}</span>
        <button class="btn-delete">Delete</button>
        <button class="btn-edit">Edit</button>
        `
        list.append(newElem);
        newElem.append(img)
        // console.log(newElem);
    })
}

document.addEventListener("click", async (e)=>{
    //! Delete
    if(e.target.className==="btn-delete"){
        let id = e.target.parentNode.id;
        await fetch(`${API}/${id}`,{
            method: "DELETE",
        })
        getTodos()
    }
})
// ! Update 

document.addEventListener("click", async (e)=>{
    if (e.target.className =="btn-edit"){
        modalEdit.style.display="flex"
        let id = e.target.parentNode.id
        let response = await fetch(`${API}/${id}`).then((res)=>res.json()).catch((a)=>console.log(a))

        editFirstName.value = response.Name
        editLastName.value = response.SurName
        editPhone.value = response.Tel
        editImage.value = response.Image
        editFirstName.className = response.id
        editLastName.className = response.id
        editPhone.className = response.id
        editImage.className = response.id
// console.log(response);

    }
})




let modalEdit = document.getElementById("modal-edit")
let modalEditClose = document.getElementById("modal-edit-close")
let editFirstName = document.getElementById("inp-edit-first-name")
let editLastName = document.getElementById("inp-edit-last-name")
let editPhone = document.getElementById("inp-edit-phone")
let editImage = document.getElementById("inp-edit-image")
let btnSaveEdit = document.getElementById("btn-save-edit")

btnSaveEdit.addEventListener("click",async ()=>{
    if(editFirstName.value.trim()==""|| editLastName.value.trim()=="" || editPhone.value.trim()=="" || editImage.value.trim()==""){
        alert("Заполните поле!")
        return;
    }
    let editedTodo = {
        Name: editName.value,
        SurName: editSurName.value,
        Tel : editTel.value,
        Image : editImage.value,
    }
    
    
    let idf = editName.className
    let idl = editSurName.className
    let idp = editTel.className
    let idi = editImage.className 

    await fetch(`${API}/${idf,idi,idp,idi}`,{
        method: "PATCH",
        body: JSON.stringify(editedTodo),
        headers: {
            "Content-type": "application/json; charset=utf-8",
            
        },
    })
    
    console.log(editedTodo);
    modalEdit.style.display = "none"
    getTodos()
})
modalEdit.style.display = "none"
    getTodos()

modalEditClose.addEventListener("click", ()=>{
    modalEdit.style.display = "none"
})