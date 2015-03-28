$(document).ready(function(){

    $('#fullpage').fullpage({
            anchors: ['form', 'choices', 'results', 'booking', 'journey', 'feedback'],
            sectionsColor: ['#8FB98B', '#DE564B', '#EAE1C0', '#8FB98B', '#DE564B', '#EAE1C0'],
            slidesNavigation: true,
        });

    //  Check Radio-box
    $(".rating input:radio").attr("checked", false);
    $('.rating input').click(function () {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });

    $('input:radio').change(
    function(){
        var userRating = this.value;
        sweetAlert("Thank you for your feedback");
    }); 
});