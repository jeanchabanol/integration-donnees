
document.querySelector('#cp').addEventListener('input', function(){
    if (this.value.lenght == 5){
        let url = `https://geo.api.gouv.fr/communes?code=${this.value}&fields=nom,code,codesPostaux,centre,surface,contour,codeDepartement,departement,codeRegion,region,population&format=json&geometry=centre`;

        fetch(url).then((response) => 
            response.json().then((data) => console.log(data))
        );
            
    }


});