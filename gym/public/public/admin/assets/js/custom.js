$(document).ready(function(){

    /* ADMIN CUSTOM INPUT FORM */
    $(document).off('submit','.admin-custom-input-form').on('submit','.admin-custom-input-form',function(e){
        e.preventDefault();
        var formData = new FormData(this);
        var action = $(this).attr('action');
        var element = $(this);
        $("input,select,textarea,div,span").removeClass('border-danger');
        $(".invalid-error").remove();
        $("input,select,textarea,button").attr('disabled',true);
        $.ajax({
            type:'POST',
            url: action,
            data:formData,
            cache:false,
            contentType: false,
            processData: false,
            success:function(ajax_response){
                $("input,select,textarea,button").attr('disabled',false);
                if($("#property-informtaion-form #property-request-status").length > 0)
                {
                    $("#property-informtaion-form #property-request-status").remove();
                }

                if($("#admin-room-category-pills-tab .nav-item").length < 3)
                {
                    $('.btn_remove_room_category').attr('disabled',true);
                }
                else
                {
                    $('.btn_remove_room_category').attr('disabled',false);
                }
                  
                
                if(ajax_response != '' && typeof(ajax_response.status) != 'undefined' && typeof(ajax_response.response) != 'undefined')
                {
                    if(typeof(disable_guesthouse_price) == 'function')
                    {
                        disable_guesthouse_price();
                    }

                    if(ajax_response.status == true && ajax_response.response == 'success')
                    {
                        if(typeof(ajax_response.data.message) != 'undefined')
                        {
                            success_message(ajax_response.data.message);
                        }

                        if(typeof(ajax_response.data.is_ajax) != 'undefined' && ajax_response.data.is_ajax == true)
                        {
                            if(typeof(ajax_response.data.form_url) != 'undefined')
                            {
                                $(element).attr('action',ajax_response.data.form_url).addClass('update-room-category');
                                $(".btn_remove_room_category",element).attr('data-href',ajax_response.data.form_url);
                            }
                            else if(typeof(ajax_response.data.is_delete) != 'undefined')
                            {
                                //delete_room_category_element - Declaration of this function is in resources/views/frontend/property/pages/property_registration/property_information.blade.php file. // DELETE ROOM CATEGORY WHILE REGISTRATION
                                delete_room_category_element();
                                btn_delete_element = '';
                                $(".input_delete_room_category").remove();
                                $("#delete_room_category_confirmation_modal").modal('hide');
                            }
                            
                        }
                        else
                        {
                            $("input,select,textarea,button").attr('disabled',true);
                            setTimeout(function(){
                                window.location.href = ajax_response.data.redirect_url;
                            },2000);
                        }
                    }
                    else if(ajax_response.response == 'error')
                    {
                        var error = ajax_response.data;
                        $.each(error,function(key,value)
                        {
                            if(value.trim() != '')
                            {   
                                if(key.indexOf('images') != -1 && $(".property-image-uploader",element).length > 0)
                                {
                                    $(".error-property-image-upload").remove();
                                    $(".property-image-uploader:first",element).after('<div class="alert alert-danger invalid-error error-property-image-upload mt-2">'+value.trim()+'</div>');
                                }
                                else if(key.indexOf('facilities') != -1 || key.indexOf('group_facilities') != -1)
                                {
                                    $(".error-property-facilities").remove();
                                    $(".checkbox-property-facilities:first",element).closest('.form-row').after('<div class="alert alert-danger invalid-error error-property-facilities mt-2 col-sm-6">'+value.trim()+'</div>');
                                }
                                else if(key.indexOf('room_amenitie') != -1 || key.indexOf('group_room_amenitie') != -1)
                                {
                                    $(".error-room-category-amenities").remove();
                                    $(".checkbox-room-category-amenities:first",element).closest('.form-row').after('<div class="alert alert-danger invalid-error error-room-category-amenities mt-2 col-sm-6">'+value.trim()+'</div>');
                                }
                                else if(key == 'phone' &&  $("[name='phone_tele_input']:first",element).length > 0)
                                {
                                    $("[name='phone_tele_input']:first",element).parent().after('<div class="alert alert-danger mt-2 invalid-error">'+value.trim()+'</div>');
                                }
                                else
                                {
                                    $("[name='"+key+"']",element).after('<div class="alert alert-danger mt-2 invalid-error">'+value.trim()+'</div>');
                                }
                            }
                        });
                    }

                    else
                    {
                        if(typeof(ajax_response.data.message) != 'undefined')
                        {
                            error_message(ajax_response.data.message);
                        }
                    }
                }
                else
                {
                    console.log('Server Response Faild');
                }
            }
        });
    });

});

function success_message(message)
{
    toastr.success(message);
}

function error_message(message)
{
    toastr.error(message);
}