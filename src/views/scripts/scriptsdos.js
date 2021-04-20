$(function() {
  
    // Delete Button Request
    $('#btn-delete').click(function (e) {
      e.preventDefault();
      let $this = $(this);
      const response = confirm('Are you sure you want to delete this image?');
      if (response) {
        let imgId = $(this).data('id');
        $.ajax({
          url: '/images/' + imgId,
          type: 'DELETE'
        })
          .done(function(result) {
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            $this.append('<span>Deleted!</span>');
          });
      }
    });
  });







  
 ///////////////////////////ofertauno///////////////////////////////////
$(document).ready(function() {

    $('.quick').on ("click", "#btn-like",function (e) {
    e.preventDefault();

     let $this = $(this);

     let imgId = $(this).attr('data-id');
    console.log(imgId)
      $.ajax({
        url: '/like/' + imgId,
        type: 'GET'
      }) 
        .done(function(result) {
          $this.removeClass('button-outline-secondary ').addClass('btn-success');
   
         // $this.find('i').removeClass('fa-times').addClass('fa-check');
         // $this.append('<span>Deleted!</span>'); 
          
        }
      
      );
    //}
  });
});





 //////////////////////////////ofertados////////////////////////////////



$(document).ready(function() {

  $('.quick').on ("click", "#btn-like",function (e) {
  e.preventDefault();

   let $this = $(this);

   let imgId = $(this).attr('data-id');
  console.log(imgId)
    $.ajax({
      url: '/likedos/' + imgId,
      type: 'GET'
    }) 
      .done(function(result) {
        $this.removeClass('button-outline-secondary ').addClass('btn-success');
 
       // $this.find('i').removeClass('fa-times').addClass('fa-check');
       // $this.append('<span>Deleted!</span>'); 
        
      }
    
    );
  //}
});
});





 ///////////////////////////ofertatres///////////////////////////////////


 $(document).ready(function() {

  $('.quick').on ("click", "#btn-like",function (e) {
  e.preventDefault();

   let $this = $(this);

   let imgId = $(this).attr('data-id');
  console.log(imgId)
    $.ajax({
      url: '/liketres/' + imgId,
      type: 'GET'
    }) 
      .done(function(result) {
        $this.removeClass('button-outline-secondary ').addClass('btn-success');
 
       // $this.find('i').removeClass('fa-times').addClass('fa-check');
       // $this.append('<span>Deleted!</span>'); 
        
      }
    
    );
  //}
});
});




 ///////////////////////////produno///////////////////////////////////


 $(document).ready(function() {

  $('.quick').on ("click", "#btn-like",function (e) {
  e.preventDefault();

   let $this = $(this);

   let imgId = $(this).attr('data-id');
  console.log(imgId)
    $.ajax({
      url: '/likeproduno/' + imgId,
      type: 'GET'
    }) 
      .done(function(result) {
        $this.removeClass('button-outline-secondary ').addClass('btn-success');
 
       // $this.find('i').removeClass('fa-times').addClass('fa-check');
       // $this.append('<span>Deleted!</span>'); 
        
      }
    
    );
  //}
});
});






 ///////////////////////////proddos///////////////////////////////////


 $(document).ready(function() {

  $('.quick').on ("click", "#btn-like",function (e) {
  e.preventDefault();

   let $this = $(this);

   let imgId = $(this).attr('data-id');
  console.log(imgId)
    $.ajax({
      url: '/likeproddos/' + imgId,
      type: 'GET'
    }) 
      .done(function(result) {
        $this.removeClass('button-outline-secondary ').addClass('btn-success');
 
       // $this.find('i').removeClass('fa-times').addClass('fa-check');
       // $this.append('<span>Deleted!</span>'); 
        
      }
    
    );
  //}
});
});






 ///////////////////////////prodtres///////////////////////////////////


 $(document).ready(function() {

  $('.quick').on ("click", "#btn-like",function (e) {
  e.preventDefault();

   let $this = $(this);

   let imgId = $(this).attr('data-id');
  console.log(imgId)
    $.ajax({
      url: '/likeprodtres/' + imgId,
      type: 'GET'
    }) 
      .done(function(result) {
        $this.removeClass('button-outline-secondary ').addClass('btn-success');
 
       // $this.find('i').removeClass('fa-times').addClass('fa-check');
       // $this.append('<span>Deleted!</span>'); 
        
      }
    
    );
  //}
});
});




 ///////////////////////////prodcuatro///////////////////////////////////


 $(document).ready(function() {

  $('.quick').on ("click", "#btn-like",function (e) {
  e.preventDefault();

   let $this = $(this);

   let imgId = $(this).attr('data-id');
  console.log(imgId)
    $.ajax({
      url: '/likeprodcuatro/' + imgId,
      type: 'GET'
    }) 
      .done(function(result) {
        $this.removeClass('button-outline-secondary ').addClass('btn-success');
 
       // $this.find('i').removeClass('fa-times').addClass('fa-check');
       // $this.append('<span>Deleted!</span>'); 
        
      }
    
    );
  //}
});
});






 ///////////////////////////prodcinco///////////////////////////////////


 $(document).ready(function() {

  $('.quick').on ("click", "#btn-like",function (e) {
  e.preventDefault();

   let $this = $(this);

   let imgId = $(this).attr('data-id');
  console.log(imgId)
    $.ajax({
      url: '/likeprodcinco/' + imgId,
      type: 'GET'
    }) 
      .done(function(result) {
        $this.removeClass('button-outline-secondary ').addClass('btn-success');
 
       // $this.find('i').removeClass('fa-times').addClass('fa-check');
       // $this.append('<span>Deleted!</span>'); 
        
      }
    
    );
  //}
});
});