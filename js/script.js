
import photodb, {
    bulkcreate,
    getData,
    checkdb
} from './Module.js'

let db = photodb("photodb", {
    photos: `++id,url,hdurl,title,explanation,date, isliked`
});

document.addEventListener('DOMContentLoaded', function() {

    let modal = document.getElementById("myModal");

    let navigationLinks = document.querySelectorAll(".navigation-link");

    if (!localStorage.getItem('visited')) {
        localStorage.setItem('visited', 'true');
        document.querySelector('.instruction').style.display = "block";

    }
    else {
        document.querySelector('.instruction').style.display = "none";
    }

    document.querySelector('.close-instruction').addEventListener('click', function() {
        document.querySelector('.instruction').style.display = "none";
    })

    document.querySelector('.toggle-button').addEventListener('click', function() {
        document.querySelector('.navigation-list').classList.toggle('show-navList')
    })

    document.querySelector('.add-images-btn').addEventListener('click', function() {
        search_form ();
        modal.style.display = 'block';
        document.querySelector('.modal-content').style.display = 'block';
        document.querySelector('.instruction').style.display = "none";
    })

    document.querySelector('.close-div').addEventListener('click', function() {
        modal.style.display ='none';
    })

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.querySelector(".spinner").style.display = 'none';
        }
    })

    document.querySelector('#search-form').addEventListener('submit', function(event) {
        event.preventDefault();

        let date = document.querySelector("#date").value;
        let startDate = document.querySelector("#startdate").value;
        let endDate = document.querySelector("#enddate").value;
        let count = document.querySelector("#count").value;
        
        // Get the difference between start date and end date
        let date1 = new Date(startDate);
        let date2 = new Date(endDate);

        let dateTimeDifference = date2.getTime() - date1.getTime();
        let dateDaysDifference = dateTimeDifference / (1000 * 3600 * 24);

        if (date != "" && startDate != "") {
            document.querySelector(".themessage").innerHTML = "Cannot fill both date and start date field";
            document.querySelector(".form-message").style.display = 'block';
            setTimeout(function() {
                document.querySelector(".form-message").style.display = 'none';
            },2500)
        }
        else if (date != "" && endDate != "") {
            document.querySelector(".themessage").innerHTML = "Cannot fill both date and end date field"; 
            document.querySelector(".form-message").style.display = 'block';
            setTimeout(function() {
                document.querySelector(".form-message").style.display = 'none';
            },2500)
        }
        else if (date != "" && count != "") {
            document.querySelector(".themessage").innerHTML = "Cannot fill both date and count field"; 
            document.querySelector(".form-message").style.display = 'block';
            setTimeout(function() {
                document.querySelector(".form-message").style.display = 'none';
            },2500)
        }
        else if (startDate != "" && count != "" || endDate != "" && count != "") {
            document.querySelector(".themessage").innerHTML = "Cannot fill both start date and count field or end date and count field"; 
            document.querySelector(".form-message").style.display = 'block';
            setTimeout(function() {
                document.querySelector(".form-message").style.display = 'none';
            },2500)
        }
        else if (date == "" && count == "" && startDate == "" && endDate == "") {
            document.querySelector(".themessage").innerHTML = "Please input a field"; 
            document.querySelector(".form-message").style.display = 'block';
            setTimeout(function() {
                document.querySelector(".form-message").style.display = 'none';
            },2500)
        }
        else if (parseInt(dateDaysDifference, 10) > 5) {
            document.querySelector(".themessage").innerHTML = "Choose a range less than 6"; 
            document.querySelector(".form-message").style.display = 'block';
            setTimeout(function() {
                document.querySelector(".form-message").style.display = 'none';
            },2500)
        }
        else {
            document.querySelector('.nothing-img').style.display = 'none';

            get_images();

            document.querySelector(".modal-content").style.display = 'none';
            document.querySelector('.all').classList.add('active')
            document.querySelector('.liked').classList.remove('active')
            document.querySelector('.unliked').classList.remove('active')
            document.querySelector(".gallery-div").style.display = 'block';
            document.querySelector('.delete-all').style.display = 'block';

        }
    })

    document.querySelector('.liked').addEventListener('click', function() {

        navigationLinks.forEach(function (navigationLink) {
            if (navigationLink.classList.contains('active')) {
                navigationLink.classList.remove('active')
            }
            document.querySelector('.liked').classList.add('active')
        })

        while(document.querySelector('.gallery-div').hasChildNodes()) {
            document.querySelector('.gallery-div').removeChild(document.querySelector('.gallery-div').firstChild)
        }
    
        getData(db.photos, function(data) {
            
            if(data.isliked == 'true') {
                createGallery(data)
            }
            else {
                return
            }
        })

        document.querySelector('.delete-all').style.display = 'none';
         document.querySelector('.navigation-list').classList.remove('show-navList')
    })

    document.querySelector('.unliked').addEventListener('click', function() {

        navigationLinks.forEach(function (navigationLink) {
            if (navigationLink.classList.contains('active')) {
                navigationLink.classList.remove('active')
            }
            document.querySelector('.unliked').classList.add('active')
        })

        while(document.querySelector('.gallery-div').hasChildNodes()) {
            document.querySelector('.gallery-div').removeChild(document.querySelector('.gallery-div').firstChild)
        }
    
        getData(db.photos, function(data) {
            if(data.isliked == 'false') {
                createGallery(data)
            }
            else {
                return
            }
        })

        document.querySelector('.delete-all').style.display = 'none';
         document.querySelector('.navigation-list').classList.remove('show-navList')
    })

    document.querySelector('.all').addEventListener('click', function() {

        navigationLinks.forEach(function (navigationLink) {
            if (navigationLink.classList.contains('active')) {
                navigationLink.classList.remove('active')
            }
            document.querySelector('.all').classList.add('active')
        })

        while(document.querySelector('.gallery-div').hasChildNodes()) {
            document.querySelector('.gallery-div').removeChild(document.querySelector('.gallery-div').firstChild)
        }
    
        getData(db.photos, function(data) {
            if (data != 0) {
                createGallery(data)
            }
            else {
                return
            }

            if (document.querySelector('.gallery-div').hasChildNodes()) {
                document.querySelector('.delete-all').style.display = 'block';
            }
            else {
                document.querySelector('.delete-all').style.display = 'none';
            }
        })
         document.querySelector('.navigation-list').classList.remove('show-navList')
    })

    document.querySelector('.delete-all').addEventListener('click', function() {
        document.querySelector('.gallery-div').style.display = 'none';
        document.querySelector('.delete-all').style.display = 'none';
        document.querySelector('.nothing-img').style.display = 'block';
        document.querySelector('.gallery-div').innerHTML = "";
        db.delete();
        db = photodb("photodb", {
            photos: `++id,url,hdurl,title,explanation,date,isliked`
        });
        db.open();
        gallery();
    })

    maxDate();

    checkdb(db.photos, document.querySelector('.nothing-img'), document.querySelector('.gallery-div'), document.querySelector('.delete-all'), gallery)

    show_bodyImage();
})



let checklikestate;

function show_bodyImage() {
    if (document.querySelector('.gallery-div').hasChildNodes()) {
        document.querySelector('.nothing-img').style.display = 'none';
        document.querySelector('.delete-all').style.display = 'block';
    }
    else {
        document.querySelector('.nothing-img').style.display = 'block';
        document.querySelector('.delete-all').style.display = 'none';
    }
}

function search_form () {
    document.querySelector("#date").value = "";  
    document.querySelector("#count").value = ""; 
    document.querySelector("#resolution1").checked = false;
    document.querySelector("#resolution2").checked = false;
    document.querySelector("#startdate").value = "";
    document.querySelector("#enddate").value = "";
}

function maxDate () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if (dd<10) {
        dd = '0' + dd
    }

    if (mm<10) {
        mm = '0' + mm
    }

    today = yyyy+"-"+mm+"-"+dd;
    document.querySelector("#date").setAttribute("max", today);
    document.querySelector("#startdate").setAttribute("max", today);
    document.querySelector("#enddate").setAttribute("max", today);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
}

function parseJSON(response) {
    return response.json()
}

function sendRequest(url) {

    document.querySelector(".spinner").style.display = 'block';

    fetch(url)
    .then(checkStatus)
    .then(parseJSON)
    .then(images => {

        setTimeout(function() {
            document.querySelector(".spinner").style.display = 'none';
            document.querySelector("#myModal").style.display = 'none';
        }, 2500)
        
        if (!Array.isArray(images)) {
            checklikestate = 'false';

            bulkcreate(db.photos, {
                url: images.url,
                hdurl: images.hdurl,
                title: images.title,
                explanation: images.explanation,
                date: images.date,
                isliked: checklikestate
            })
        }
        
        else {
            Array.prototype.forEach.call(images, function(image) {

                checklikestate = 'false';

                bulkcreate(db.photos, {
                    url: image.url,
                    hdurl: image.hdurl,
                    title: image.title,
                    explanation: image.explanation,
                    date: image.date,
                    isliked: checklikestate
                })
            })
        }
        gallery();
    }).catch(function(error) {
        console.log('request failed', error)
      })
}

function get_images() {

    let date = document.querySelector("#date").value;
    let count = document.querySelector("#count").value;
    let startDate = document.querySelector("#startdate").value;
    let endDate = document.querySelector("#enddate").value;
    let resolution;
    let resolutionFields = document.getElementsByName('resolution');
    let url;
    let i;

    for (i = 0; i < resolutionFields.length; i++) {
        if (resolutionFields[i].checked) {
            let checkresolution = resolutionFields[i].value;
            if (checkresolution == 'Yes') {
                resolution = true;
            }
            else {
                resolution = false;
            }        
        }
        else {
            resolution = true;
        }
    }

    if (date == "" || date == null || date == undefined) {
        url = `https://api.nasa.gov/planetary/apod?api_key=hKIgW83dxAd2yxuHJxtvqrHkLka3KLjeZ3eMLawY&start_date=${startDate}&end_date=${endDate}&hd=${resolution}&count=${count}`
    }
    else {
        url = `https://api.nasa.gov/planetary/apod?api_key=hKIgW83dxAd2yxuHJxtvqrHkLka3KLjeZ3eMLawY&date=${date}&hd=${resolution}&count=${count}`
    }

    sendRequest(url)
}

function gallery() {

    while(document.querySelector('.gallery-div').hasChildNodes()) {
        document.querySelector('.gallery-div').removeChild(document.querySelector('.gallery-div').firstChild)
    }

    getData(db.photos, function(data) {
        if (data != 0) {
            createGallery(data)
        }
        else {
            return
        }
    })

}

function createGallery(data) {
    let element = document.createElement('article');

    let url = data.hdurl ? data.hdurl : data.url

    element.innerHTML = `
<img src=${url} alt=${data.title}/>
<div class="card-body">
<h4>${data.title}</h4>
<p class="image-desc">${data.explanation}</p>
<p class="card-date">${data.date}</p>
<div class="card-buttons">
    <div>
        <button class="show-btn"><i class="las la-eye"></i>
            <span class="tooltip">Show Image Description</span></button>
        <button class="like-btn" data-id=${data.id}><i class="las la-heart"></i></button>
    </div>
    <div>
        <button class="delete-btn" data-id=${data.id}><i class="las la-trash"></i></buttdocument.querySelector('.gallery-div')on>
    </div>
</div>
</div>`

document.querySelector('.gallery-div').append(element)
db.photos.get(data.id, data => {
if(data.isliked == 'true') {
    element.querySelector('.like-btn').classList.add('red');
}
else {
    element.querySelector('.like-btn').classList.remove('red');
}
})

element.addEventListener('click', function(event) {
if(event.target.closest('.show-btn')) {
    event.target.closest('.show-btn')
    .parentElement.parentElement
    .previousElementSibling.previousElementSibling.classList.toggle('show-desc');
    event.target.closest('.show-btn')
    .firstElementChild.classList.toggle('la-eye-slash');
    if (event.target.closest('.show-btn').parentElement.parentElement.previousElementSibling.previousElementSibling.classList.contains('show-desc')) {
        event.target.closest('.show-btn')
        .children[1].textContent = 'Hide Image Description';
    }
    else {
        event.target.closest('.show-btn')
    .children[1].textContent = 'Show Image Description';
    }
}
})

element.addEventListener('click', function(event) {
if (event.target.closest('.like-btn')) {
    let id = parseInt(event.target.closest('.like-btn').dataset.id);
    db.photos.get(id, data => {
        event.target.closest('.like-btn').classList.toggle('red');
        element.classList.toggle('liked-img');
        if(event.target.closest('.like-btn').classList.contains('red')) {
            checklikestate = 'true';
        }
        else {
            checklikestate = 'false';
        }
        db.photos.update(id, {
            isliked: checklikestate
        }).then(() => {
            console.log(data)
        })
    })
}
})

element.addEventListener('click', function(event) {
if (event.target.closest('.delete-btn')) {
    let id = parseInt(event.target.closest('.delete-btn').dataset.id);
    element.remove();
    db.photos.delete(id)
    show_bodyImage();
}
})
}
