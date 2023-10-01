const upload = document.getElementById("upload");


// listen for a login action
upload.onclick = function(event) {
    // stop our form submission from refreshing the page
    event.preventDefault();
  
    const file = document.getElementById("file")[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file); // Append the file to the FormData object

        // Make a POST request to your server to handle the file upload
        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
        .then( response => { if(response.ok) return response.json() })
        .then( json => {
            console.log(json);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
};