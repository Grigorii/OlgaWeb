/**
 * Created by Grigoriy on 24.07.2015.
 */
$(document).ready(function()
{

    var doDropDown = function(dropDown)
    {
        if (dropDown == 1){
            $(".submenu").animate({height: "0px"}, 200);
            $(".circle").animate({"border-top-left-radius": "10px"}, 200);
            $(".circle").animate({"border-top-right-radius": "10px"}, 200);
            return '0';
        }else{
            $(".submenu").animate({height: "110px"}, 200);
            $(".circle").animate({"border-top-left-radius": "0px"}, 50);
            $(".circle").animate({"border-top-right-radius": "0px"}, 50);
            return '1';
        }

    }

    $(".account").click(function()
    {

        $(this).attr('id',   doDropDown($(this).attr('id')));

    });

    //Mouse click on sub menu
    $(".submenu").mouseup(function()
    {
        return false
    });

    //Mouse click on my account link
    $(".account").mouseup(function()
    {
        return false
    });


    //Document Click
    $(document).mouseup(function()
    {
        doDropDown(1);
        $(".account").attr('id', '');
    });
});