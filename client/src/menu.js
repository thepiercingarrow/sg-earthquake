var menu = document.getElementById('menuwrapper');
var namebar = document.getElementById('name'), name;
var play = document.getElementById('play');

namebar.addEventListener('change', function(e){
    name = namebar.value
});

play.addEventListener('click', start);
