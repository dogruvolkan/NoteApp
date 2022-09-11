$(function(){

    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    let isUpdate = false;
    let updateId;

    $(".add-box").click(function(){
        $(".popup-box,  .popup").css({
            "opacity" : "1",
            "pointer-events":"auto"
        });
        $("input").focus();
    })
    $(".fa-xmark").click(function(){
        let isUpdate = false;
        $(".popup-box,  .popup").css({
            "opacity" : "0",
            "pointer-events":"none"
        });
        $("input").val("");
        $("textarea").val("");
    })


    function showNotes(){
        document.querySelectorAll(".note").forEach(note => note.remove())
        notes.map((note , index) =>{         
            let liTag = ` <li class="note">
                            <div class="details">
                                <p>${note.title}</p>
                                <span>${note.description}</span>  
                            </div>
                            <div class="bottom-content">
                                <span>${note.date}</span>
                                <div class="settings">
                                    <i class="fa-solid fa-ellipsis"></i>
                                    <ul class="menu">
                                        <li><i class="fa-solid fa-pen"></i>Edit</li>
                                        <li><i class="fa-solid fa-trash"></i>Delete</li>
                                    </ul>
                                </div>
                            </div>
                        </li>  `
            
            $(".add-box").after(liTag);
            
            
            $(".fa-trash").click(function(){
                console.log("click")
                notes.splice(index , 1);
                localStorage.setItem("notes",JSON.stringify(notes));
                location.reload();
            })
    
            $(".fa-pen").click(function(){
                isUpdate=true;
                updateId= index;
                $(".add-box").click();
                $("input").focus();
                $("header p").text("Update a note");
                $("button").text("Update note")
                $("input").val(note.title);
                $("textarea").val(note.description);
            })
    
            $("header p").text("Add a note");
            $("button").text("Add note")
        })
       
    }

    showNotes();

    $(".fa-ellipsis").click(function(){
        const x = $(this).parent();
        x.toggleClass("show");
    })


    $("button").click(function(e){
        e.preventDefault();
        const noteTitle = $("input").val();
        const noteDesc = $("textarea").val();
        if(noteTitle || noteDesc){
            $("input").val("");
            $("textarea").val("")
        
            const months =["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
            let tarih = new Date();
            let ay = months[tarih.getMonth()];
            let gun = tarih.getDate();
            let yil = tarih.getFullYear();
            let saat = tarih.getHours();
            let dakika = tarih.getMinutes();
            if(gun<10){
                gun = "0"+gun;
            }
            if(saat<10){
                saat = "0"+saat;
            }
            if(dakika<10){
                dakika = "0"+dakika;
            }

            let noteInfo ={
                title:noteTitle,
                description : noteDesc,
                date:`${ay} ${gun} ${yil} ${saat}:${dakika}`
            }

            if(!isUpdate){
                notes.push(noteInfo);
            } 
            else{
                isUpdate = false;
                notes[updateId] = noteInfo;
            }        
            localStorage.setItem("notes",JSON.stringify(notes));
            $(".fa-xmark").click();
            showNotes();
        }
        
    })

})