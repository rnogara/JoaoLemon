
var overlay = document.querySelector('.jl-overlay');
var frameImage = document.querySelector('.jl-gallery-frame-image');
var frameContainer = document.querySelector('.jl-gallery-frame-container');
var galleryImages = document.querySelectorAll('.jl-thumb-box');
var closeGallery = document.querySelectorAll('.jl-toggle-gallery');
var btnNext = document.querySelector('.jl-item-next');
var btnPrev = document.querySelector('.jl-item-prev');
var currCounter = document.querySelector('.jl-current-image');
var totalCounter = document.querySelector('.jl-total-image');
var skeletonLoading = document.querySelector('.jl-skeleton-loading')


//Ajuste de altura do Post Gallery
var postGallery = document.querySelector('.jl-post-gallery');
var postGalleryHeight = postGallery.clientHeight;
postGallery.style.height = (postGalleryHeight - 270) + 'px';

//Counter Formatter
var counterFormatter = function(o) {
    if(o < 10){
        return '0'+ o;
    }
    else {
        return o;
    }

}
totalCounter.innerHTML = counterFormatter(galleryImages.length);

//Skeleton Loading
const skeletonAnim = function (imagem) {
    var myImage = new Image();
    myImage.src = imagem;
    myImage.addEventListener('load', function(){
        skeletonLoading.classList.add('jl-fade-out');
        setTimeout(function () {
            skeletonLoading.style.display = 'none';
        }, 2000);
    });
}

//Open Gallery Modal
const getImageSrc = function(){
    for (var i=0; i < galleryImages.length; i++){
        galleryImages[i].addEventListener('click', function(){
            var imageSrc = this.querySelector('img').getAttribute('data-src');
            var itemNum = this.querySelector('img').getAttribute('data-item');

            skeletonLoading.style.display = 'flex';

            frameImage.setAttribute('src', imageSrc);
            frameImage.setAttribute('data-index', itemNum);
            overlay.classList.add('jl-is-open');
            frameContainer.classList.add('jl-is-open');

            currCounter.innerHTML = counterFormatter(itemNum);

            skeletonAnim(imageSrc);
        });
    }
}
getImageSrc();

for (var c=0; c < closeGallery.length; c++){
    closeGallery[c].addEventListener('click', function(){
        overlay.classList.remove('jl-is-open');
        frameContainer.classList.remove('jl-is-open');
    });
}


 //Barra de Navegação//

    //Next//
    const nextItem = function(){

    //Identificando item atual no frame//
        var currItemNum = frameImage.getAttribute('data-index')
    //Defenir o numero do next//
        var nextItemNum = parseInt(currItemNum) + 1;
    //Fazer loop e identificação do match com numero next//
        for(var n = 0; n < galleryImages.length; n++){
            var item = galleryImages[n].querySelector('img');
            var itemNum = parseInt(item.getAttribute('data-item'));

            if(itemNum === nextItemNum){
                //Capturamos o data-src//
                var nextSrc = item.getAttribute('data-src');
                //Atualizar o data-index//
                var nextIndex = item.getAttribute('data-item');

                skeletonLoading.style.display = 'flex';

                frameImage.setAttribute('data-index', nextIndex);
                //Passar data-src para a tag de img no frame//
                frameImage.setAttribute('src', nextSrc);

                currCounter.innerHTML = counterFormatter(nextIndex);

                skeletonAnim(nextSrc);
            }
        }
    }
    //Previous//
    const prevItem = function(){

        var currItemNum = frameImage.getAttribute('data-index')
        var prevItemNum = parseInt(currItemNum) - 1;

        for(var p = 0; p < galleryImages.length; p++){
            var item = galleryImages[p].querySelector('img');
            var itemNum = parseInt(item.getAttribute('data-item'));

            if(itemNum === prevItemNum){
            var prevSrc = item.getAttribute('data-src');
            var prevIndex = item.getAttribute('data-item');
            
            skeletonLoading.style.display = 'flex';

            frameImage.setAttribute('data-index', prevIndex);
            frameImage.setAttribute('src', prevSrc);

            currCounter.innerHTML = counterFormatter(prevIndex);

            skeletonAnim(prevSrc);
            }
        }
    }


btnNext.addEventListener('click', function(){
    nextItem();
});
btnPrev.addEventListener('click', function(){
    prevItem();
});
