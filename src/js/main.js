$(document).ready(function() {

  // Gatilhos do Materialize
  $(".open-side-nav").sideNav({
    menuWidth: 280
  })

  // Barra de Pesquisas
  $('.search-bar input').on('input', function(){
    if($.trim($('.search-bar input').val()).length){
      $('.search-bar .search-list, .search-bar .overlay').addClass('active')
    }else{
      $('.search-bar .search-list, .search-bar .overlay').removeClass('active')
    }
  })
  $('.search-bar .overlay').click(function(){
    $('.search-bar .search-list, .search-bar .overlay').removeClass('active')
  })


});
