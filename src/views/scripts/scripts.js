////////////////////////////////like ofertauno/////////////////////////////////////////7
$(document).ready(function() {
 
    $('.item-action-behaviors').on ("click", "#btn-like",function (e) {
    e.preventDefault();

     let $this = $(this);

     let imgId = $(this).attr('data-id');
    console.log(imgId)
      $.ajax({
        url: '/like/' + imgId,
        type: 'GET'
      }) 
        .done(function(result) {
          $this.removeClass('item-action-behaviors').addClass('btn-success');
    
         // $this.find('i').removeClass('fa-times').addClass('fa-check');
         // $this.append('<span>Deleted!</span>'); 
           
        }
      
      );
    //}
  });
});


        
///////////////////////////////////like ofertados///////////////////////////////////////////////////7


$(document).ready(function() {
 
  $('.image-container').on ("click", "#btnn-like",function (e) {
  e.preventDefault();

   let $this = $(this);

   let imgId = $(this).attr('data-id');
  console.log(imgId)
    $.ajax({
      url: '/likedos/' + imgId,
      type: 'GET'
    }) 
      .done(function(result) {
        $this.removeClass('btn-success').addClass('btn-success');
 
       // $this.find('i').removeClass('fa-times').addClass('fa-check');
       // $this.append('<span>Deleted!</span>'); 
         
      }
    
    );
  //}
});
});



////////////////////////////////////like ofertatres//////////////////////////////////////////////////7


$(document).ready(function() {
 
  $('.image-container').on ("click", "#btnn-like",function (e) {
  e.preventDefault();

   let $this = $(this);

   let imgId = $(this).attr('data-id');
  console.log(imgId)
    $.ajax({
      url: '/liketres/' + imgId,
      type: 'GET'
    }) 
      .done(function(result) {
        $this.removeClass('btn-success').addClass('btn-success');
 
       // $this.find('i').removeClass('fa-times').addClass('fa-check');
       // $this.append('<span>Deleted!</span>'); 
         
      }
    
    );
  //}
});
});




////////////////////////////////////like produno//////////////////////////////////////////////////7


$(document).ready(function() {
 
  $('.item').on ("click", "#btn-like",function (e) {
  e.preventDefault();

   let $this = $(this);

   let imgId = $(this).attr('data-id');
  console.log(imgId)
    $.ajax({
      url: '/likeproduno/' + imgId,
      type: 'GET'
    }) 
      .done(function(result) {
        $this.removeClass('btn-success').addClass('btn-success');
 
       // $this.find('i').removeClass('fa-times').addClass('fa-check');
       // $this.append('<span>Deleted!</span>'); 
         
      }
    
    );
  //}
});
});


////////////////////////////////delete wishlist/////////////////////////////////////////7


$(document).ready(function() {
 
  $('.p').on ("click", "#btn-unlike",function (e) {
  e.preventDefault();

   let $this = $(this);

   let imgId = $(this).attr('data-id');
  console.log(imgId)
    $.ajax({
      url: '/like/' + imgId,
      type: 'GET' 
    }) 
      .done(function(result) {
        $this.removeClass('btn-success').addClass('btn-success');
 
       // $this.find('i').removeClass('fa-times').addClass('fa-check');
        $this.append('<span>Eliminado!</span>'); 
         
      }
    
    );
  //}
});
});
      






////////////////////////////////delete ofertauno/////////////////////////////////////////7


$(document).ready(function() {
 
  $('.p').on ("click", "#unlike-uno",function (e) {
  e.preventDefault();

   let $this = $(this);

   let imgId = $(this).attr('data-id');
  console.log(imgId)
    $.ajax({
      url: '/like/' + imgId,
      type: 'GET' 
    }) 
      .done(function(result) {
        $this.removeClass('btn-success').addClass('btn-success');
 
       // $this.find('i').removeClass('fa-times').addClass('fa-check');
        $this.append('<span>Eliminado!</span>'); 
         
      }
    
    );
  //}
});
});
      





////////////////////////////////delete ofertados/////////////////////////////////////////7

 
$(document).ready(function() {
 
  $('.p').on ("click", "#btn-unlike",function (e) {
  e.preventDefault();

   let $this = $(this);

   let imgId = $(this).attr('data-id');
  console.log(imgId)
    $.ajax({
      url: '/likedos/' + imgId,
      type: 'GET' 
    }) 
      .done(function(result) {
        $this.removeClass('btn-success').addClass('btn-success');
 
       // $this.find('i').removeClass('fa-times').addClass('fa-check');
        $this.append('<span>Eliminado!</span>'); 
         
      }
    
    );
  //}
});
});
      




////////////////////////////////delete ofertatres/////////////////////////////////////////7


$(document).ready(function() {
 
  $('.p').on ("click", "#btn-unlike",function (e) {
  e.preventDefault();

   let $this = $(this);

   let imgId = $(this).attr('data-id');
  console.log(imgId)
    $.ajax({
      url: '/liketres/' + imgId,
      type: 'GET' 
    }) 
      .done(function(result) {
        $this.removeClass('btn-success').addClass('btn-success');
 
       // $this.find('i').removeClass('fa-times').addClass('fa-check');
        $this.append('<span>Eliminado!</span>'); 
         
      }
    
    );
  //}
});
});
      





////////////////////////////////delete produno/////////////////////////////////////////7


$(document).ready(function() {
 
  $('.p').on ("click", "#btn-unlike",function (e) {
  e.preventDefault();

   let $this = $(this);

   let imgId = $(this).attr('data-id');
  console.log(imgId)
    $.ajax({
      url: '/likeproduno/' + imgId,
      type: 'GET' 
    }) 
      .done(function(result) {
        $this.removeClass('btn-success').addClass('btn-success');
 
       // $this.find('i').removeClass('fa-times').addClass('fa-check');
        $this.append('<span>Eliminado!</span>'); 
         
      }
    
    );
  //}
});
});
      