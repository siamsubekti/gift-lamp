// slider.js 
var BASE_URL="https://arbredesign.co";

// Slider di Landing Page
$('.our-proccess-carousel').slick({
    arrows: true,
    centerMode: true,
    centerPadding: '10px',
    slidesToShow: 2,
    autoplay: true,
    infinite: true,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: false
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
          }
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
          }
        },
        {
          breakpoint: 376.99,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
          }
        }
      ]
});

$('.landing-page-img-carousel').slick({
    slidesToShow: 1,
    slidesToScroll:1,
    dots: false,
    autoplay: true,
    fade: true,
    arrows: false,
    autoplaySpeed: 2000,
    adaptiveHeight: false,
    infinite: true,
    centerMode: true,
    responsive:[
        {
            breakpoint: 576,
            settings:{
                slidesToShow: 1,
            }
        }
    ]
});

$('.detail-product-img-carousel').slick({
    dots: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    speed: 200,
    autoplay: true
});

//landing page
// $('.btn-theme').on('click', function(){
//     let product_name_slug = $(this).attr('product_name_slug');

//     // window.alert(theme_name);
//     $.ajax({
//         headers: {
//             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//         },
//         url : 'api/product/themes/'+product_name_slug,
//         type : 'GET',
//         dataType : 'json',
//         success : function(data){
//             $('.theme-group').empty();
//             $.each(data.results, function(key, value){
//                 $('.theme-group').append('<a class="btn input-btn-grey btn-block my-1" href="/shop/'+convertToSlug(value)+'/'+product_name_slug+'">'+value+'</a>');
//             });
//         },
//         failed : function(data){
//             window.alert("GAGAL");
//         }
//     });
// });

// function convertToSlug(Text) {
//     return Text
//                .toLowerCase()
//                .replace(/[^\w ]+/g, '-')
//                .replace(/ +/g, '-');
//   }

// $('.cart .out-of-stock .btn').prop('disabled', true);
$('.cart .out-of-stock .quantity').prop('readonly', true);
$('.cart .out-of-stock .cart-product-img').css('opacity', '60%');


var quantity=1;

function updateQty(cart_id, qty){
    $.ajax({
        // url: '{{ url("cart/update_qty")}}'+'/'+cart_id,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: 'cart/update_qty/'+cart_id,
        type: 'POST',
        data: {
            qty : qty,
        },
        dataType: 'json',
        beforeSend: function(){
            $('.btn-block').each(function(){
                $(this).prop('disabled', true);
            });
        },
        success: function(data){
            $('.btn-block').each(function(){
                $(this).prop('disabled', false);
            });
            // console.log(data);
        },
        error: function(error){
            console.log(error);
        }
    });
}


function ribuan(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


$('.quantity-plus').each(function(i){
    $(this).on('click', function(e){
        e.preventDefault();

        let quantity=parseInt($('.quantity').eq(i).val());
        let max = parseInt($('.quantity').eq(i).attr('max'));
        let cart_id=$('.cart_id').eq(i).val();
           
        if (quantity > max){
            $('.quantity').eq(i).val(max);
        } else if(quantity < max){
            $('.quantity').eq(i).val(quantity+1);
        }

        let qty=$('.quantity').eq(i).val();

        updateQty(cart_id, qty);

        let product_price=$('.product_price').eq(i).val();
        let subtotal=product_price * qty;
    $('.item_cart_subtotal').eq(i).html(ribuan(subtotal)+' IDR');
    });
});

$('.quantity-minus').each(function(i){
    $(this).on('click', function(e){
        e.preventDefault();

        let quantity=parseInt($('.quantity').eq(i).val());
        let min = parseInt($('.quantity').eq(i).attr('min'));
        let cart_id=$('.cart_id').eq(i).val();

        if (quantity < min){
            $('.quantity').eq(i).val(min);
        } else if(quantity > min){
            $('.quantity').eq(i).val(quantity-1);
        }

        let qty=$('.quantity').eq(i).val();
        updateQty(cart_id, qty);

        let product_price=$('.product_price').eq(i).val();
        let subtotal=product_price * qty;
    $('.item_cart_subtotal').eq(i).html(ribuan(subtotal)+' IDR');
    // console.log(product_price);
    // console.log(subtotal);
    });
});

$('.quantity').each(function(i){
    $(this).on('change', function(e){
        e.preventDefault();

        let quantity=parseInt($('.quantity').eq(i).val());
        let min = parseInt($('.quantity').eq(i).attr('min'));
        let max = parseInt($('.quantity').eq(i).attr('max'));
        let id=$('.cart_id').eq(i).val();

        if(quantity < min){
            $('.quantity').eq(i).val(min);
        } else if(quantity > max){
            $('.quantity').eq(i).val(max);
        }
        
        let qty=$('.quantity').eq(i).val();
        updateQty(id, qty);

        let product_price=$('.product_price').eq(i).val();
        let subtotal=product_price * qty;

        $('.item_cart_subtotal').eq(i).html(ribuan(subtotal)+' IDR');
    });
});



// UPDATE QTY DI MULTIPLE ADDRESS
function updateQtyMultiple(id, qty){
    $.ajax({
        // url: '{{ url("multiple/update_qty")}}'+'/'+id,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: '/multiple/update_qty/'+id,
        type: 'POST',
        data: {
            // _token:'{{ csrf_token() }}',
            qty : qty,
        },
        dataType: 'json',
        success: function(data){
            // console.log(data);
            location.reload();
        },
        error: function(error){
            console.log(error);
        }
    });
}

$('.multiple-quantity-plus').each(function(i){
    $(this).on('click', function(e){
        e.preventDefault();

        var quantity=parseInt($('.multiple-quantity').eq(i).val());
        // console.log(quantity);
        var id=$('.shipment_id').eq(i).val();

        $('.multiple-quantity').eq(i).val(quantity+1);
        let qty=$('.multiple-quantity').eq(i).val();

        updateQtyMultiple(id, qty);
    });
});

$('.multiple-quantity-minus').each(function(i){
    $(this).on('click', function(e){
        e.preventDefault();

        var quantity=parseInt($('.multiple-quantity').eq(i).val());
        var id=$('.shipment_id').eq(i).val();

        if(quantity>1){
            $('.multiple-quantity').eq(i).val(quantity-1);
        }
        let qty=$('.multiple-quantity').eq(i).val();
        updateQtyMultiple(id, qty);
    });
});

$('.multiple-quantity').each(function(i){
    $(this).on('change', function(e){
        e.preventDefault();

        var quantity=parseInt($('.multiple-quantity').eq(i).val());
        var id=$('.shipment_id').eq(i).val();

        if(quantity>=1){
            $('.multiple-quantity').eq(i).val(quantity);
        }else if(quantity<1){
            $('.multiple-quantity').eq(i).val(1);
        }
        let qty=$('.multiple-quantity').eq(i).val();
        updateQtyMultiple(id, qty);
    });
});


// edit additional item
$('.editAdditionalItemButton').each(function(i){
    $(this).on('click', function(e){
        e.preventDefault();

        var cart_id =  $(this).attr('data-id');
        $('#cart_id').val(cart_id);
        let product_category_id = $(this).attr('product_category_id');

        $.ajax({
            url : 'api/additional_item/edit/'+cart_id,
            method: 'GET',
            beforeSend :function(){
                $('#wrapping-paper-toggle').append('<p>Please wait, loading data...</p>');
            },
            success: function(data){
                // console.log(data['cart']['additional_item_id']);

                $('#wrapping-paper-toggle').empty();
                $('#additional-item-toggle').empty();
                $('#sticker-toggle').empty();
                $('#envelope-toggle').empty();
                $('#text-color-toggle').empty();

                var additional_cart_id = data['cart']['additional_item_id'];
                var sticker_cart_id = data['cart']['sticker_id'];
                var wp_cart_id = data['cart']['wrapping_paper_id'];
                var envelope_cart_id = data['cart']['envelope_id'];

                // cek untuk kategori produk hampers
                if(product_category_id == 1 || product_category_id == 2){
                    if(data['additional_items'] != null){
                        $('#additional-item-toggle').prepend('<h6>Choose Additional Item</h6>');

                        $.each(data['additional_items'], function(key, value){
                            if(value.stock !=0){
                                $('#additional-item-toggle').append(
                                    '<div class="d-inline-block additional-label text-center mx-1">'+
                                        // '<label class="additional-label btn btn-sm btn-outline-primer mb-2" style="background-image:  url('+value.image+'); background-size: cover;">'+
                                        '<label class="'+(additional_cart_id == value.id ? "active":" " )+' btn btn-sm btn-outline-primer mb-2" style="background-image:  url('+value.image+'); background-size: cover;">'+
                                            '<input type="radio" '+(additional_cart_id == value.id ? "checked":" " )+' name="additional_item_id" additional="'+key+'" id="additional_item'+value.id+'" value="'+value.id+'">'+
                                        '</label>'+
                                    '</div>');
                            }else if(value.stock == 0 && value.id == additional_cart_id){
                                $('#additional-item-toggle').append(
                                    '<div class="d-inline-block additional-label text-center mx-1">'+
                                        // '<label class="additional-label btn btn-sm btn-outline-primer mb-2" style="background-image:  url('+value.image+'); background-size: cover;">'+
                                        '<label class="'+(additional_cart_id == value.id ? "active":" " )+' btn btn-sm btn-outline-primer mb-2" style="background-image:  url('+value.image+'); background-size: cover; opacity:30%;">'+
                                            '<input disabled type="radio" '+(additional_cart_id == value.id ? "checked":" " )+' name="additional_item_id" additional="'+key+'" id="additional_item'+value.id+'" value="'+value.id+'">'+
                                        '</label>'+
                                    '</div>');
                            }
                        });
                    }

                    if( sticker_cart_id != null){
                        $('#sticker-toggle').prepend('<h6>Choose Sticker</h6>');
                        $.each(data['stickers'], function(key, value){
                            if(value.stock != 0){
                                $('#sticker-toggle').append(
                                    '<div class="d-inline-block text-center mx-1">'+
                                        '<label class="'+(sticker_cart_id == value.id ? "active":" ")+' btn btn-sm btn-outline-primer mb-2" style="background-image:  url('+value.image+'); background-size: cover;">'+
                                            '<input type="radio" '+(sticker_cart_id == value.id ? "checked":" " )+' name="sticker_id" id="sticker'+value.id+'" value="'+value.id+'" >'+
                                        '</label>'+
                                    '</div>');
                            }else if(value.stock == 0 && value.id == sticker_cart_id){
                                $('#sticker-toggle').append(
                                    '<div class="d-inline-block text-center mx-1">'+
                                        '<label class="'+(sticker_cart_id == value.id ? "active":" ")+' btn btn-sm btn-outline-primer mb-2" style="background-image:  url('+value.image+'); background-size: cover; opacity: 30%;">'+
                                            '<input disabled type="radio" '+(sticker_cart_id == value.id ? "checked":" " )+' name="sticker_id" id="sticker'+value.id+'" value="'+value.id+'" >'+
                                        '</label>'+
                                    '</div>');
                            }

                        });
                    }else{
                        $('#sticker-toggle').prepend('<h6>Choose Sticker</h6>');
                        $.each(data['stickers'], function(key, value){
                            if(value.stock != 0){
                                $('#sticker-toggle').append(
                                    '<div class="d-inline-block text-center mx-1">'+
                                        '<label class="'+(sticker_cart_id == value.id ? "active":" ")+' btn btn-sm btn-outline-primer mb-2" style="background-image:  url('+value.image+'); background-size: cover;">'+
                                            '<input type="radio" '+(sticker_cart_id == value.id ? "checked":" " )+' name="sticker_id" id="sticker'+value.id+'" value="'+value.id+'" >'+
                                        '</label>'+
                                    '</div>');
                            }
                        });
                    }

                    // bila design menggunakan teks, atur warna teks
                    if(data['cart']['text_color1'] != null){
                        $('#text-color-toggle').prepend('<h6>Choose Text Color</h6>');
                        $('#text-color-toggle').append(
                            '<div class="d-inline-block text-center mx-1">'+
                                '<label class="'+(data['cart']['text_color1'] == "black" ? "active":" ")+' btn btn-sm btn-outline-primer mx-auto" style="background-image: url('+data['text_colors']['black']+'); background-size: cover;">'+
                                    '<input type="radio" name="text_color" id="textColorBlack" value="black"'+ (data['cart']['text_color1'] == "black" ? "checked":" ") +' required>'+
                                '</label>'+
                            '</div>'+
                            '<div class="d-inline-block text-center mx-1">'+
                                '<label class="'+(data['cart']['text_color1'] == "rainbow" ? "active":" ")+' btn btn-sm btn-outline-primer mx-auto" style="background-image: url('+data['text_colors']['rainbow']+'); background-size: cover;">'+
                                    '<input type="radio" name="text_color" id="textColorRainbow" value="rainbow"'+ (data['cart']['text_color1'] == "rainbow" ? "checked":" ") +' required>'+
                                '</label>'+
                            '</div>'
                        );
                    }
                }

                if(data['wrapping_papers'] != null){
                    $('#wrapping-paper-toggle').prepend('<h6>Choose Wrapping Paper</h6>');
                    $.each(data['wrapping_papers'], function(key, value){
                        if(value.stock != 0){
                            $('#wrapping-paper-toggle').append(
                                '<div class="d-inline-block text-center mx-1">'+
                                    '<label class="'+(wp_cart_id == value.id ? "active":" " )+' btn btn-sm btn-outline-primer mb-2" style="background-image:  url('+value.image+'); background-size: cover;">'+
                                        '<input type="radio" '+(wp_cart_id == value.id ? "checked":" " )+' name="wrapping_paper_id" id="wrapping-paper'+value.id+'" value="'+value.id+'" >'+
                                    '</label>'+
                                '</div>');
                        }else if(value.stock == 0 && (value.id == wp_cart_id)){
                            $('#wrapping-paper-toggle').append(
                                '<div class="d-inline-block text-center mx-1">'+
                                    '<label class="'+(wp_cart_id == value.id ? "active":" " )+' btn btn-sm btn-outline-primer mb-2" style="background-image:  url('+value.image+'); background-size: cover; opacity : 30%;">'+
                                        '<input disabled type="radio" '+(wp_cart_id == value.id ? "checked":" " )+' name="wrapping_paper_id" id="wrapping-paper'+value.id+'" value="'+value.id+'" >'+
                                    '</label>'+
                                '</div>');
                        }
                    });
                }else{
                    $('#wrapping-paper-toggle').prepend('<h6>Choose Wrapping Paper</h6>');
                    $.each(data['wrapping_papers'], function(key, value){
                        if(value.stock != 0){
                            $('#wrapping-paper-toggle').append(
                                '<div class="d-inline-block text-center mx-1">'+
                                    '<label class="'+(wp_cart_id == value.id ? "active":" " )+' btn btn-sm btn-outline-primer mb-2" style="background-image:  url('+value.image+'); background-size: cover;">'+
                                        '<input type="radio" '+(wp_cart_id == value.id ? "checked":" " )+' name="wrapping_paper_id" id="wrapping-paper'+value.id+'" value="'+value.id+'" >'+
                                    '</label>'+
                                '</div>');
                        }
                    });
                }

                if(envelope_cart_id != null){
                    $('#envelope-toggle').prepend('<h6>Choose Envelope</h6>');
                    $.each(data['envelopes'], function(key, value){
                        if(value.stock != 0){
                            $('#envelope-toggle').append(
                                '<div class="d-inline-block text-center mx-1">'+
                                    '<label class="'+(envelope_cart_id == value.id ? "active":"inactive" )+' btn btn-sm btn-outline-primer mb-2" style="background-image:  url('+value.image+'); background-size: cover;">'+
                                        '<input type="radio" '+(envelope_cart_id == value.id ? "checked":" " )+' name="envelope_id" id="envelope'+value.id+'" value="'+value.id+'" >'+
                                    '</label>'+
                                '</div>');
                        }else if(value.stock == 0 && value.id == envelope_cart_id){
                            $('#envelope-toggle').append(
                                '<div class="d-inline-block text-center mx-1">'+
                                    '<label class="'+(envelope_cart_id == value.id ? "active":"inactive" )+' btn btn-sm btn-outline-primer mb-2" style="background-image:  url('+value.image+'); background-size: cover; opacity: 30%;">'+
                                        '<input disabled type="radio" '+(envelope_cart_id == value.id ? "checked":" " )+' name="envelope_id" id="envelope'+value.id+'" value="'+value.id+'" >'+
                                    '</label>'+
                                '</div>');
                        }

                    });
                }else{
                    $('#envelope-toggle').prepend('<h6>Choose Envelope</h6>');
                    $.each(data['envelopes'], function(key, value){
                        if(value.stock != 0){
                            $('#envelope-toggle').append(
                                '<div class="d-inline-block text-center mx-1">'+
                                    '<label class="'+(envelope_cart_id == value.id ? "active":"inactive" )+' btn btn-sm btn-outline-primer mb-2" style="background-image:  url('+value.image+'); background-size: cover;">'+
                                        '<input type="radio" '+(envelope_cart_id == value.id ? "checked":" " )+' name="envelope_id" id="envelope'+value.id+'" value="'+value.id+'" >'+
                                    '</label>'+
                                '</div>');
                        }

                    });
                }

            }
        });

    });
});

// $('.chooseThemeButton').each(function(i){
//     $(this).on('click', function(){
//         var cart_id =  $(this).attr('data-id');
//         $('#cart_id').val(cart_id);

        // console.log('clicked');
    
        // $.ajax({
            // url : '/api/themes/'+cart_id,
            // method: 'GET',
            // success: function(data){
                // console.log(data);
                // if(data['theme'] != null){
                    // $('#choose-theme-toggle').prepend('<h6>Choose Theme</h6>');
    
                    // $.each(data['theme'], function(key, value){
                    //     $('#choose-theme-toggle').append(
                    //         '<div class="d-inline-block additional-label text-center mx-1">'+
                    //             '<label class="'+(additional_cart_id == value.id ? "active":" " )+' btn btn-sm btn-outline-primer mb-2" style="background-image:  url('+value.image+'); background-size: cover;">'+
                    //                 '<input type="radio" '+(additional_cart_id == value.id ? "checked":" " )+' name="additional_item_id" additional="'+key+'" id="additional_item'+value.id+'" value="'+value.id+'">'+
                    //             '</label>'+
                    //         '</div>');
                    // });
//                 }
//             }
//         });
//     })
// });

// // show detail slideDown
$(document).on('mouseover', 'input[additional]', function(){
    const i = $(this).attr('additional');

    setTimeout(function(){
        $(".show-additional-item").eq(i).removeClass('hide');
        $(".show-additional-item").eq(i).addClass('show');
    }, 200);

    return false;
});

$(document).on('mouseout', 'input[additional]', function(){
    const i = $(this).attr('additional');

    setTimeout(function(){
        $(".show-additional-item").eq(i).removeClass('show');
        $(".show-additional-item").eq(i).addClass('hide');
    }, 200);

    return false;
});


// checklist on cart
$('.checklist_cart').each(function(i){
    let cart_id=$('.checklist_cart').eq(i).attr('cart_id');
    let index=$('.checklist_cart').eq(i).attr('index');
    let length=$('.checklist_cart').length;

    $(this).on('change', function(e){
        e.preventDefault();

        if($('.checklist_cart').eq(i).prop('checked')==true){
            $('.checklist_cart').eq(i).val(true);

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: '../put_session_checklist_cart/'+index+'/'+cart_id,
                type: 'POST',
                success: function(data){
                    console.log('check');
                },
                error: function(error){
                    console.log(error);
                }
            });
        }
        else{
            $('.checklist_cart').eq(i).val(false);

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: '../forget_session_checklist_cart/'+index+'/'+cart_id,
                type: 'GET',
                success: function(data){
                    console.log('uncheck');
                },
                error: function(error){
                    console.log(error);
                }
            });
        }

        changeBtnCheckout();
    });
});


let isAllCartCheck=true;
function checkToggle(cb_name){
    let cb_array=document.getElementsByName(cb_name);
    for (var i = 0; i < cb_array.length; i++) {
        cb_array[i].checked = isAllCartCheck; //checked true
        let cart_id=$('.checklist_cart').eq(i).attr('cart_id');

        if(isAllCartCheck === true){
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: '../put_session_checklist_cart/'+i+'/'+cart_id,
                type: 'POST',
                success: function(data){
                    console.log('check');
                },
                error: function(error){
                    console.log(error);
                }
            });
        }
        else if(isAllCartCheck===false){
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: '../forget_session_checklist_cart/'+i+'/'+cart_id,
                type: 'GET',
                success: function(data){
                    console.log('uncheck');
                },
                error: function(error){
                    console.log(error);
                }
            });
        }
    }

    isAllCartCheck = !isAllCartCheck;
    changeBtnCheckout();
}

function changeBtnCheckout(){
    //kalau yg di checklist lebih dari 1
    if ($('.checklist_cart:checked').length > 1){
        $('#co-btn').attr('data-toggle', 'modal');
        $('#co-btn').attr('data-target', '#modalChooseCheckout');
        $('#co-btn').attr('type', 'button');
        $('#co-btn').removeAttr('onclick');

        if($('.checklist_cart').length == $('.checklist_cart:checked').length){
            $('#check-all').prop('checked', true);
        } else{
            $('#check-all').prop('checked', false);
        }
    //kalau tidak ada yg di checklist
    } else if($('.checklist_cart:checked').length == 0){
        $('#co-btn').removeAttr('data-toggle');
        $('#co-btn').removeAttr('data-target');
        $('#co-btn').attr('onclick', 'warningNullCheckbox()');
        $('#co-btn').attr('type', 'button');

        $('#check-all').prop('checked', false);
    //kalau hanya 1 yg di checklist
    } else {
        $('#co-btn').removeAttr('data-toggle');
        $('#co-btn').removeAttr('data-target');
        $('#co-btn').removeAttr('onclick');
        $('#co-btn').attr('type', 'submit');
        
        if($('.checklist_cart').length == $('.checklist_cart:checked').length){
            $('#check-all').prop('checked', true);
        } else{
            $('#check-all').prop('checked', false);
        }
    }
}

function warningNullCheckbox(){
    Swal.fire(
        'Hmmm!',
        'Centang produk yang ada di keranjang sebelum checkout',
        'warning'
    )
}

$('.add-to-cart').each(function(i){
    $(this).on('click', function(e){
        e.preventDefault();
        product_id = $(this).attr('product_id');
        qty = $('#qty'+product_id).val();
        price = $('#price'+product_id).val();
        customer_id = $('.customer_id').val();
        image = $('#image'+product_id).val();

        if(qty == ''){
            Swal.fire(
                'Hmmm!',
                'You must fill the quantity first. Min order: 2 items',
                'warning'
            );
        } else{
            if(qty < 1 || qty > 200){
                Swal.fire(
                    'Sorry!',
                    'Min order: 2 items and max order: 200 items',
                    'info'
                );
                $('#qty'+product_id).val('');
            } else{
                if(customer_id != ''){
                    addStationeryToCart(product_id, qty, price, customer_id, image);
                } else{
                    window.location.href='../login';
                }
            }
        }
    });
});

function addStationeryToCart(product_id, qty, price, customer_id, image){
    subtotal = price*qty;
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: 'stationery/add',
        type: 'POST',
        data: {
            customer_id : customer_id,
            product_id : product_id,
            qty : qty,
            price : price,
            subtotal : subtotal,
            image : image
        },
        dataType: 'json',
        beforeSend: function(){
            $('#afterAgree').show();
            $('#afterAgree').addClass('modal-backdrop');
            $('#afterAgree').addClass('fade');
            $('#afterAgree').addClass('show');
        },
        success: function(data){
            Swal.fire(
                {
                    position: 'middle',
                    icon: 'success',
                    title: 'Yeayy!',
                    text : 'Success added to cart',
                    showConfirmButton: false,
                    timer: 2000
                  }
            );
            setTimeout(window.location.reload(), 1500);
            console.log(data);
        },
        error: function(error){
            console.log(error.responseText);
        }
    });
}

// End of cart.js
// address.js

// jQuery(function(){
    var province=$('.input_province_id').val();
    var city= $('.input_city_id').val();
    var subdistrict= $('.input_subdistrict_id').val();

    // UNTUK MODAL ADD NEW ADDRESS
    // Jika province berubah
    $('.modalAddAddress .province_id').on('change', function(){
        let province_id=$(this).val();
        let this_url='../api/province/';

        if(province_id){
            $('.modalAddAddress .input_province_id').empty();
            $('.modalAddAddress .input_province_id').val(province_id);

            getCity(this_url, province_id);
        }else{
            $('.modalAddAddress .city_id').append('<option>Select City</option>');
            $('.modalAddAddress .city_id').append('<option>Select City</option>');

        }
    });

    // Jika City berubah
    $('.modalAddAddress .city_id').on('change', function(){
        let city_id=$('.city_id').val();
        let this_url='../api/city';

        if(city_id){
            $('.modalAddAddress .input_city_id').empty();
            $('.modalAddAddress .input_city_id').val(city_id);

            getSubdistrict(this_url, city_id);
        }else{
            $('.modalAddAddress .subdistrict_id').append('<option>Select Subdistrict</option>');
        }
    });

    // Jika Subdistrict berubah
    $('.modalAddAddress .subdistrict_id').on('change', function(){
        let subdistrict_id=$(this).val();

        if(subdistrict_id){
            $('.modalAddAddress .input_subdistrict_id').empty();
            $('.modalAddAddress .input_subdistrict_id').val(subdistrict_id);
        }
    });



    // UNTUK PROFIL ALAMAT CUSTOMER
    if($('.profile_input_province_id')[0]){
        if($('.profile_input_province_id').val() != ''){
            let prov_id=$('.profile_input_province_id').val();
            let this_url=BASE_URL+'/api/province';
    
            $('.select-province-val').hide();
            getCity(this_url, prov_id);
        } else{
            $('.profile-customer .select-province-val').show();
        }
    }

    if($('.profile-customer .input_city_id')[0]){
        if($('.profile-customer .input_city_id').val() != ''){
            let city_id=$('.profile-customer .input_city_id').val();
            let this_url=BASE_URL+'/api/city';
    
            $('.profile-customer .select-city-val').hide();
    
            getSubdistrict(this_url, city_id);
        }
    }

    if($('.profile-customer .input_subdistrict_id')[0]){
        if($('.profile-customer .input_subdistrict_id').val() != ''){
            let subdistrict=$('.profile-customer .input_subdistrict_id').val();
            $('profile-customer .subdistrict_id').val(subdistrict);
    
            $('.subdistrict-default-value').hide();
        }
    }


    // kalau inputan berubah
    $('.profile-province_id').on('change', function(){
        let province_id=$(this).val();
        let this_url=BASE_URL+'/api/province';

        if(province_id){
            $('.profile_input_province_id').empty();
            $('.profile_input_province_id').val(province_id);
            $('.profile-customer .city_id').empty();
            $('.profile-customer .input_city_id').empty();
            $('.profile-customer .input_subdistrict_id').val("");
            $('.profile-customer .subdistrict_id').empty();
            $('.profile-customer .subdistrict_id').append('<option>Select Subdistrict</option>');

            getCity(this_url, province_id);
        }else{
            $('.profile-customer .city_id').append('<option>Select City</option>');
        }
    });

    $('.profile-customer .city_id').on('change', function(){
        let city_id=$('.profile-customer .city_id').val();
        let this_url=BASE_URL+'/api/city';

        if(city_id){
            $('.profile-customer .input_city_id').empty();
            $('.profile-customer .input_city_id').val(city_id);
            $('.profile-customer .subdistrict_id').empty();
            $('.profile-customer .input_subdistrict_id').empty();


            getSubdistrict(this_url, city_id);
        }else{
            $('.profile-customer .subdistrict_id').append('<option>Select Subdistrict</option>');
        }
    });

    $('.profile-customer .subdistrict_id').on('change', function(){
        let id=$(this).val();

        if(id){
            $('.profile-customer .input_subdistrict_id').empty();
            $('.profile-customer .input_subdistrict_id').val(id);
        }else{
            $('.profile-customer .subdistrict_id').append('<option>select subdistrict</option>');
        }
    });

// });


// FUNCTION
// CITY
function getCity(this_url, province_id){
    let city=$('.input_city_id').val();

    $.ajax({
        url: this_url+'/'+province_id+'/city',
        type: 'GET',
        dataType: 'json',
        beforeSend: function(){	
            $('.city_id').empty();	
            $('.city_id').append('<option selected>Please wait..</option>');	
        },
        success: function(data){
            $('.city_id').empty();
            $('.city_id').append('<option selected disabled value="">Select City</option>');

            $.each(data.results, function(key, value){
                $('.city_id').append('<option value="'+value.city_id+'" id="'+value.id+'" class="my-0 py-0" city="'+value.city_id+'">'+value.type+' '+value.name+'</option>');
            });

            $('.city_id').val(city);
            console.log("berhasil");
        }
    });
}

// SUBDISTRICT
function getSubdistrict(this_url, city_id){
    let subdistrict=$('.input_subdistrict_id').val();

    $.ajax({
        url: this_url+'/'+city_id+'/subdistrict',
        type: 'GET',
        dataType: 'json',
        beforeSend: function(){	
            $('.subdistrict_id').empty();	
            $('.subdistrict_id').append('<option selected>Please wait..</option>');	
        },
        success: function(data){
            $('.subdistrict_id').empty();
            $('.subdistrict_id').append('<option selected disabled value="">Select Subdistrict</option>');
            $.each(data.results, function(key, value){
                $('.subdistrict_id').append('<option value="'+value.subdistrict_id+'" id="'+value.id+'" class="my-0 py-0" subdistrict="'+value.subdistrict_id+'">'+value.name+'</option>');
            })
            
            $('.subdistrict_id').val(subdistrict);
        }
    });
}

//ongkir js
function getOngkir(id, destination){
    let origin=399; // kode untuk Kota Semarang
    let weight=$('.weight').val();
    let courier='jnt';

    $.ajax({
        url:'../api/origin='+origin+'&originType=city&destination='+destination+'&destinationType=subdistrict&weight='+weight+'&courier='+courier,
        dataType: 'json',
        method: 'GET',
        success: function(data){
            $('.shipping_cost').empty();
            $('.shipping_services').empty();
            $.each(data, function(key,value){
                console.log(data);
                // $.each(value.costs[0], function(key1, value1){
    
                    // $.each(value1.cost, function(key2, value2){
                        $('.shipping_cost').val(value.costs[0].cost[0].value);
                        $('.shipping_services').val(value.name+'-'+value.costs[0].service);

                        updateShipmentCost(id, value.costs[0].cost[0].value, value.name+'-'+value.costs[0].service);
                        
                    // });
                // });
            });
        },
        error: function(error){
            console.log(error.responseText);
        }
    });
}

function getOngkirMultiple(id, destination){
    let origin=399; // kode untuk Kota Semarang
    let weight=$('.weight').val();
    let courier='jnt';

    $.ajax({
        // url:'{{ url("api/origin=")}}'+origin+"&originType=city&destination="+destination+"&destinationType=subdistrict&weight="+weight+"&courier="+courier,
        url:'../api/origin='+origin+'&originType=city&destination='+destination+'&destinationType=subdistrict&weight='+weight+'&courier='+courier,
        dataType: 'json',
        method: 'GET',
        beforeSend: function(){
            $('.order-now-button').prop("disabled", true);
        },
        success: function(data){
            $('.multiple_checkout .multiple_shipping_cost').empty();
            $('.multiple_checkout .multiple_shipping_services').empty();

            $.each(data, function(key,value){
                // $.each(value.costs[0], function(key1, value1){
                    $('multiple_shipping_cost').val(value.costs[0].cost[0].value);
                    $('.multiple_shipping_services').val(value.name+'-'+value.costs[0].service);

                    updateShipmentCost(id, value.costs[0].cost[0].value, value.name+'-'+value.costs[0].service);

                    // $.each(value1.cost, function(key2, value2){
                    //     $('.multiple_shipping_cost').val(value2.value);
                    //     $('.multiple_shipping_services').val(value.name);

                    //     updateShipmentCost(id, value2.value, value.name);

                    // });

                    // $('select[name=service] option:selected').val(services);
                // });
            });
        }
    });
}


function updateShipmentCost(id, cost, services){
    let province_id = $('.input_province_id').val();
    let city_id = $('.input_city_id').val();
    let subdistrict_id = $('.input_subdistrict_id').val();

    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: '../api/update_cost',
        type: 'POST',
        data: {
            id : id,
            cost: cost,
            services : services
        },
        dataType: 'json',
        // beforeSend: function(){	
        //     console.log('update_cost processing with data '+id+' '+cost+services);	
        // },
        success: function(data){
            $.ajax({	           
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')	
                },	
                url: '../api/cost/'+$('.order_id').val(),	
                type: 'GET',	
                dataType: 'json',	
                beforeSend: function(){	
                    if(province_id != '' && city_id != '' && subdistrict_id != ''){
                        $('.cost_shipment_text').html('Please wait...'); 
                        $('.cost_total_text').html('Please wait...'); 
                        $('.total_text').html('Please wait...');
                    }	
                    $('.order-now-button').prop('disabled', true);
                },	
                success: function(res){	
                    let cost = res['results'].cost;	
                    let discount=$('.discount').val();
                    let additional_cost=$('.additional_cost').val();

                    if(discount == ''){
                        discount = 0;
                    }
                    if(additional_cost == '' || additional_cost==null){
                        additional_cost=0;
                    }

                    if(cost == 0 || cost == '' || cost == null){
                        $('.cost_shipment_text').html('<small>Unset</small>');
                        $('.cost_total_text').html('<small>Unset</small>');
                        $('.cost').val(0);  
                    } else{
                        // $('.cost_shipment_text').html(data.cost.toLocaleString() + ' IDR');
                        $('.cost_shipment_text').html(data.cost+ ' IDR');
                        $('.cost_total_text').html(cost.toLocaleString() + ' IDR');
                        $('.cost').val(cost);  
                    }
                            
                    let shipping_discount = $('.shipping_discount_value').val();
                    let order_service = $('.radio-shipment').prop('checked');
                    let subdistrict_id = $('.checkout .form_shipment .subdistrict_id').val();


                    if(shipping_discount==0 && !order_service && (subdistrict_id=="" || subdistrict_id==null)){ // ketika item<1 dan pengiriman pickup
                        var total =  parseInt($('.subtotal').val()) - parseInt(discount) + parseInt(additional_cost);   

                    }else if(shipping_discount !=0 && order_service && (subdistrict_id=="" || subdistrict_id==null) ){
                        $('.shipping_discount').addClass('hide');
                        $('.shipping_discount').removeClass('show');  
                        var total = parseInt(cost) + parseInt($('.subtotal').val()) - parseInt(discount) + parseInt(additional_cost);   
                    }else {
                        var total = parseInt(cost) + parseInt($('.subtotal').val()) - parseInt(discount) - parseInt(shipping_discount) + parseInt(additional_cost);   
                        $('.shipping_discount').addClass('show');
                        $('.shipping_discount').removeClass('hide');
                        // console.log('terakhir');   
                    }
                    $('.total').val(total); 
                    $('.total_text').html(total.toLocaleString() + ' IDR'); 

                    $('.order-now-button').prop('disabled', false);
                }	
            });	

            let this_url='../api/city';	

            if(subdistrict_id){	
                getSubdistrict(this_url, city_id);	
            }	
        },
        error: function(error){
            window.alert("Sorry, something wrong! Please reload the page and try again later or contact us");
            console.log(error.responseText);
        }
    });
}


function removeOngkir(){
    $('.shipping_cost').empty();
    $('.shipping_services').empty();
    updateShipment();
}

// navbar.js

// SIDEBAR NUMPANG BENTAR
$('.btn-right-sidebar').on('click', function(){
    var ww = $( window ).width();

    if (ww < 575.98) {
      $('.right-sidebar')[0].style.width="100%";
    } else if (ww >= 576 && ww <=767.98) {
      $('.right-sidebar')[0].style.width="100%";
    }else if (ww >= 768 && ww <=991.98) {
        $('.right-sidebar')[0].style.width="50%";
    }else if (ww >= 992 && ww <=1199.98) {
        $('.right-sidebar')[0].style.width="40%";
    }else if (ww >=1200) {
        $('.right-sidebar')[0].style.width="30%";
    }
});

$('.btn-close').on('click', function(){
    $('.right-sidebar')[0].style.width="0";
});

// design.js
// jQuery(function(){
    // deklarasi
    var product_id=$('input[name=product_id]').val();

    if($('.design')[0]){
        // getMainCharacters(product_id); // list untuk select kategori character
        // getAllCharacters(product_id); // load semua characters

        if($('#front_frame_canvas')[0]){
            designOnMug();
        }
    }

    // protect the assets (image)
    function disableImage(){
        $('img').attr('draggable', false);
        $("img").on("contextmenu", function(e){
            return false;
        });
    }

    // hide loader after agree 
    if($('#afterAgree')[0]){
        $('#afterAgree').hide();
    }

    // TUMBLER
    if($('select[name="list-choose-tumbler"]')[0]){
        if($('select[name="list-choose-tumbler"]').val() == 'character'){
            $('#characters').show();
            $('#char-text').hide();
        } else if($('select[name="list-choose-tumbler"]').val() == 'frames'){
            $('#char-text').show();
            $('#characters').hide();

            getAllTumblerFrames(product_id);
        } else {
            $('#list-design').hide();
            $('#char-text').hide();
            $('#characters').hide();
        }
    }

    // kalau user pilih radio design 
    $('select[name="list-choose-tumbler"]').on('change', function(){
        $('#list-design').show();
        if($(this).val() == 'characters'){
            $('#characters').show();
            $('#char-text').hide();

            // getMainTumblerCharacters(product_id);
            let character_id=$('.design-tumbler .list-characters').val();
            if(character_id=='all'){
                getAllTumblerCharacters(product_id);
            }else{
                getTumblerCharacters(character_id);
            }
        } else if($(this).val() == 'frames'){
            $('#char-text').show();
            $('#characters').hide();

            // getMainTumblerFrames(product_id); 
            getAllTumblerFrames(product_id);

            let main_frame_id=$('.list-tumbler-frames').val();
            if(main_frame_id=='all'){
                getAllTumblerFrames(product_id);
            }else{
                getTumblerFrames(main_frame_id);
            }
            getAllFrames(product_id);
        } else {
            $('#char-text').hide();
            $('#characters').hide();
        }
    });

    // COUPLE
    if($('.couple')[0]){
        $('#back-mug-second').hide();
    }

    // COLORED MUG
    if($('#colored-mug')[0]){
        $('#list-design').hide();
        if($('#title-side').html() == 'Front Side'){
            var f_design_type=$('.f_design_type'); // ini jgn dihapus, soalnya kalo ga didefinisi ulang ntar error

            $('#f_design_type').val('text');
            f_design_type.val('text');
            getFrontMugBlank();
        } else{
            var b_design_type=$('.b_design_type');

            $('#b_design_type').val('text');
            b_design_type.val('text');
            getBackMugBlank();
        }
    }

    // MUG
    // hide frames & add text
    if($('select[name="list-choose"]')[0]){
        if($('select[name="list-choose"]').val() == 'characters'){
            $('#characters').show();
            $('#frames').hide();
            $('#text').hide();
        } else if($('select[name="list-choose"]').val() == 'frames'){
            // $('#frames').show();
            $('#characters').hide();
            $('#text').hide();
        } else if($('select[name="list-choose"]').val() == 'text'){
            $('#list-design').hide();
            $('#frames').hide();
            $('#characters').hide();
            $('#text').show();
        }
         else{
            $('#list-design').hide();
            $('#frames').hide();
            $('#characters').hide();
            $('#text').hide();
        }
    }

    // kalau user pilih radio design
    $('select[name="list-choose"]').on('change', function(){
        if($(this).val() != ''){
            $('#first-next').removeClass('d-none');
        }
        if($(this).val() == 'characters'){
            $('#list-design').show();
            $('#characters').show();
            $('#frames').hide();
            $('#text').hide();

            getMainCharacters(product_id);

            let character_id=$('.list-characters').val();
            if(character_id=='all'){
                getAllCharacters(product_id);
            }else{
                getCharacters(character_id);
            }
        } else if($(this).val() == 'frames'){
            $('#list-design').show();
            // $('#frames').show();
            $('#characters').hide();
            $('#text').hide();
            getAllFrames(product_id);
        } else if($(this).val() == 'text'){
            $('#list-design').hide();
            $('#frames').hide();
            $('#characters').hide();
            $('#text').show();

            if($('#title-side').html() == 'Front Side'){
                var f_design_type=$('.f_design_type'); // ini jgn dihapus, soalnya kalo ga didefinisi ulang ntar error

                $('#f_design_type').val('text');
                f_design_type.val('text');
                getFrontMugBlank();
            } else{
                var b_design_type=$('.b_design_type');

                $('#b_design_type').val('text');
                b_design_type.val('text');
                getBackMugBlank();
            }
        } else{
            $('#frames').hide();
            $('#characters').hide();
            $('#text').hide();
        }
    });

    // Kalau user pilih kategori character
    $('.list-characters').on('change', function(){
        let character_id=$(this).val();

        
        if(character_id=='all'){
            getAllCharacters(product_id);
        }else{
            getCharacters(character_id);
        }
    });

    // getFrameCategory();

    // user pilih frames
    $('.list-frames').on('click', function(){
        getAllFrames(product_id);
    });

    // Menambahkan text di mug
    $('select[name=select_font]').on('change', function(){
        let font_type=$(this).val();

        $('.font_default').hide();
        $('#quotes').removeClass();
        $('#quotes').addClass('px-2');
        $('#quotes').addClass('radius');
        $('#quotes').addClass('form-control');
        $('#quotes').addClass(font_type);
    });


    // send data to design
    $('#btn-finish-design').on('click', function(){
        let customer_id=$('input[name=customer_id]').val();
        // let theme_id=$('input[name=theme_id]').val();
        let product_id=$('input[name=product_id]').val();
        let front_mug_id=$('input[name=front_mug_id]').val();
        let front_mug_text=$('textarea[name=front_mug_text]').val();
        let front_font_fam=$('input[name=front_font_fam]').val();
        let front_get_canvas=$('input[name=front_get_canvas]').val();
        let fmug_get_canvas;

        let back_mug_id=$('input[name=back_mug_id]').val();
        let back_mug_text=$('textarea[name=back_mug_text]').val();
        let back_font_fam=$('input[name=back_font_fam]').val();
        let back_get_canvas=$('input[name=back_get_canvas]').val();
        let bmug_get_canvas;

        let f_design_type=$('#f_design_type').val();
        let b_design_type=$('#b_design_type').val();

        fmug_get_canvas=$('input[name=fmug_get_canvas]').val();
        bmug_get_canvas=$('input[name=bmug_get_canvas]').val();

        // couple
        let front_mug_id2;
        let front_mug_text2;
        let front_font_fam2;
        let front_get_canvas2;
        let fmug_get_canvas2;

        let back_mug_id2;
        let back_mug_text2;
        let back_font_fam2;
        let back_get_canvas2;
        let bmug_get_canvas2;

        let f_design_type2;
        let b_design_type2;

        if($('.couple')[0]){
            front_mug_id2=$('input[name=front_mug_id_second]').val();
            front_mug_text2=$('textarea[name=front_mug_text_second]').val();
            front_font_fam2=$('input[name=front_font_fam_second]').val();
            front_get_canvas2=$('input[name=front_get_canvas_second]').val();

            back_mug_id2=$('input[name=back_mug_id_second]').val();
            back_mug_text2=$('textarea[name=back_mug_text_second]').val();
            back_font_fam2=$('input[name=back_font_fam_second]').val();
            back_get_canvas2=$('input[name=back_get_canvas_second]').val();

            f_design_type2=$('#f_design_type_second').val();
            b_design_type2=$('#b_design_type_second').val();

            fmug_get_canvas2=$('input[name=fmug_get_canvas_second]').val();
            bmug_get_canvas2=$('input[name=bmug_get_canvas_second]').val();
        }

        if(front_mug_id =='' && back_mug_id==''){
            $(this).attr('data-target', '#modalDesignValidation');
        }else if(front_mug_id==''){
            // console.log("jdjd");
        }else if(back_mug_id==''){
            // console.log("jdjd");
        }else{
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                // url:'../../finish-design/'+product_id,
                url:BASE_URL+'/finish-design/'+product_id,
                type: 'POST',
                data: {
                    customer_id: customer_id,
                    product_id: product_id,

                    asset1_code: front_mug_id, // design
                    text1 : front_mug_text,
                    text1_style: front_font_fam,
                    asset1_canvas: front_get_canvas, //canvas dengan frame
                    text1_canvas : fmug_get_canvas, // teks canvas

                    asset2_code: back_mug_id,
                    text2 : back_mug_text,
                    text2_style : back_font_fam,
                    asset2_canvas : back_get_canvas,
                    text2_canvas : bmug_get_canvas,

                    asset3_code: front_mug_id2, // design couple
                    text3 : front_mug_text2,
                    text3_style: front_font_fam2,
                    asset3_canvas: front_get_canvas2, //canvas dengan frame
                    text3_canvas : fmug_get_canvas2, // teks canvas

                    asset4_code: back_mug_id2,
                    text4 : back_mug_text2,
                    text4_style : back_font_fam2,
                    asset4_canvas : back_get_canvas2,
                    text4_canvas : bmug_get_canvas2
                },
                dataType: 'json',
                beforeSend: function(){
                    $('#afterAgree').show();
                    $('#afterAgree').addClass('modal-backdrop');
                    $('#afterAgree').addClass('fade');
                    $('#afterAgree').addClass('show');
                },                
                success: function(data){
                    window.location.href='../../../final/'+data.results.code;
                    // window.location.href=BASE_URL+'/final/'+data.results.code;
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        }
    });

// });

// preview.js
// untuk mengubah add etxt atau custom pada greeting card di preview
$('select[name=card_type]').on('change', function(){
    let card_type=$(this).val();

    // console.log(card_type);
    if(card_type == 'blank'){
        $('.greet-from').attr('disabled', true);
        $('.greet-message').attr('disabled', true);
    }else{
        $('.greet-from').removeAttr('disabled', false);
        $('.greet-message').removeAttr('disabled', false);
    }

    // console.log("CEKCEKKKKKK");
});

// POP UP WARNA MUG KHUSUS COLOURED MUG
$('.color label').each(function(i){
    $(this).on('mouseover', function(e){
        e.preventDefault();
        setTimeout(function(){
            $('.show-color').eq(i).removeClass('hide');
            $('.show-color').eq(i).addClass('show');
        }, 500);

        // console.log("hover color");
    });
    $(this).on('mouseout', function(e){
        e.preventDefault();
        setTimeout(function(){
            $('.show-color').eq(i).addClass('hide');
        }, 500);
    });
});

// POP UP STICKER
$('.sticker label').each(function(i){
    $(this).on('mouseover', function(e){
        e.preventDefault();
        setTimeout(function(){
            $('.show-sticker').eq(i).removeClass('hide');
            $('.show-sticker').eq(i).addClass('show');
        }, 500);

        // console.log("hover sticker");
    });
    $(this).on('mouseout', function(e){
        e.preventDefault();
        setTimeout(function(){
            $('.show-sticker').eq(i).addClass('hide');
        }, 500);
    });
});

// SHOW WRAPPING PAPER
$('.wrapping-paper label').each(function(i){
    $(this).on('mouseover', function(e){
        e.preventDefault();
        setTimeout(function(){
            $('.show-wrapping-paper').eq(i).removeClass('hide');
            $('.show-wrapping-paper').eq(i).addClass('show');
        }, 500);

        // console.log(i);
    });
    $(this).on('mouseout', function(e){
        e.preventDefault();
        setTimeout(function(){
            $('.show-wrapping-paper').eq(i).addClass('hide');
        }, 500);
    });
});

// SHOW ADDITIONAL ITEM
$('.additional-item label').each(function(i){
    $(this).on('mouseover', function(e){
        e.preventDefault();
        setTimeout(function(){
            $('.show-additional-item').eq(i).removeClass('hide');
            $('.show-additional-item').eq(i).addClass('show');
        }, 500);

        // console.log(i);
    });
    $(this).on('mouseout', function(e){
        e.preventDefault();
        setTimeout(function(){
            $('.show-additional-item').eq(i).addClass('hide');
        }, 500);
    });
});
// choose_checkout.js

$('.voucher-form').hide();

$('.show-voucher').on('click', function(){
    $('.voucher-form').slideToggle();
});

// form_shipment.js
// Jika button pilih alamat di klik
if($('#checkout')[0]){
    $('.btnChooseAddress').each(function(i){
        $(this).on('click', function(e){
            e.preventDefault();
            
            let address_id=$('.modalChooseAddress .address_id').eq(i).val();
            let cart_id=$('.multiple_cart_id').val();
            let order_id=$('.order_id').val();

            if(cart_id!=null){
                chooseMultipleAddress(cart_id, address_id);
                $.ajax({       
                    url : '../api/shipment/'+order_id,
                    method: 'GET',     
                    success: function(data){    
                        $('.multiple_shipment_id').val(data['results'].id); 
                    }   
                });
            }
            else{
                chooseAddress(address_id);
                $.ajax({       
                    url : '../api/shipment/'+order_id,
                    method: 'GET',     
                    success: function(data){    
                        $('.shipment_id').val(data['results'].id);
                        console.log(data);
                    }   
                });
            }
        });
    });
}

function chooseAddress(address_id){
    let order_id=$('.checkout .order_id').val();

    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: '../api/choose_address/'+address_id,
        type: 'POST',
        data: {
            address_id: address_id,
            order_id: order_id
        },
        dataType: 'json',
        beforeSend: function(){
            $('.checkout .cost_shipment_text').html('Please wait...');
            $('.checkout .cost_total_text').html('Please wait...');
            $('.checkout .total_text').html('Please wait...');
            $('.checkout .receiver_name').prop('disabled', true);
            $('.checkout .phone_number').prop('disabled', true);
            $('.checkout .address').prop('disabled', true);
            $('.checkout .postal_code').prop('disabled', true);
            $('.checkout .province_id').prop('disabled', true);
            $('.checkout .city_id').prop('disabled', true);
            $('.checkout .subdistrict_id').prop('disabled', true);
            $('.checkout .order-now-button').prop('disabled', true);
        },
        success: function(data){
            let id = data.results['id'];
            let subdistrict_id = data.results['subdistrict_id'];
            let province_url='../api/province';
            let city_url='../api/city';

            $('.checkout .receiver_name').prop('disabled', false);
            $('.checkout .phone_number').prop('disabled', false);
            $('.checkout .address').prop('disabled', false);
            $('.checkout .postal_code').prop('disabled', false);
            $('.checkout .province_id').prop('disabled', false);
            $('.checkout .city_id').prop('disabled', false);
            $('.checkout .subdistrict_id').prop('disabled', false);

            $('.checkout .receiver_name').val(data.results['receiver_name']);
            $('.checkout .phone_number').val(data.results['phone_number']);
            $('.checkout .address').val(data.results['address']);
            $('.checkout .postal_code').val(data.results['postal_code']);

            $('.checkout .input_province_id').val(data.results['province_id']);
            $('.checkout .province_id').val(data.results['province_id']);

            $('.checkout .input_city_id').val(data.results['city_id']);
            getCity(province_url, data.results['province_id']);

            $('.checkout .input_subdistrict_id').val(data.results['subdistrict_id']);
            $('.checkout .subdistrict_id').empty();
            $('.checkout .subdistrict_id').append('<option>Please wait...</option>');

            getOngkir(id, subdistrict_id);
            updateShipment();
            $('.checkout .order-now-button').prop('disabled', false);
        },
        error: function(error){
            // window.alert("Sorry, something wrong! Please try again later or contact us");
        }
    });
}

function chooseMultipleAddress(address_id){
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: '../api/choose_multiple_address/'+address_id,
        type: 'GET',
        beforeSend: function(){
            $('.receiver_name').prop('disabled', true);
            $('.phone_number').prop('disabled', true);
            $('.address').prop('disabled', true);
            $('.postal_code').prop('disabled', true);
            $('.province_id').prop('disabled', true);
            $('.city_id').prop('disabled', true);
            $('.subdistrict_id').prop('disabled', true);
            $('.save-shipment-btn').prop('disabled', true);
        },
        success: function(data){
            let id = data.results['id'];
            let subdistrict_id = data.results['subdistrict_id'];
            let province_url='../api/province';
            let city_url='../api/city';

            $('.receiver_name').prop('disabled', false);
            $('.phone_number').prop('disabled', false);
            $('.address').prop('disabled', false);
            $('.postal_code').prop('disabled', false);
            $('.province_id').prop('disabled', false);
            $('.city_id').prop('disabled', false);
            $('.subdistrict_id').prop('disabled', false);

            $('.receiver_name').val(data.results['receiver_name']);
            $('.phone_number').val(data.results['phone_number']);
            $('.address').val(data.results['address']);
            $('.postal_code').val(data.results['postal_code']);

            $('.input_province_id').val(data.results['province_id']);
            $('.province_id').val(data.results['province_id']);

            $('.input_city_id').val(data.results['city_id']);
            getCity(province_url, data.results['province_id']);

            $('.input_subdistrict_id').val(data.results['subdistrict_id']);
            getSubdistrict(city_url, data.results['city_id']);

            $('.save-shipment-btn').prop('disabled', false);
        },
        error: function(error){
            window.alert("Sorry, something wrong! Please try again later or contact us");
        }
    });
}


// SINGLE CHECKOUT
let shipment=$('input[name=radio-service]').val();
let cek=$('.radio-shipment').prop('checked');

if($('.radio-shipment')[0]){
    if(!cek){ // untuk pickup
        $('.checkout #form_shipment').removeClass('show');
        $('.checkout #form_shipment').addClass('hide');
        $('.checkout #form_pickup').addClass('show');
        $('.btn-choose-address').hide();

        $('.checkout .form_shipment .form-control').removeAttr('required', false);
        $('.checkout .form_pickup .form-control').attr('required', true);

    } else { // untuk shipment
        $('#form_pickup').removeClass('show');
        $('#form_pickup').addClass('hide');
        $('#form_shipment').addClass('show');
        $('.btn-choose-address').show();

        $('.checkout .form_pickup .form-control').removeAttr('required', false);
        $('.checkout .form_shipment .form-control').attr('required', true);
        $('.checkout .form_shipment .notes').attr('required', false);
    }
}

$('input[name=radio-service]').on('change', function(){
    let cek=$('.radio-shipment').prop('checked');
    let order_id=$('.order_id').val();
    let subdistrict_id = $('.checkout .input_subdistrict_id').val();

    $.ajax({       
        url : '../api/shipment/'+order_id,
        method: 'GET',     
        success: function(data){    
            $('.shipment_id').val(data['results'].id);   
        }   
    });

    if(!cek){
        $('#form_shipment').removeClass('show');
        $('#form_shipment').addClass('hide');
        $('#form_pickup').addClass('show');
        $('.btn-choose-address').hide();
        $('.shipping_discount').addClass('hide');
        $('.shipping_discount').removeClass('show');

        $('.checkout .form_shipment .form-control').removeAttr('required', false);
        $('.checkout .form_pickup .form-control').attr('required', true);

        let service='pickup';
        updateOrder(service);

    } else{
        $('#form_pickup').removeClass('show');
        $('#form_pickup').addClass('hide');
        $('#form_shipment').addClass('show');
        $('.btn-choose-address').show();
        // $('.shipping_discount').addClass('show');
        // $('.shipping_discount').removeClass('hide');   

        $('.checkout .form_pickup .form-control').removeAttr('required', false);
        $('.checkout .form_shipment .form-control').attr('required', true);
        $('.checkout .form_shipment .notes').attr('required', false);

        let service='shipment';
        updateOrder(service);
    }
    // window.location.reload();
});


$('.form_pickup .name').on('blur', function(e){
    e.preventDefault();
    setTimeout(
        updatePickUp(),
        500
    )
});

$('.form_pickup .pickup_phone_number').on('blur', function(e){
    e.preventDefault();
    setTimeout(
        updatePickUp(),
        500
    )
});

if($('.form_pickup .name')[0]){
    if($('.form_pickup .pickup_phone_number').val() != '' && $('.form_pickup .name').val() != ''){
        $.ajax({
            url : '../pickup/' + $('.order_id').val(),
            method: 'GET',
            success: function(data){
                $('.pickup_id').val(data['results'].id);
            }
        });
    }
}

//end pickup js


// shipment
var delay=1000;
$('.checkout .form_shipment .form-control').on('change', function(e){
    e.preventDefault();

    setTimeout(
        updateShipment(),
        delay
    );
});

if($('.checkout .form_shipment .input_province_id')[0]){
    if($('.checkout .form_shipment .input_province_id').val() != ''){
        let province_id=$('.form_shipment .input_province_id').val();
        let this_url='../api/province';

        $('.select-province-val').hide();
        getCity(this_url, province_id);

    } else{
        $('.checkout .select-province-val').show();
    }
}

if($('.checkout .form_shipment .input_city_id')[0]){
    if($('.checkout .form_shipment .input_city_id').val() != ''){
        let city_id=$('.checkout .form_shipment .input_city_id').val();
        let this_url='../api/city';

        $('.checkout .select-city-val').hide();

        getSubdistrict(this_url, city_id);
    } else{
        $('.checkout .select-city-val').show();
    }
}

if($('.checkout .form_shipment .input_subdistrict_id').val() != ''){
    $('.shipping_discount').addClass('show');
    $('.shipping_discount').removeClass('hide');   
    $('.checkout .select-subdistrict-val').hide();
}else{
    $('.shipping_discount').addClass('hide');
    $('.shipping_discount').removeClass('show');
}

// Jika province berubah
$('.checkout .form_shipment .province_id').on('change', function(){
    let province_id=$(this).val();
    let this_url='../api/province';
    let shipment_id=$('.shipment_id').val();

    if(province_id){
        $('.cost_total_text').html('<small>Unset</small>');
        $('.total_text').html('Please wait...');

        $('.checkout .province_id').val(province_id);
        $('.checkout .input_province_id').val(province_id);
        $('.checkout .input_city_id').val("");
        $('.checkout .input_subdistrict_id').val("");

        $('.checkout .form_shipment .subdistrict_id').empty();
        $('.checkout .form_shipment .subdistrict_id').append('<option>Select Subdistrict</option>');

        $('.checkout .shipping_cost').val("");
        $('.checkout .shipping_services').val("");

        $('.order-now-button').prop('disabled', true);

        updateShipment(); // panggil fungsi updateShipment yang ada di form_shipment.js
            if(shipment_id != ''){
            updateShipmentCost(shipment_id, '0', 'J&T Express');
        }
        getCity(this_url, province_id);
    } else{
        $('select[name=city_id]').append('<option>Select City</option>');
    }
});

// Jika City berubah
$('.checkout .form_shipment .city_id').on('change', function(){
    let city_id=$(this).val();
    let this_url='../api/city';
    let order_id=$('.order_id').val();

    if(city_id){
        $('.cost_total_text').html('<small>Unset</small>');
        $('.total_text').html('Please wait...');

        $('.city_id').val(city_id);
        $('.input_city_id').val(city_id);
        $('.input_subdistrict_id').val("");
        $('.shipping_cost').val("");
        $('.shipping_services').val("");

        $('.order-now-button').prop('disabled', true);

        getSubdistrict(this_url, city_id);

        $.ajax({	   
            url : '../api/shipment/'+order_id,
            method: 'GET',	   
            success: function(data){	
                updateShipment(); // panggil updateShipment yang ada di from_shipment.js

                $('.shipment_id').val(data['results'].id);   
                updateShipmentCost(data['results'].id, '0', 'J&T Express');	 
            }	
        });
    }else{
        $('.subdistrict_id').append('<option>Select Subdistrict</option>');
    }
});

// // Jika Subdistrict berubah
$('.checkout .form_shipment .subdistrict_id').on('change', function(){
    let id=$('.checkout .shipment_id').val();
    let subdistrict_id=$(this).val();

    if(subdistrict_id){
        $('.order-now-button').prop('disabled', true);
        $('.cost_total_text').html('Please wait...'); 
        $('.total_text').html('Please wait...');

        $('.subdistrict_id').empty();
        $('.form_shipment .subdistrict_id').append('<option selected>Please wait..</option>');
        $('.input_subdistrict_id').val(subdistrict_id);
        $('.shipping_cost').val("");
        $('.shipping_services').val("");

        updateShipment();
        getOngkir(id, subdistrict_id);
    }
});



// hide loader after submit 
if($('#afterSubmit')[0]){
    $('#afterSubmit').hide();
}

// if($('.checkout .form_shipment .province_id').val() == null || $('.checkout .form_shipment .province_id').val() =="" ||
// $('.checkout .form_shipment .city_id').val()==null || $('.checkout .form_shipment .city_id').val()==""){
//     $('.btn_use_voucher_ongkir').addClass('disabled');
//     $('.text_voucher_detail_ongkir').addClass('text-muted');
// }else{
//     $('.btn_use_voucher_ongkir').removeClass('disabled');
//     $('.text_voucher_detail_ongkir').removeClass('text-muted');
// }

if($('#voucherClaim')[0]){
    $('#voucherClaim').on('click', function(){
        if($('#voucherCode').val() == ''){
            Swal.fire(
                'Hmmm!',
                'You must fill the voucher code first',
                'warning'
            )
        } else{
            let inputData = {
                'voucher_code' : $('#voucherCode').val(),
                'customer_id'  : $('#customerId').val()
            }

            $.ajax({    
                url     : '../voucher/claim',  
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                method  : 'POST',  
                data    : inputData,
                dataType: 'json',
                beforeSend  : function(){
                    $('#afterSubmit').show();
                    $('#afterSubmit').addClass('modal-backdrop');
                    $('#afterSubmit').addClass('fade');
                    $('#afterSubmit').addClass('show');
                }, 
                success: function(data){    
                    if(data.api_message == 'failed'){
                        $('#afterSubmit').hide();
                        $('#afterSubmit').removeClass('modal-backdrop');
                        $('#afterSubmit').removeClass('fade');
                        $('#afterSubmit').removeClass('show');

                        Swal.fire(
                          'Oops!',
                          data['results'],
                          'warning'
                        )

                    } else if(data.api_message == 'success'){
                        window.location.reload();
                        Swal.fire(
                          'Yippiee!',
                          'Your voucher successfully claimed',
                          'info'
                        )
                        $('#claimMessage').html('Voucher successfully claimed');
                        $('#claimForm').hide();
                    } else{ //kalau voucher sudah pernah digunakan
                        $('#afterSubmit').hide();
                        $('#afterSubmit').removeClass('modal-backdrop');
                        $('#afterSubmit').removeClass('fade');
                        $('#afterSubmit').removeClass('show');

                        Swal.fire(
                          'Oops!',
                          data.api_message,
                          'info'
                        )
                    }
                }, 
                error: function(err){
                    console.log(err.responseText)
                }   
            });
        }
    });
}

if($('#claimPoint')[0]){
    $('#claimPoint').on('change', function(){
        let inputData;

        if(this.checked){
            inputData = {'used' : 'yes'};
        } else {
            inputData = {'used' : 'no'};
        }

        $.ajax({    
            url     : '../point/claim',  
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            method  : 'POST',  
            data    : inputData,
            dataType: 'json',
            beforeSend  : function(){
                $('#afterSubmit').show();
                $('#afterSubmit').addClass('modal-backdrop');
                $('#afterSubmit').addClass('fade');
                $('#afterSubmit').addClass('show');
            }, 
            success: function(data){    
                if(data.api_message == 'failed'){
                    $('#afterSubmit').hide();
                    $('#afterSubmit').removeClass('modal-backdrop');
                    $('#afterSubmit').removeClass('fade');
                    $('#afterSubmit').removeClass('show');

                    Swal.fire(
                        'Oops!',
                        "The point can't be used!",
                        'warning'
                    )
                    console.log(data.results)
                } else if(data.api_message == 'success'){
                    window.location.reload();
                } 
            }, 
            error: function(err){
                console.log(err.responseText)
            }   
        });
    })
}

$('.checkout .single_form').on('submit', function(e){
    let order_id=$('.checkout .order_id').val();

    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type        : 'POST',
        url         : '../order/post/'+order_id,
        cache       : false,
        data        : $('.checkout .single_form').serialize(),
        dataType    : 'json',
        beforeSend  : function(){
                        $('#afterSubmit').show();
                        $('#afterSubmit').addClass('modal-backdrop');
                        $('#afterSubmit').addClass('fade');
                        $('#afterSubmit').addClass('show');
                      } 
    }).done(function(data) {
        if(data['api_message']=='success'){
            window.location.href='../final_checkout/'+data.results.custom_id;
        }
        else{
            if(data.results.status == 'unpaid'){
                window.location.href='../final_checkout/'+data.results.custom_id;
            }
            else{
                window.location.href='../unavailable/order/'+data.custom_id;
            }
        }
    }).fail(function(data) {
        //Server failed to respond - Show an error message
        // console.log(data.responseText);
        window.alert('Could not reach server. Refresh the page or try again later.');
        // $('form').html('<div class="alert alert-danger">Could not reach server, please try again later.</div>');
    });

    e.preventDefault();
})


// FUNCTON SINGLE CHECKOUT
function updatePickUp(){
    let id=$('.form_pickup .pickup_id').val();
    let order_id=$('.form_pickup .order_id').val();
    let name=$('.form_pickup .name').val();
    let phone_number=$('.form_pickup .pickup_phone_number').val();

    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: '../pickup',
        type: 'POST',
        data : {
            id : id,
            order_id : order_id,
            name : name,
            phone_number : phone_number
        },
        success: function(data){
            if(data.api_message == 'failed'){
                window.location.href='../unavailable/order/'+data.custom_id;
            }
        }
    })
}

function updateOrder(service){
    let order_id=$('.checkout .order_id').val();

    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: '../order/update',
        type: 'POST',
        data : {
            order_id : order_id,
            service : service
        },
        beforeSend: function(){	
            $('.checkout .cost_total_text').html('Please wait...');	
            $('.checkout .total_text').html('Please wait...');
            $('.checkout .order-now-button').prop('disabled', true);
        },
        success: function(data){
            if(data['api_message']=='failed'){

            }else{
                // window.location.reload();
                let discount=$('.discount').val();
                let additional_cost=$('.additional_cost').val();

                if(discount == ''){
                    discount = 0;
                }

                if(additional_cost == '' || additional_cost==null){
                    additional_cost=0;
                }


                if (service == 'pickup'){ //kalau pickup
                    let cost = parseInt(0);
                    let total = parseInt($('.subtotal').val()) - parseInt(discount) + parseInt(additional_cost);
    
                    $('.checkout .cost').val(cost);
                    $('.checkout .cost_total_text').html(cost.toLocaleString() + ' IDR');
                    $('.checkout .total').val(total);
                    $('.checkout .total_text').html(total.toLocaleString() + ' IDR');

                    //ganti isian input
                    $('#radio-service').val('pickup');
                } 
                else{ //kalau shipment
                    let id = $('.checkout .shipment_id').val();
                    let subdistrict_id = $('.checkout .form_shipment .subdistrict_id').val();
                    let shipping_discount = $('.shipping_discount_value').val();

                    console.log(shipping_discount);
                    if(subdistrict_id == null || subdistrict_id ==""){
                        var total_text = parseInt($('.checkout .subtotal').val()) - parseInt(discount);
                    }else{
                        var total_text = parseInt($('.checkout .subtotal').val()) - parseInt(discount) - parseInt(shipping_discount);
                    }
    
                    if(id != ''){
                        if(subdistrict_id == '' || subdistrict_id === null ){
                            $('.checkout .cost_total_text').html('<small>Unset</small>');
                            $('.checkout .total_text').html(total_text.toLocaleString() + ' IDR');
                        }
                        else {
                            getOngkir(id, subdistrict_id);
                        }
                    } else{
                        $('.checkout .cost_total_text').html('<small>Unset</small>');
                        $('.checkout .total_text').html(total_text.toLocaleString() + ' IDR');
                    }

                    $('#radio-service').val('shipment');
                }
    
                $('.checkout .order-now-button').prop('disabled', false);
            }
        }
    })
}

function updateShipment(){
    let id=$('.checkout .form_shipment .shipment_id').val();
    let order_id=$('.checkout .form_shipment .order_id').val();
    let sender_name=$('.checkout .form_shipment .sender_name').val();
    let sender_phone_number=$('.checkout .form_shipment .sender_phone_number').val();

    let receiver_name=$('.checkout .form_shipment .receiver_name').val();
    let phone_number=$('.checkout .form_shipment .phone_number').val();
    let address=$('.checkout .form_shipment .address').val();
    let province_id=$('.checkout .form_shipment .input_province_id').val();
    let city_id=$('.checkout .form_shipment .input_city_id').val();
    let subdistrict_id=$('.checkout .form_shipment .input_subdistrict_id').val();
    let postal_code=$('.checkout .form_shipment .postal_code').val();
    let notes=$('.checkout .form_shipment .notes').val();

    let service=$('#radio-service').val();

    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: '../shipment',
        type: 'POST',
        data: {
            id : id,
            order_id: order_id,
            receiver_name : receiver_name,
            phone_number : phone_number,
            address : address,
            province_id : province_id,
            city_id : city_id,
            subdistrict_id : subdistrict_id,
            postal_code : postal_code,
            notes : notes,
            sender_name : sender_name,
            sender_phone_number : sender_phone_number,
            service: service,
        },
        dataType: 'json',
        success: function(data){
            if(data['api_message']=='failed'){
                window.location.href='../unavailable/order/'+data.custom_id;
            }
        },
        error: function(error){
            console.log(error);
        }
    });
}

//END SINGLE CHECKOUT JS
// // multiple_checkout.js

$('.multiple_checkout .form_mult_shipment .form-control').each(function(){
    $(this).on('blur', function(e){
        setTimeout(
            updateShipmentMultiple(),
            1000
        );
        e.preventDefault();
    });
});


if($('.multiple_checkout .form_mult_shipment .input_province_id')[0]){
    if($('.multiple_checkout .form_mult_shipment .input_province_id').val() != ''){
        let province_id=$('.multiple_checkout .form_mult_shipment .input_province_id').val();
        let this_url='../api/province';
    
        $('.multiple_checkout .select-province-val').hide();
        getCity(this_url, province_id);
    }
    else{
        $('.multiple_checkout  .select-province-val').show();
    }
}


// Jika province berubah
$('.multiple_checkout .form_mult_shipment .province_id').each(function(i){
    $('.multiple_checkout  .form_mult_shipment .province_id').on('change', function(){
        let province_id=$(this).val();
        let this_url='../api/province';

        if(province_id){
            let shipment_id=$('.multiple_shipment_id').val();
            let discount = $('.discount').val();
            if(discount == ''){
                discount = 0;
            }

            // $('.order-now-button').prop('disabled', true);

            $('.cost_shipment_text').html('<small>Unset</small>');
            $('.cost_total_text').html('Please wait...');
            $('.total_text').html('Please wait...');

            $('.multiple_checkout .province_id').val(province_id);
            $('.multiple_checkout .input_province_id').val(province_id);
            $('.multiple_checkout .input_city_id').val("");
            $('.multiple_checkout .input_subdistrict_id').val("");

            $('.multiple_checkout .form_mult_shipment .subdistrict_id').empty();	
            $('.multiple_checkout .form_mult_shipment .subdistrict_id').append('<option>Select Subdistrict</option>');

            $('.multiple_checkout .shipping_cost').val("");
            $('.multiple_checkout .shipping_services').val("");

            updateShipmentMultiple(); // panggil fungsi updateShipment yang ada di form_shipment.js
            if(shipment_id != ''){
                updateShipmentCost(shipment_id, '0', 'J&T Express');
            }
            getCity(this_url, province_id);
        }else{
            $('.multiple_checkout .city_id').append('<option>Select City</option>');
        }
    });
})

if($('.multiple_checkout .form_mult_shipment .input_city_id')[0]){
    if($('.multiple_checkout .form_mult_shipment .input_city_id').val() != ''){
        let city_id=$('.multiple_checkout .form_mult_shipment .input_city_id').val();
        let this_url='../api/city';

        $('.multiple_checkout .select-city-val').hide();
    
        getSubdistrict(this_url, city_id);
    }
}

// Jika City berubah
$('.multiple_checkout .form_mult_shipment .city_id').on('change', function(){
    let city_id=$(this).val();
    let this_url='../api/city';
    let order_id=$('.order_id').val();
    let discount=$('.discount').val();
    let shipment_id=$('.multiple_shipment_id').val();

    if(discount == ''){
         discount = 0;
    }

    if(city_id){
        $('.cost_shipment_text').html('<small>Unset</small>');
        $('.cost_total_text').html('Please wait...');
        $('.total_text').html('Please wait...');
        // $('.order-now-button').prop('disabled', true);

        $('.multiple_checkout .city_id').val(city_id);
        $('.multiple_checkout .input_city_id').val(city_id);
        $('.multiple_checkout .input_subdistrict_id').val("");
        $('.multiple_checkout .shipping_cost').val("");
        $('.multiple_checkout .shipping_services').val("");

        if(shipment_id==null || shipment_id==''){
            $.ajax({    
                url : '../api/shipment/'+order_id,  
                method: 'GET',  
                success: function(data){    
                    updateShipmentMultiple(); // panggil updateShipment yang ada di from_shipment.js

                    $('.multiple_shipment_id').val(data['results'].id); 
                    updateShipmentCost(data['results'].id, '0', 'J&T Express');
                }   
            });
        } else{
            updateShipmentMultiple(); 
            updateShipmentCost(shipment_id, '0', 'J&T Express');
        }

        getSubdistrict(this_url, city_id);
    }else{
        $('.multiple_checkout .subdistrict_id').append('<option>Select Subdistrict</option>');
    }
});

if($('.multiple_checkout  .form_mult_shipment .input_subdistrict_id').val() != ''){
    $('.multiple_checkout  .select-subdistrict-val').hide();
}

// Jika Subdistrict berubah
$('.multiple_checkout .form_mult_shipment .subdistrict_id').on('change', function(){
    let id=$('.multiple_checkout .multiple_shipment_id').val();
    let subdistrict_id=$(this).val();
    let discount=$('.discount').val();

    if(discount == ''){
        discount = 0;
    }

    if(subdistrict_id){
        // $('.order-now-button').prop('disabled', true);
        $('.multiple_checkout .subdistrict_id').empty();
        $('.multiple_checkout .subdistrict_id').append('<option selected>Please wait..</option>');
        $('.multiple_checkout .input_subdistrict_id').val(subdistrict_id);
        $('.multiple_checkout .shipping_cost').val("");
        $('.multiple_checkout .shipping_services').val("");
        $('.cost_shipment_text').html('Please wait...'); 
        $('.cost_total_text').html('Please wait...');
        $('.total_text').html('Please wait...');
        $('.cost').val(0); 
        $('.total').val(parseInt($('.subtotal').val()) - parseInt(discount));

        getOngkirMultiple(id, subdistrict_id);
        setTimeout(
            updateShipmentMultiple(),
            500
        )
    }
});


function validate(){
    let sender_name= $('.multiple_checkout .form_mult_shipment .sender_name').val();
    let sender_phone_number=$('.multiple_checkout .form_mult_shipment .sender_phone_number').val();

    let receiver_name= $('.multiple_checkout .form_mult_shipment .receiver_name').val();
    let phone_number=$('.multiple_checkout .form_mult_shipment .phone_number').val();
    let address=$('.multiple_checkout .form_mult_shipment .address').val();
    let province_id=$('.multiple_checkout .form_mult_shipment .input_province_id').val();
    let city_id=$('.multiple_checkout .form_mult_shipment .input_city_id').val();
    let subdistrict_id=$('.multiple_checkout .form_mult_shipment .input_subdistrict_id').val();
    let postal_code=$('.multiple_checkout .form_mult_shipment .postal_code').val();
    let notes=$('.multiple_checkout .form_mult_shipment .notes').val();


    if(receiver_name==null || receiver_name=='' || phone_number==null || phone_number =='' ||
        address==null || address==''|| postal_code==null || postal_code=='' ||
         province_id==null || province_id=='' || city_id==null || city_id=='' ||
         subdistrict_id==null || subdistrict_id =='' || 
         sender_name=='' || sender_name==null || sender_phone_number=='' || sender_phone_number==null){

        // window.alert("Please complete your shipment info!");
        Swal.fire(
          'Oops!',
          'Please complete your shipment info!',
          'warning'
        )
        return false;
    } else {
        $('#afterSubmit').show();
        $('#afterSubmit').addClass('modal-backdrop');
        $('#afterSubmit').addClass('fade');
        $('#afterSubmit').addClass('show');
    }
    return true;
}

// hide loader after submit 
if($('#afterSubmit')[0]){
    $('#afterSubmit').hide();
}

$('.form-checkout').on('submit', function(e){
    let order_id=$('.multiple_checkout .order_id').val();

    // validate();
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type        : 'POST',
        url         : '../../order/post/'+order_id,
        cache       : false,
        data        : $('.form-checkout').serialize(),
        dataType    : 'json',
        beforeSend  : function(){
                        $('#afterSubmit').show();
                        $('#afterSubmit').addClass('modal-backdrop');
                        $('#afterSubmit').addClass('fade');
                        $('#afterSubmit').addClass('show');
                      } 
    }).done(function(data) {
        if(data){
            window.location.href='../../final_checkout/'+data.results.custom_id;
        }
    }).fail(function(data) {
        //Server failed to respond - Show an error message
        window.location.reload();
        $('.multiple-checkout').append('<div class="alert alert-danger">Could not reach server, please try again later.</div>');
    });

    e.preventDefault();
});

$('.btn-submit').on('click', function(){
    $('.page').val($(this).attr('btn_submit'));
});


//submit form ketika klik radio button di multiple shipment
$('.multiple_form').on('submit', function(e){
    validate();
    var inputData={
        'order_id'      :$('.multiple_checkout .order_id').val(),
        'cart_id'       :$('.multiple_checkout .cart_id').val(),
        'sender_name'           :$('.multiple_checkout .form_mult_shipment .sender_name').val(),
        'sender_phone_number'   :$('.multiple_checkout .form_mult_shipment .sender_phone_number').val(),

        'receiver_name' :$('.multiple_checkout .form_mult_shipment .receiver_name').val(),
        'phone_number'  :$('.multiple_checkout .form_mult_shipment .phone_number').val(),
        'address'       :$('.multiple_checkout .form_mult_shipment .address').val(),
        'province_id'   :$('.multiple_checkout .form_mult_shipment .input_province_id').val(),
        'city_id'       :$('.multiple_checkout .form_mult_shipment .input_city_id').val(),
        'subdistrict_id':$('.multiple_checkout .form_mult_shipment .input_subdistrict_id').val(),
        'postal_code'   :$('.multiple_checkout .form_mult_shipment .postal_code').val(),
        'notes'         :$('.multiple_checkout .form_mult_shipment .notes').val(),
        'save_address_info' :$('.multiple_checkout input[type=checkbox]').val(),
    };

    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type        : 'POST',
        url         : '../multiple_shipment',
        data        : inputData,
        dataType    : 'json',
        // beforeSend  : function(){
        //                 $('#afterSubmit').show();
        //                 $('#afterSubmit').addClass('modal-backdrop');
        //                 $('#afterSubmit').addClass('fade');
        //                 $('#afterSubmit').addClass('show');
        //               } 
    }).done(function(data) {

        var page=$('.page').val();
        window.location.href='?page='+page;

    }).fail(function(data) {
        //Server failed to respond - Show an error message
        $('form').html('<div class="alert alert-danger">Could not reach server, please try again later.</div>');
    });

    e.preventDefault();
});

// // FUNCTION
function updateShipmentMultiple(){
    let id=$('.multiple_checkout .multiple_shipment_id').val();
    let order_id=$('.multiple_checkout .order_id').val();
    let cart_id=$('.multiple_checkout .multiple_cart_id').val();
    let customer_id=$('.multiple_checkout .form_mult_shipment .customer_id').val();
    let sender_name=$('.multiple_checkout .form_mult_shipment .sender_name').val();
    let sender_phone_number=$('.multiple_checkout .form_mult_shipment .sender_phone_number').val();

    let receiver_name=$('.multiple_checkout .form_mult_shipment .receiver_name').val();
    let phone_number=$('.multiple_checkout .form_mult_shipment .phone_number').val();
    let address=$('.multiple_checkout .form_mult_shipment .address').val();
    let province_id=$('.multiple_checkout .form_mult_shipment .input_province_id').val();
    let city_id=$('.multiple_checkout .form_mult_shipment .input_city_id').val();
    let subdistrict_id=$('.multiple_checkout .form_mult_shipment .input_subdistrict_id').val();
    let postal_code=$('.multiple_checkout .form_mult_shipment .postal_code').val();
    let notes=$('.multiple_checkout .form_mult_shipment .notes').val();
    
    let save_address_info=$('.multiple_checkout input[type=checkbox]').val();

    let modalSwitchtoSingle=$('#modalSwitchtoSingle');

    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: '../multiple_shipment',
        type: 'POST',
        data: {
            id : id,
            order_id: order_id,
            cart_id : cart_id,
            receiver_name : receiver_name,
            phone_number : phone_number,
            address : address,
            province_id : province_id,
            city_id : city_id,
            subdistrict_id : subdistrict_id,
            postal_code : postal_code,
            notes : notes,

            customer_id: customer_id,
            save_address_info : save_address_info,
            
            sender_name : sender_name,
            sender_phone_number : sender_phone_number
        },
        dataType: 'json',
        success: function(data){

            if(data['data']=='single'){
                // $('#modalSwitchtoSingle').modal('show');
                Swal.fire(
                    'Switch to Single Shipment',
                    "Looks like you want to send your order item to the same place. It takes some minutes, please wait..",
                    'warning'
                );
               
                setTimeout(
                    function(){
                        window.location.href='../../checkout/'+data['order_id']
                    },
                    5000
                );
            }
        },
        error: function(error){
            console.log(error);
        }
    })
}

//simpan alamat
$('.multiple_checkout input[type=checkbox]').on('click', function(){
    let cart_id=$('.multiple_checkout .cart_id').val();

    if($(this).prop('checked') == true){
        $('.multiple_checkout input[type=checkbox]').val('true');

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '../put_session_address/'+cart_id,
            type: 'POST',
            success: function(data){
                // console.log(data);
            },
            error: function(error){
                console.log(error);
            }
        })


    }else if($(this).prop('checked')==false){
        $('.multiple_checkout input[type=checkbox]').val('false');

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '../forget_session_address/'+cart_id,
            type: 'GET',
            success: function(data){
                // console.log(data);
            },
            error: function(error){
                console.log(error);
            }
        })
    }
})


// dev-winar

// canvas.js 

// function printText(canvas, size, font, text){
//     let context=canvas.getContext("2d");
//     // let maxWidth=canvas.width - 10;
//     // canvas.width  = 720;
//     // canvas.height = 720;
//     let lineHeight=50; //ukuran dalam px
//     let setRatio=1;

//     canvas.height=canvas.width * setRatio;
//     let x=canvas.width/2;
//     let y=canvas.height/2;

//     // context.clearRect(0, 0 , canvas.width, canvas.height);
//     context.font=size+"px "+font;
//     wrapText(context, text, x, y,  lineHeight);

//     // let dataURL=canvas.toDataURL('image2/png');
//     // img2.src=dataURL;
//     // img2.setAttribute('crossOrigin', 'anonymous');

//     // holder2.val(dataURL);
// }



function wrapText(context, text, x, y, lineHeight) {
    var words = text.split('\n');
    // var lineHeight=80;

    if(words.length <=1){
        context.textAlign="center";
        // context.fillText(text, x, y+(lineHeight/2));
        context.fillText(text, x, 205);
        // console.log("canvas text satu");
    }
    else if( words.length == 2 ){
        for(var n = 0; n < words.length; n++) {
            if(n<1){
                var height=lineHeight/3;
            }else{
                var height=0;
            }
    
            context.textAlign="center";
            context.fillText(words[n], x, y-height);
            y += lineHeight;
        }
    }
    else{ // untuk >=3
        for(var n = 0; n < words.length; n++) {
            context.textAlign="center";

            let yy=(400 - (lineHeight * words.length))/2;
            let yyy=yy+((n + (n/2)) * lineHeight);

            if(n<1){
                context.fillText(words[n], x, yy);
            }else{
                context.fillText(words[n], x, yyy);
                // y +=lineHeight;
            }
        }
    }
}


function wrapTextDesign(context, text, x, y, lineHeight) {
    var words = text.split('\n');
    // var lineHeight=80;

    if(words.length <=1){
        context.textAlign="center";
        context.fillText(text, x, 385, 390);
    }
    else if( words.length == 2 ){
        for(var n = 0; n < words.length; n++) {
            if(n<1){
                var height=lineHeight/3;
            }else{
                var height=0;
            }
    
            context.textAlign="center";
            context.fillText(words[n], x, y-height, 390);
            y += lineHeight;
        }
    }
    else{
        for(var n = 0; n < words.length; n++) {
            context.textAlign="center";

            let yy= 220 + ((300 - (lineHeight * words.length))/2);
            let yyy=yy+((n + (n/2)) * lineHeight);

            if(n<1){
                context.fillText(words[n], x,  yy, 390);
            }else{
                context.fillText(words[n], x, yyy, 390);
            }
        }
    }

}


// function printText(canvas, size, font, text){
//     let context=canvas.getContext("2d");
//     // let maxWidth=canvas.width - 10;
//     // canvas.width  = 720;
//     // canvas.height = 720;
//     let lineHeight=50; //ukuran dalam px
//     let setRatio=1;

//     canvas.height=canvas.width * setRatio;
//     let x=canvas.width/2;
//     let y=canvas.height/2;

//     // context.clearRect(0, 0 , canvas.width, canvas.height);
//     context.font=size+"px "+font;
//     wrapText(context, text, x, y,  lineHeight);

//     // let dataURL=canvas.toDataURL('image2/png');
//     // img2.src=dataURL;
//     // img2.setAttribute('crossOrigin', 'anonymous');

//     // holder2.val(dataURL);
// }
// interface_design.js 
    // function base_url() {
    //     var pathparts = location.pathname.split('/');
    //     if (location.host == 'localhost') {
    //         var url = location.origin+'/'+pathparts[1].trim('/')+'/'; 
    //     }else{
    //         var url = location.origin; 
    //     }
    //     return url;
    // }


    if($('#loader-char')[0]){
        $('#loader-char').hide();
    }

    // character
    function getMainCharacters(product_id){
        // let url = base_url()+'public/api/character_categories/'+product_id;
        let url = BASE_URL+'/api/character_categories/'+product_id;
        fetch(url).then(response => response.json())
            .then(function(data){
                data['results'].map(value => {
                    $('#design .list-characters').append('<option char_name="'+value.name+'" char_id="'+value.id+'" value="'+value.id+'" class="option">'+value.name+'</option>')
                });
            }).catch(function(e){
                    alert("Failed to retrieve data");
            });
    }

    function getAllCharacters(product_id){
        $('#loader-char').show();
        // let url = base_url()+'public/api/all_characters/'+product_id;
        let url = BASE_URL+'/api/all_characters/'+product_id;
        fetch(url).then(response => response.json())
            .then(function(data){
                $('.asset-title').empty();
                $('.asset-title').append("<p>New Characters</p>");
                $('.asset-design-img').empty();

                arrChar = data['results'];
                data['results'].map(value => {
                    $('#design .asset-design-img').append('<div class="col-4 col-md-4 col-lg-3 my-lg-2 p-0 p-sm-2">'+
                        '<a class="btn radius btn-char p-1 p-sm-2" character_id="'+value.id+'">'+
                        '<p>'+value.name+'</p>'+
                        // '<img src="../../../'+value.image+'" alt="" class="img-characters-small">'+
                        '<img src="'+BASE_URL+'/'+value.image+'" alt="" class="img-characters-small">'+
                        '</a>'+
                        '</div>');
                });

                disableImage();
                setTimeout(function(){  $('#loader-char').hide(); }, 1500);
            }).catch(function(e){
                    alert("Failed to retrieve data");
            });
    }

    function getCharacters(character_id){
        $('#loader-char').show();

        let character_name=$('.list-characters option:selected').attr('char_name');
        // let url = base_url()+'public/api/characters/'+character_id;
        let url = BASE_URL+'/api/characters/'+character_id;

        fetch(url).then(response => response.json())
            .then(function(data){
                $('.asset-title').empty();
                $('.asset-title').append('<p>'+character_name+'</p>');
                $('.asset-design-img').empty();

                arrChar = data['results'];
                data['results'].map(value => {
                    $('#design .asset-design-img').append('<div class="col-4 col-md-4 col-lg-3 col-lg-3 my-lg-2 p-0 p-sm-2">'+
                        '<a class="btn btn-char p-1 p-sm-2" character_id="'+value.id+'" name="btn-character">'+
                        // '<p>'+value.name+'</p><img src="../../../'+value.image+'" class="img-characters-small" alt="Image" img="'+value.image+'">'+
                        '<p>'+value.name+'</p><img src="'+BASE_URL+'/'+value.image+'" class="img-characters-small" alt="Image" img="'+value.image+'">'+
                        '</a>'+
                        '</div>');
                });

                disableImage();
                setTimeout(function(){  $('#loader-char').hide(); }, 1000);
            }).catch(function(e){
                    alert("Failed to retrieve data");
            });
    }

    // frame
    function getMainFrames(){
        // let url = base_url()+'public/api/frame_categories';
        let url = BASE_URL+'/api/frame_categories';
        fetch(url).then(response => response.json())
            .then(function(data){
                data['results'].map(value => {
                    $('.list-frames').append('<option frame_name="'+value.name+'" value="'+value.id+'" class="option">'+value.name+'</option>');
                });
            }).catch(function(e){
                    alert("Failed to retrieve data");
            });
    }

    //sementara tidak dipakai
    function getAllFrames(product_id){
        $('#loader-char').show();
        // let url = base_url()+'public/api/frames/'+product_id;
        let url = BASE_URL+'/api/frames/'+product_id;
        fetch(url).then(response => response.json())
            .then(function(data){
                $('.asset-title').empty();
                $('.asset-title').append("<p>All Frames</p>");
                $('.asset-design-img').empty();

                data['results'].map(value => {
                    $('#design .asset-design-img').append('<div class="col-4 col-md-4 col-lg-3 my-lg-2 p-sm-2 p-0">'+
                        '<a class="btn btn-char p-1 p-sm-2" frame_id="'+value.id+'" name="btn-frame" data-toggle="modal" data-target="#modalQuotes">'+
                        '<p>'+value.name+'</p><img src="'+BASE_URL+'/'+value.image+'" class="img-frame" alt="Image" img="'+value.image+'">'+
                        '</a>'+
                        '</div>');
                });
                disableImage();
                setTimeout(function(){  $('#loader-char').hide(); }, 1000);
            }).catch(function(e){
                    alert("Failed to retrieve data");
            });
    }

    if($('#loader-front')[0]){
        $('#loader-front').hide();
    }

    if($('#loader-front-second')[0]){
        $('#loader-front-second').hide();
    }

    // get mug
    function getFrontMugCharacter(character_id){
        $('#loader-front').show();
        $('#front-mug-plain').show();

        objIndex = arrChar.findIndex((obj => obj.id == character_id));
        // let url = base_url()+'public/api/character/'+character_id;
        // fetch(url).then(response => response.json())
        //     .then(function(data){
                // $('#front-mug-plain').attr('src', '../../../'+arrChar[objIndex].image1);
                // $('#front_frame_img').attr('src', '../../../'+arrChar[objIndex].image);
                
                 $('#front-mug-plain').attr('src', BASE_URL+'/'+arrChar[objIndex].image1);
                $('#front_frame_img').attr('src', BASE_URL+'/'+arrChar[objIndex].image);

                setTimeout(function(){
                    $('#front-mug-id').val(arrChar[objIndex].code)
                }, 500)

                setTimeout(function(){  
                    $('#loader-front').hide(); 
                }, 500);
            // }).catch(function(e){
            //         alert("Failed to retrieve data");
            // });
    }

    if($('#loader-back')[0]){
        $('#loader-back').hide();
    }

    if($('#loader-back-second')[0]){
        $('#loader-back-second').hide();
    }

    function getBackMugCharacter(character_id){
        $('#loader-back').show();

        // let url = base_url()+'public/api/character/'+character_id;
        let url = BASE_URL+'/api/character/'+character_id;
        fetch(url).then(response => response.json())
            .then(function(data){
                $('#back-mug-plain').attr('src', '../../../'+data.results.image2);
                $('#back_frame_img').attr('src', '../../../'+data.results.image);

                setTimeout(function(){
                    $('#back-mug-id').val(data['results']['code'])
                }, 500);

                setTimeout(function(){  
                    $('#loader-back').hide(); 
                }, 1000);
            }).catch(function(e){
                    alert("Failed to retrieve data");
            });
    }

    // get mug buat frame
    function getFrontMugFrame(frame_id){
        $('.front_design_type').val('frame');
        $('#loader-front').show();

        // let url = base_url()+'public/api/frame/'+frame_id;
        let url = BASE_URL+'/api/frame/'+frame_id;

        fetch(url).then(response => response.json())
            .then(function(data){
                $('#front-mug-plain').attr('src', '../../../'+data.results.image1);
                $('#front_frame_img').attr('src', '../../../'+data.results.image);

                setTimeout(function(){
                    $('#front-mug-id').val(data.results.code)
                }, 500);
                setTimeout(function(){  
                    $('#loader-front').hide(); 
                }, 1000);
            }).catch(function(e){
                    alert("Failed to retrieve data");
            });
    }

    function getBackMugFrame(frame_id){
        $('#loader-back').show();

        // let url = base_url()+'public/api/frame/'+frame_id;
        let url = BASE_URL+'/api/frame/'+frame_id;

        fetch(url).then(response => response.json())
            .then(function(data){
                $('#back-mug-plain').attr('src', '../../../'+data.results.image2);
                $('#back_frame_img').attr('src', '../../../'+data.results.image);
                
                setTimeout(function(){
                    $('#back-mug-id').val(data.results.code)
                }, 500)
                setTimeout(function(){  
                    $('#loader-back').hide(); 
                }, 1000);
            }).catch(function(e){
                    alert("Failed to retrieve data");
            });
    }

    // get mug blank (untuk tipe only text)
    function getFrontMugBlank(){
        $('.front_design_type').val('text');

        $('#front_frame_text').show();

        $('#front-mug-plain').attr('src', front_plain_mockup);
        $('#front_frame_img').attr('src', blank);
    }

    function getBackMugBlank(){
        $('.front_design_type').val('text');

        $('#back_frame_text').show();
        
        $('#back-mug-plain').attr('src', back_plain_mockup);
        $('#back_frame_img').attr('src', blank);
    }

    // get count of enter
    function getEntersCount(text) {
        let enters = text.split(/\r|\r\n|\n/);
        let count = enters.length;       
        return count;
    }

    // Atur depan belakang mug
    function designOnMug(){
        var front_canvas=document.getElementById('front_frame_canvas');
        var front_canvas_context=front_canvas.getContext('2d');
        var front_canvas_mug=document.getElementById('front_frame_text');
        let front_image=document.getElementById('front_frame_img');
        var front_holder=$('#front_get_canvas');

        let back_canvas=document.getElementById('back_frame_canvas');
        let back_canvas_context=back_canvas.getContext('2d');
        let back_canvas_mug=document.getElementById('back_frame_text');
        let back_image=document.getElementById('back_frame_img');
        var back_holder=$('#back_get_canvas');

        let fmug_image=document.getElementById('fmug_image');
        let fmug_holder=$('#fmug_get_canvas');
        let bmug_image=document.getElementById('bmug_image');
        let bmug_holder=$('#bmug_get_canvas');

        var f_design_type=$('.f_design_type');
        var b_design_type=$('.b_design_type');

        if($('.couple')[0]){
            var front_canvas2=document.getElementById('front_frame_canvas_second');
            var front_canvas_context2=front_canvas2.getContext('2d');
            var front_canvas_mug2=document.getElementById('front_frame_text_second');
            var front_image2=document.getElementById('front_frame_img_second');
            var front_holder2=$('#front_get_canvas_second');

            var back_canvas2=document.getElementById('back_frame_canvas_second');
            var back_canvas_context2=back_canvas2.getContext('2d');
            var back_canvas_mug2=document.getElementById('back_frame_text_second');
            var back_image2=document.getElementById('back_frame_img_second');
            var back_holder2=$('#back_get_canvas_second');

            var fmug_image2=document.getElementById('fmug_image_second');
            var fmug_holder2=$('#fmug_get_canvas_second');
            var bmug_image2=document.getElementById('bmug_image_second');
            var bmug_holder2=$('#bmug_get_canvas_second');

            var f_design_type2=$('.f_design_type_second');
            var b_design_type2=$('.b_design_type_second');

            var current_first=1;
            var current_second=1;
        }

        let font_type=$('.font_family').val();
        let font_size=$('.font_size').val();
        let size, canvas_size, font, lineHeight;

        let prevBtnFirst=$('.first-prev');
        let nextBtnFirst =$(".first-next");
        let prevBtnSec = $(".prev-1")
        let nextBtnSec = $(".next-1");
        let submitBtn = $("#next-to-finish");
        let progressCheck =$(".step .check");
        let bullet = $(".step .bullet");
        let max = 4;
        let current = 1;

        current += 1;

        if(current > 1){
            //jika step 1 di klik
            $('.step-0').on('click', function(){
                window.location.reload();

                current = 2;
            });
        }

        // jika couple mug
        if($('.couple')[0]){
            let nextBtnFirst2 = $(".first-next-second");
            let prevBtnSec2 = $(".prev-1-second");
            let scdMugBtn = $(".scd-mug-btn");
            let firstMugBtn = $(".first-mug-btn");

            nextBtnFirst2.on('click', function(){
                $('#front-mug-second').hide();
                $('#back-mug-second').show();
                current=5;
                current_second=2;
            });

            prevBtnSec2.on('click', function(){
                $('#back-mug-second').hide();
                $('#front-mug-second').show();
                current=4;
                current_second=1;
            });

            scdMugBtn.on('click', function(){
                $('#nav-second-tab').addClass('active');
                $('#nav-first-tab').removeClass('active');
                $('#nav-second').addClass('active');
                $('#nav-second').addClass('show');
                $('#nav-first').removeClass('active');
                $('#nav-first').removeClass('show');

                $('#title-side').html('Second Mug');
                $('#desc-side').html('(Mug Kedua)');

                current=4;
                current_second=1;

                bullet[1].classList.add("active");
                progressCheck[1].classList.add("active");
            });

            firstMugBtn.on('click', function(){
                $('#nav-first-tab').addClass('active');
                $('#nav-second-tab').removeClass('active');
                $('#nav-first').addClass('active');
                $('#nav-first').addClass('show');
                $('#nav-second').removeClass('active');
                $('#nav-second').removeClass('show');

                $('#title-side').html('First Mug');
                $('#desc-side').html('(Mug Pertama)');

                if(current_first==1){
                    current=2;
                } else{
                    current=3;
                }

                bullet[1].classList.remove("active");
                progressCheck[1].classList.remove("active");
            });

            $("#nav-second-tab").on('click', function(){
                $('#title-side').html('Second Mug');
                $('#desc-side').html('(Mug Kedua)');

                if(current_second==1){
                    current=4;
                } else{
                    current=5;
                }

                bullet[1].classList.add("active");
                progressCheck[1].classList.add("active");
            });

            $("#nav-first-tab").on('click', function(){
                $('#title-side').html('First Mug');
                $('#desc-side').html('(Mug Pertama)');

                if(current_first==1){
                    current=2;
                } else{
                    current=3;
                }

                bullet[1].classList.remove("active");
                progressCheck[1].classList.remove("active");
            });
        }

        $(document).on('click','a[character_id]',function(){
            let id=$(this).attr('character_id');
            let preview = '.frame-area';

            // scroll ke preview
            $('html, body').animate({
                scrollTop: $(preview).offset().top
            }, 1000, function(){
                window.location.hash = preview;
            });
            
            $('#btn-type-text').removeAttr('data-toggle','data-target');
            $('#btn-type-text').attr('data-toggle','modal');
            $('#btn-type-text').attr('data-target','#modal-warning');

            $('#quotes').val('');
            $('#quotes').empty();

            if(current==2){
                $('#front_get_canvas').val('');
                $('#front_get_canvas').empty();
                $('textarea#front_mug_text').val('');
                $('textarea#front_mug_text').empty();

                $('#front_frame_text').hide();
 
                f_design_type.val('char');

                clearCanvasText(front_canvas_mug, fmug_holder);

                getFrontMugCharacter(id);
            }else if(current==3){
                $('#back_get_canvas').empty();
                $('#back_get_canvas').val('');
                $('textarea#back_mug_text').val('');
                $('textarea#back_mug_text').empty();
   
                $('#back_frame_text').hide();
                b_design_type.val('char');

                clearCanvasText(back_canvas_mug, bmug_holder);

                getBackMugCharacter(id);
            }
        });

        $(document).on('click', 'a[frame_id]', function(){
            let id=$(this).attr('frame_id');
            let preview = '.frame-area';

            // scroll ke preview
            $('html, body').animate({
                scrollTop: $(preview).offset().top
            }, 1000, function(){
                window.location.hash = preview;
            });

            $('#btn-type-text').removeAttr('data-toggle','data-target');
            $('#btn-type-text').attr('data-toggle','modal');
            $('#btn-type-text').attr('data-target','#modalQuotes');
            if(current==2){
                $('#front_frame_text').show();

                f_design_type.val('frame');

                getFrontMugFrame(id);
                
            }else if(current==3){
                $('#back_frame_text').show();
                b_design_type.val('frame');

                getBackMugFrame(id);
            }
        });


        $('#front_frame_img').on('load',function(){
            let text=$('textarea#front_mug_text').val();
            let front_holder=$('#front_get_canvas');

            if(current == 2){
                if (f_design_type.val()=='char') {
                    setCanvasCharacter(front_canvas, front_canvas_context, front_image, front_holder);                    
                } else if(f_design_type.val()=='frame') {
                    setCanvasFrame(front_canvas, front_canvas_context, front_image, text, size, font, front_holder, lineHeight);                    
                }
            }
            return false;
        });

        $('#back_frame_img').on('load', function(){
            let text=$('textarea#back_mug_text').val();
            let back_holder=$('#back_get_canvas');

            if(current==3){
                if (b_design_type.val()=='char') {
                    setCanvasCharacter(back_canvas, back_canvas_context, back_image, back_holder);                    
                
                } else if(b_design_type.val()=='frame'){
                    setCanvasFrame(back_canvas, back_canvas_context, back_image, text, size, font, back_holder, lineHeight);                    
                }
            }

            return false;
        });

        if($('.couple')[0]){
            nextBtnFirst.on('click', function(){
                $('#front-mug').hide();
                $('#back-mug').show();

                nextBtnFirst.hide();
                prevBtnFirst.hide();
                nextBtnSec.show();
                prevBtnSec.show();

                current = 3;
                current_first=2;
            });

            nextBtnSec.on("click", function(){
                current += 1;
            });    
        } 
        // mug biasa bukan couple
        else{
            nextBtnFirst.on('click', function(){
                $('#title-side').html('Back Side');
                $('#desc-side').html('(Bagian belakang mug)');

                $('#nav-back-tab').addClass('active');
                $('#nav-front-tab').removeClass('active');
                $('#nav-back').addClass('active');
                $('#nav-back').addClass('show');
                $('#nav-front').removeClass('active');
                $('#nav-front').removeClass('show');

                $('#back-mug').show();

                current = 3;
                bullet[current - 2].classList.add("active");
                progressCheck[current - 2].classList.add("active");
            });

            nextBtnSec.on("click", function(){
                bullet[current - 1].classList.add("active");
                progressCheck[current - 1].classList.add("active");
                current += 1;
            }); 
        }
        

        submitBtn.on("click", function(){
            // if couple
            if($('.couple')[0]){
                let front_mug_id=$('input[name=front_mug_id]').val();
                let back_mug_id=$('input[name=back_mug_id]').val();
                let front_mug_id2=$('input[name=front_mug_id_second]').val();
                let back_mug_id2=$('input[name=back_mug_id_second]').val();

                if(front_mug_id=="" || back_mug_id=="" || front_mug_id2=="" || back_mug_id2==""){
                    $(this).attr('data-target', '#modalDesignValidation');
                }else{
                    $(this).attr('data-target', '#modalFinish');
                }
            } else{
                let front_mug_id=$('input[name=front_mug_id]').val();
                let back_mug_id=$('input[name=back_mug_id]').val();

                if(front_mug_id=="" || back_mug_id==""){
                    $(this).attr('data-target', '#modalDesignValidation');
                }else{
                    $(this).attr('data-target', '#modalFinish');
                }
            }
        });

        if($('.couple')[0]){
            prevBtnSec.on("click", function(){
                $('#back-mug').hide();
                $('#front-mug').show();
                prevBtnFirst.show();
                nextBtnFirst.show();

                current -= 1;
                current_first = 1;
            });
        }
        else{
            prevBtnSec.on("click", function(){
                $('#title-side').html('Front Side');
                $('#desc-side').html('(Bagian depan mug)');

                $('#nav-back-tab').removeClass('active');
                $('#nav-front-tab').addClass('active');
                $('#nav-back').removeClass('active');
                $('#nav-back').removeClass('show');
                $('#nav-front').addClass('active');
                $('#nav-front').addClass('show');

                $('#front-mug').show();

                current = 2;
                bullet[current - 1].classList.remove("active");
                progressCheck[current - 1].classList.remove("active");
            });
        }

        $('#quotes').on('change', function(){
            if(getEntersCount($(this).val())>3){
                Swal.fire(
                  'Ooops!',
                  'Maximum text is 3 lines',
                  'info'
                );
            }
        });

        $('#btn-get-quotes').on('click', function(){
            let choose=$('.list-choose').val();
            let get_quotes=$('#quotes').val();

            if(choose == 'text'){
                if(get_quotes == ''){
                    Swal.fire(
                      'Ooops!',
                      'Text field is required!',
                      'info'
                    );
                    return false;
                }
            }

            if(getEntersCount(get_quotes)>3){
                Swal.fire(
                  'Ooops!',
                  'Maximum text is 3 lines',
                  'info'
                );
                return false;
            }
            $('#btn-get-quotes').attr("data-dismiss", "modal");
            
            let font_type=$('.font_family').val();
            let font_size=$('.font_size').val();
            // let size, canvas_size;

            if(font_type=='' || font_type=='default'){
                $('#btn-get-quotes').attr("data-dismiss", false);
                Swal.fire(
                    'Ooops!',
                    'Please choose font style :)',
                    'info'
                );
                return false;
            } else{
                let id = font_type.slice(5)-1;
                font=fonts[id].font_name;
            }

            if(font_size=='' || font_size=='default'){
                $('#btn-get-quotes').attr("data-dismiss", false);
                Swal.fire(
                    'Ooops!',
                    "Please choose font size :)<br>You can adjust the font size so that your text doesn't get cut off in the frame",
                    'info'
                );
                return false;
            } 

            if(font_size=='default' && font_type=='default'){
                $('#btn-get-quotes').attr("data-dismiss", false);
                Swal.fire(
                    'Ooops!',
                    "Please choose font style and font size :)",
                    'info'
                );
                return false;
            } 

            // cek ukuran font untuk canvas
            if(font_size == 'font_smaller'){
                if(font_type=='font_1' || font_type=='font_10' || font_type=='font_12'
                  || font_type=='font_17'){
                    size=45;
                    canvas_size=52;
                }else if( font_type=='font_2' || font_type=='font_8' || font_type=="font_11" || font_type=='font_14' 
                    || font_type=='font_15' || font_type=='font_16' || font_type=='font_21' || font_type=='font_26' 
                    || font_type=='font_28' || font_type=='font_29'){
                    size=60;
                    canvas_size=75;  
                }else if(font_type=='font_3' || font_type=='font_4' || font_type=='font_5'
                        || font_type=='font_6'){
                    size=80;
                    canvas_size=100;
                }else if( font_type=='font_7'){
                    size=75;
                    canvas_size=95;
                }else{
                    size=45;
                    canvas_size=50;
                }

                lineHeight=45;
            }
            else if(font_size =='font_regular'){
                if(font_type=='font_1' || font_type=="font_10" || font_type=='font_12'
                    || font_type=='font_17'){
                    size=60;
                    canvas_size=80;
                }else if( font_type=='font_2' || font_type=='font_8' || font_type=='font_11' || font_type=='font_14' 
                    || font_type=='font_15' || font_type=='font_16' || font_type=='font_21' || font_type=='font_29' 
                    || font_type=='font_26' || font_type=='font_28' || font_type=='font_29'){
                    size=85;
                    canvas_size=110;
                }else if(font_type=='font_3' || font_type=='font_4' || font_type=='font_5'
                        || font_type=='font_6' || font_type=='font_7' 
                        ){
                    size=110;
                    canvas_size=140;
                }
                else if(font_type=='font_9' || font_type=='font_13'){
                    size=50;
                    canvas_size=70;
                }
                else{
                    size=60;
                    canvas_size=80;
                }

                lineHeight=60;
            }
            else{
                if(font_type=='font_1' || font_type=='font_8' || font_type=='font_10' || font_type=='font_12'
                     || font_type=='font_17'){
                    size=100;
                    canvas_size=120;
                }else if(font_type=='font_2' || font_type=='font_11' || font_type=='font_14' || font_type=='font_15' 
                    || font_type=='font_16' || font_type=='font_21' || font_type=='font_26' || font_type=='font_28'
                    || font_type=='font_29'){
                    size=150;
                    canvas_size=175;
                }else if(font_type=='font_3' || font_type=='font_4' || font_type=='font_5'
                        || font_type=='font_6'){
                    size=180;
                    canvas_size=200;
                }else if(font_type=='font_7' ){
                    size=170;
                    canvas_size=190;
                }
                else if(font_type=='font_9' || font_type=='font_13'){
                    size=90;
                    canvas_size=110;
                }else if(font_type=='font_20' || font_type=='font_22'|| font_type=='font_28' || font_type=='font_30'){
                    size=120;
                    canvas_size=130;
                }
                else{
                    size=100;
                    canvas_size=120;
                }
                lineHeight=70;
            }

            if(current==2){
                $('textarea#front_mug_text').val(get_quotes);
                canvasText(front_canvas_mug, canvas_size, font, get_quotes, fmug_image, fmug_holder, lineHeight);
                setCanvasFrame(front_canvas, front_canvas_context, front_image, get_quotes, size, font,  front_holder, lineHeight);

                $('input[name=front_font_fam]').val(font_type+' '+font_size);

                var f_design_type=$('.f_design_type'); // ini jgn dihapus, soalnya kalo ga didefinisi ulang ntar error
                if(choose=='text'){
                    f_design_type.val('text');
                    $('#f_design_type').val('text');
                    $('#front-mug-id').val('TO');

                    getFrontMugBlank();
                }
            }else if(current==3){
                $('textarea#back_mug_text').val(get_quotes);

                // printText(back_canvas_mug, size, font, get_quotes);
                canvasText(back_canvas_mug, canvas_size, font, get_quotes, bmug_image, bmug_holder, lineHeight);
                setCanvasFrame(back_canvas, back_canvas_context, back_image, get_quotes, size,font, back_holder, lineHeight);
                $('input[name=back_font_fam]').val(font_type+' '+font_size);

                var b_design_type=$('.b_design_type');
                if(choose=='text'){
                    b_design_type.val('text');
                    $('#b_design_type').val('text');
                    $('#back-mug-id').val('TO');

                    getBackMugBlank();
                }
            }else if(current==4){
                $('textarea#front_mug_text_second').val(get_quotes);
                canvasText(front_canvas_mug2, canvas_size, font, get_quotes, fmug_image2, fmug_holder2, lineHeight);
                setCanvasFrame(front_canvas2, front_canvas_context2, front_image2, get_quotes, size, font,  front_holder2, lineHeight);

                $('input[name=front_font_fam_second]').val(font_type+' '+font_size);

                var f_design_type2=$('.f_design_type_second'); // ini jgn dihapus, soalnya kalo ga didefinisi ulang ntar error
                f_design_type2.val('text');
                $('#f_design_type_second').val('text');
                $('#front-mug-id-second').val('TO');
            }else if(current==5){
                $('textarea#back_mug_text_second').val(get_quotes);

                // printText(back_canvas_mug, size, font, get_quotes);
                canvasText(back_canvas_mug2, canvas_size, font, get_quotes, bmug_image2, bmug_holder2, lineHeight);
                setCanvasFrame(back_canvas2, back_canvas_context2, back_image2, get_quotes, size,font, back_holder2, lineHeight);
                $('input[name=back_font_fam_second]').val(font_type+' '+font_size);

                var b_design_type2=$('.b_design_type_second');
                b_design_type2.val('text');
                $('#b_design_type_second').val('text');
                $('#back-mug-id-second').val('TO');
            }else{
                Swal.fire('Ooops, looks like something happened :(');
            }
        });
    }


    function setCanvasCharacter(canvas, context, img, holder){
        // load ke canvas untuk db
        canvas.width  = 250; 
        canvas.height = 250;
        canvas.style.width  = '400px';
        canvas.style.height = '400px';

        context.fillRect(0,0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        let dataURL=canvas.toDataURL('image/png');
        img.src=dataURL;
        img.setAttribute('crossOrigin', 'anonymous');

        holder.empty();
        holder.val(dataURL);
    }

    // canvas untuk jadi acuan print (gambar dibawah mug halaman preview)
    function setCanvasFrame(canvas, context, img, text, font_size, font_type, holder, lineHeight){
        // cek line breaks
        let line_breaks=text.split('\n');
        if( 3 < line_breaks.length < 5 ){
            font_size= 0.7 * font_size;
        }else if( 6 < line_breaks.length ){
            font_size= 0.5 * font_size;
        }

        // load ke canvas untuk db
        canvas.width  = 720;
        canvas.height = 720;
        canvas.style.width  = '400px';
        canvas.style.height = '400px';

        let x=canvas.width/2;
        let y=canvas.height/2;

        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        // context.clearRect((x-50)/2, (y+100)/2 , 400, 300);
        context.clearRect(150, 220, 420, 300);
        context.fillStyle='#FFFFFF';
        context.fillRect(150, 220, 420, 300);
        // context.fillRect((x-50)/2, (y+100)/2, 400, 300);
        context.fillStyle='#000000';
        context.font=font_size+"px "+font_type;
        wrapTextDesign(context, text, x, y, lineHeight);

        let dataURL=canvas.toDataURL('image/png',0.7);
        img.src=dataURL;
        img.setAttribute('crossOrigin', 'anonymous');

        holder.empty();
        holder.val(dataURL);
    }

    // canvas untuk tulisan saja (diatas mug)
    function canvasText(canvas, size, font, text,img2,  holder2, lineHeight){
        // cek line breaks
        let line_breaks=text.split('\n');
        if( 4 < line_breaks.length < 6 ){
            size= 0.7 * size;
        }else if( 5 < line_breaks.length < 8){
            size= 0.5 * size;
        }

        let context=canvas.getContext("2d");
        canvas.width  = 420;
        canvas.height = 400;
        // let lineHeight=70; //ukuran dalam px

        let x=canvas.width/2;
        let y=canvas.height/2;

        context.fillStyle='#000000';
        context.clearRect(0, 0 , canvas.width, canvas.height);
        context.font=size+"px "+font;
        wrapText(context, text, x, y,  lineHeight);

        let dataURL=canvas.toDataURL('image2/png');
        img2.src=dataURL;
        img2.setAttribute('crossOrigin', 'anonymous');

        holder2.val(dataURL);
    }

    function clearCanvasText(canvas, holder2){
        let context=canvas.getContext("2d");
        context.clearRect(0, 0 , canvas.width, canvas.height);

        holder2.empty();
    }


// interface_design_tumbler.js
    // var BASE_URL="http://127.0.0.1:8000";
    var sub_cat_id=$('.design-tumbler input[name=sub_category_id]').val();

    if($('#tumbler_canvas')[0]){
        var tumbler_canvas=document.getElementById('tumbler_canvas');
        var tumbler_canvas_context=tumbler_canvas.getContext('2d');
        var image=document.getElementById('tumbler_canvas_img');
        // var get_quotes_tumbler=$('#quotes_tumbler').val();

        getAllTumblerCharacters(product_id);
        getAllTumblerFrames(product_id);
        getMainTumblerFrames(product_id);    
        getMainTumblerCharacters(product_id);

        if(sub_cat_id=='Sport'){
            $('#tumbler_canvas_text').removeClass('tumbler-text-area');
            $('#tumbler_canvas_text').addClass('tumbler-sport-text-area');
        }
    }

    $('.design-tumbler .list-characters').on('change', function(){
        let main_character_id=$(this).val();

        if(main_character_id=='all'){
            getAllTumblerCharacters(product_id);
        }else{
            getTumblerCharacters(main_character_id);
        }
    });

    $('.list-tumbler-frames').on('change', function(){  
        let main_frame_id=$(this).val();

        if(main_frame_id=='all'){
            getAllTumblerFrames(product_id);
        }else{
            getTumblerFrames(main_frame_id);
        }
    });


    $('#tumbler_canvas_img').on('load', function(){
        let get_quotes_tumbler= $('#tumbler_text').val();
        let design_type=$('.tumbler-design-type').val();
        let canvas_tumbler_holder=$('#tumbler_canvas_holder');

        if(design_type=='tumb-char'){
            // untuk sub category sport
            if(sub_cat_id=='Sport'){
                setSportCharacterCanvas(tumbler_canvas, tumbler_canvas_context, image, canvas_tumbler_holder);
            }else if(sub_cat_id=='Cola' || sub_cat_id=='Coke'){
                setColaCharacterCanvas(tumbler_canvas, tumbler_canvas_context, image, canvas_tumbler_holder);
            }
            else{
                setWithoutMockupCharacterCanvas(tumbler_canvas, tumbler_canvas_context, image, canvas_tumbler_holder)
            }
        }else{
            if(sub_cat_id=='Sport'){
                setSportFrameCanvas(tumbler_canvas, tumbler_canvas_context, image, get_quotes_tumbler, canvas_tumbler_holder);
            }else if(sub_cat_id=='Cola' || sub_cat_id=='Coke'){
                setColaFrameCanvas(tumbler_canvas, tumbler_canvas_context, image, get_quotes_tumbler, canvas_tumbler_holder);
            }
            else{
                setWithoutMockupFrameCanvas(tumbler_canvas, tumbler_canvas_context, image, get_quotes_tumbler, canvas_tumbler_holder);
            }
        }
        // console.log('terosss');
        return false;
    });


    $(document).on('click','#design_tumbler a[character_id]',function(){
        let id=$(this).attr('character_id');
        let tumbler_canvas_text=document.getElementById('tumbler_canvas_text');
        let tumbler_canvas_text_holder=$('#tumbler_canvas_text_holder');

        // let preview = '.canvas';

        let preview = '#tumbler_page .card-body';
        // scroll ke preview
        $('html, body').animate({
            scrollTop: $(preview).offset().top
        }, 1000, function(){
            window.location.hash = preview;
        });

        $('.tumbler-design-type').val('tumb-char');

        $('#next-to-finish').removeAttr('data-toggle','data-target');
        $('#next-to-finish').attr('data-toggle','modal');
        $('#next-to-finish').attr('data-target','#modalFinishTumbler');

        $('#quotes_tumbler').val('');
        $('#quotes_tumbler').empty();
        $('#tumbler_text').val('');
        $('#tumbler_text').empty();

        $('#tumbler_canvas_text').hide(); 

        clearTumblerCanvasText(tumbler_canvas_text, tumbler_canvas_text_holder);
        getTumblerMockupCharacter(id);
    });

    $(document).on('click','#design_tumbler a[frame_id]',function(){
        let id=$(this).attr('frame_id');
        $('.tumbler-design-type').val('tumb-frame');

        if($('#tumbler_text').val()==''){
            $('#next-to-finish').removeAttr('data-toggle','data-target');
            $('#next-to-finish').attr('data-toggle','modal');
            $('#next-to-finish').attr('data-target','#modalWarningComplete');
        } else{
            $('#next-to-finish').removeAttr('data-toggle','data-target');
            $('#next-to-finish').attr('data-toggle','modal');
            $('#next-to-finish').attr('data-target','#modalFinishTumbler');
        }

        $('#tumbler_canvas_text').show();

        getTumblerMockupFrame(id);
    });

    $('#btn-get-quotes-tumbler').on('click', function(){
        if($('.list-choose-tumbler').val()=='frames'){
            if($('#tumbler_text').val()==''){
                $('#next-to-finish').removeAttr('data-toggle','data-target');
                $('#next-to-finish').attr('data-toggle','modal');
                $('#next-to-finish').attr('data-target','#modalWarningComplete');
            }
        }
    });

    $('#btn-get-quotes-tumbler').on('click', function(){
        let get_quotes_tumbler=$('#quotes_tumbler').val();

        if(get_quotes_tumbler == ''){
            Swal.fire(
                'Ooops!',
                'Text field is required!',
                'info'
            );
            return false;

            $('#next-to-finish').removeAttr('data-toggle','data-target');
            $('#next-to-finish').attr('data-toggle','modal');
            $('#next-to-finish').attr('data-target','#modalWarningComplete');
        } else{
            $('#next-to-finish').removeAttr('data-toggle','data-target');
            $('#next-to-finish').attr('data-toggle','modal');
            $('#next-to-finish').attr('data-target','#modalFinishTumbler');
        }

        $('#btn-get-quotes-tumbler').attr("data-dismiss", "modal");
        $('#tumbler_text').val(get_quotes_tumbler);
        
        let tumbler_canvas_text=document.getElementById('tumbler_canvas_text');
        let tumbler_image=document.getElementById('tumbler_image');
        let tumbler_canvas_text_holder=$('#tumbler_canvas_text_holder');

        let tumbler_canvas=document.getElementById('tumbler_canvas');
        let tumbler_canvas_context=tumbler_canvas.getContext('2d');
        let image=document.getElementById('tumbler_canvas_img');
        let canvas_holder=$('#tumbler_canvas_holder');

        if(sub_cat_id=='Sport'){
            setSportFrameCanvas(tumbler_canvas, tumbler_canvas_context, image, get_quotes_tumbler, canvas_holder);
            setTumblerCanvasText(tumbler_canvas_text, get_quotes_tumbler, tumbler_image, tumbler_canvas_text_holder);
        }else if(sub_cat_id=='Cola' || sub_cat_id=='Coke'){
            setColaFrameCanvas(tumbler_canvas, tumbler_canvas_context, image, get_quotes_tumbler, canvas_holder);
            setTumblerCanvasText(tumbler_canvas_text, get_quotes_tumbler, tumbler_image, tumbler_canvas_text_holder);
        }else{
            setWithoutMockupFrameCanvas(tumbler_canvas, tumbler_canvas_context, image, get_quotes_tumbler, canvas_holder);
        }
    });

    $('#btn-tumbler-finish-design').on('click', function(){
        let customer_id=$('input[name=customer_id]').val();
        // let theme_id=$('input[name=theme_id]').val();
        let product_id=$('input[name=product_id]').val();
        let design_tumbler_id=$('#design_tumbler_id').val();
        let tumbler_canvas=$('#tumbler_canvas_holder').val();
        let tumbler_text=$('#tumbler_text').val();
        let design_type=$('.tumbler-design-type').val();
        let tumbler_text_canvas;

        if(design_type=='tumb-frame'){
            tumbler_text_canvas=$('#tumbler_canvas_text_holder').val();
        }else{
            tumbler_text_canvas=null;
        }

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            // url:'../../'+theme_id+'/'+product_id+'/finish-design',
            url:'../finish-design/'+product_id,
            type: 'POST',
            data: {
                customer_id: customer_id,
                product_id: product_id,
    
                asset1_code: design_tumbler_id,
                text1 : tumbler_text,
                asset1_canvas: tumbler_canvas,
                text1_canvas : tumbler_text_canvas,
            },
            dataType: 'json',
            beforeSend: function(){
                $('#afterAgree').show();
                $('#afterAgree').addClass('modal-backdrop');
                $('#afterAgree').addClass('fade');
                $('#afterAgree').addClass('show');
            },
            success: function(data){
                // console.log(data);
                window.location.href='../../../final/'+data.results.code;
            },
            error: function(error){
                console.log(error);
            }
        });
    
    })


// Tumbler Character (Without Text)
function getMainTumblerCharacters(product_id){
    fetch(BASE_URL+'/api/character_categories/'+product_id)
    .then(function (response) {
        return response.json()
    })
    .then(data => {
        let optionValue = '';
        const results = data['results'];
        const selectCharacter= document.querySelector('#select-character-categories');

        results.forEach(function(item, index){
            optionValue +=`
            <option char_name="${item.name}" value="${item.id}" char_id="${item.id}" class="option">${item.name}</option>
            `;
        })

        selectCharacter.innerHTML=selectCharacter.innerHTML + optionValue;
    })
    .catch(function (err) {
        window.alert(`Ups, ${err} :(`)
    })
}

function getAllTumblerCharacters(product_id){    
    fetch(BASE_URL+'/api/new_characters/'+product_id)
        .then(function (response) {
            return response.json()
        })
        .then(response => {
            let gridDesign = '';
            const results = response['results'];
            const grid_all_characters= document.querySelector('#grid-sub-all-characters');
            const title = document.getElementById('asset-title');

            results.forEach(function(item, index){
                gridDesign +=`
                <div class="col-6 col-md-4 my-lg-2 p-0 p-sm-2">
                    <a class="btn radius btn-char p-1 p-sm-2" character_id="${item.id}">
                        <p>${item.name}</p>
                        <img src="../../../${item.image}" alt="" class="img-characters-small">
                    </a>
                </div>`;
            })

            title.innerText="New Characters";
            grid_all_characters.innerHTML=gridDesign;

            disableImage();
        })
        .catch(function (err) {
            window.alert(`Ups, ${err} :(`)
        })

}

function getTumblerCharacters(character_id){
    let character=document.getElementsByClassName('list-characters')[0];
    let char_name = character.options[character.selectedIndex].getAttribute('char_name');

    // console.log(char_name);
    fetch(BASE_URL+'/api/characters/'+character_id)
    .then(function(response){
        return response.json()
    })
    .then( data =>{
        let gridDesign = '';
        const results = data['results'];
        const grid_all_characters= document.querySelector('#grid-sub-all-characters');
        const title = document.getElementById('asset-title');
        
        results.forEach(function(item, index){
            gridDesign +=`
                <div class="col-4 col-md-4 col-lg-4 my-lg-2 p-0 p-sm-2">
                    <a class="btn btn-char p-1 p-sm-2" character_id="${item.id}" name="btn-character">
                        <p>${item.name}</p><img src="../../../${item.image}" class="img-characters-small" alt="Image" img="${item.image}">
                    </a>
                </div>
            `;
        })

        title.innerText=char_name;
        grid_all_characters.innerHTML=gridDesign;

        disableImage();
    })
    .catch(function (err){
        window.alert(`Ups, ${err} :(`)
    })
}


// Tumbler Character with Text (Frame)
function getMainTumblerFrames(product_id){
    fetch(BASE_URL+'/api/frame_categories/'+product_id)
    .then(function (response) {
        return response.json()
    })
    .then(data => {
        let optionValue = '';
        const results = data['results'];
        const selectFrames= document.querySelector('#select-frame-categories');

        results.forEach(function(item, index){
            optionValue +=`
            <option frame_name="${item.name}" value="${item.id}" class="option">${item.name}</option>
            `;
        })

        selectFrames.innerHTML=selectFrames.innerHTML + optionValue;
    })
    .catch(function (err) {
        window.alert(`Ups, ${err} :(`)
    })
}

function getAllTumblerFrames(product_id){
    fetch(BASE_URL+'/api/new_tumbler_frames/'+product_id)
    .then(function (response) {
        return response.json()
    })
    .then(data => {
        let gridDesign = '';
        const results = data['results'];
        const grid_all_frames= document.querySelector('#grid-sub-all-characters');
        results.forEach(function(item, index){
            gridDesign +=`
                <div class="col-6 col-md-4 my-lg-2 p-0 p-sm-2">
                    <a class="btn radius btn-char p-1 p-sm-2" data-toggle="modal" data-target="#modalQuotesTumbler" frame_id="${item.id}'">
                        <p>${item.name}</p>
                        <img src="../../../${item.image}" alt="" class="img-characters-small">
                    </a>
                </div>
            `;
        })
        grid_all_frames.innerHTML=gridDesign;

        disableImage();
    })
    .catch(function (err) {
        window.alert(`Ups, ${err} :(`)
    })
}

function getTumblerFrames(frame_id){
    fetch(BASE_URL+'/api/tumbler_frames/'+frame_id)
    .then(function(response){
        return response.json()
    })
    .then( data =>{
        let gridDesign = '';
        const results = data['results'];
        const grid_all_characters= document.querySelector('#grid-sub-all-characters');
        
        results.forEach(function(item, index){
            gridDesign +=`
                <div class="col-6 col-md-4 my-lg-2 p-sm-2 p-0">
                    <a class="btn btn-char p-1 p-sm-2" data-toggle="modal" data-target="#modalQuotesTumbler" frame_id="${item.id}" name="btn-frame">
                        <p>${item.name}</p><img src="../../../${item.image}" class="img-frame" alt="Image" img="${item.image}">
                    </a>
                </div>
            `;
        })

        grid_all_characters.innerHTML=gridDesign;

        disableImage();
    })
    .catch(function (err){
        window.alert(`Ups, ${err} :(`)
    })
}

// get tumbler Mocup
function getTumblerMockupCharacter(character_id){
    fetch(BASE_URL+'/api/character/'+character_id)
    .then(function(response){
        return response.json()
    })
    .then( data =>{
        const result = data['results'];
        const design_tumbler_id = document.getElementById('design_tumbler_id');
        const tumbler_plain = document.getElementById('tumbler_plain');
        const tumbler_image = document.getElementById('tumbler_image');
        const tumbler_canvas_img = document.getElementById('tumbler_canvas_img');

        design_tumbler_id.value = result.code;
        tumbler_image.setAttribute('src', BASE_URL+'/'+result.image);
        tumbler_canvas_img.setAttribute('src', BASE_URL+'/'+result.image);

        if(sub_cat_id=='Sport' || sub_cat_id=='Cola' || sub_cat_id=='Coke'){
            tumbler_plain.setAttribute('src', BASE_URL+'/'+result.image1);
        }else{
            tumbler_plain.setAttribute('src', BASE_URL+'/'+result.image);

        }
    })
    .catch(function (err){
        window.alert(`Ups, ${err} :(`)
    })
}

function getTumblerMockupFrame(frame_id){
    fetch(BASE_URL+'/api/frame/'+frame_id)
    .then(function(response){
        return response.json()
    })
    .then( data =>{
        const result = data['results'];
        const design_tumbler_id = document.getElementById('design_tumbler_id');
        const tumbler_plain = document.getElementById('tumbler_plain');
        const tumbler_image = document.getElementById('tumbler_image');
        const tumbler_canvas_img = document.getElementById('tumbler_canvas_img');

        design_tumbler_id.value = result.code;
        tumbler_image.setAttribute('src', BASE_URL+'/'+result.image);
        tumbler_canvas_img.setAttribute('src', BASE_URL+'/'+result.image);

        if(sub_cat_id=='Sport' || sub_cat_id=='Cola' || sub_cat_id=='Coke'){
            tumbler_plain.setAttribute('src', BASE_URL+'/'+result.image1);
        }else{
            tumbler_plain.setAttribute('src', BASE_URL+'/'+result.image);
        }

    })
    .catch(function (err){
        window.alert(`Ups, ${err} :(`)
    })
}

// Tumbler Canvas
function setTumblerCanvasText(canvas, text, img, holder){
    canvas.width=550;
    canvas.height=250;
    
    let context=canvas.getContext("2d");
    let x=canvas.width/2;
    let y=canvas.height/2;
    let xmax=550; // batas tulisan horizontal

    context.clearRect(0, 0 , canvas.width, canvas.height);
    context.font="65px Montserrat";
    context.textAlign="center";
    context.fillStyle='#000000';
    context.fillText(text, x, y, xmax);
    // printColorText(canvas, context, text, y, xmax, font_size);

    let dataURL=canvas.toDataURL('image/png');
    img.src=dataURL;
    img.setAttribute('crossOrigin', 'anonymous');

    holder.empty();
    holder.val(dataURL);
}


//set frame or character with text 
function setColaFrameCanvas(canvas, context, img, text, holder){
    canvas.width  = 720;
    canvas.height = 310;
    canvas.style.width  = '720px';
    canvas.style.height = '310px';

    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    context.clearRect(270, 275, 190, 40);
    context.fillStyle = '#FFFFFF';
    context.fillRect(270, 275, 190, 40);

    //atur y height
    let x=(canvas.width/2) + 8;
    let y=300;
    // let xmax=canvas.width; //batas tulisan horizontal
    let xmax=280;

    context.font="25px Montserrat";
    context.textAlign="center";
    context.fillStyle='#000000';
    context.fillText(text, x, y, xmax);
    // printColorText(canvas, context, text, y, xmax, font_size);

    let dataURL=canvas.toDataURL('image/png');
    img.src=dataURL;
    img.setAttribute('crossOrigin', 'nonymous');

    // holder.empty();
    holder.val(dataURL);
}

function setSportFrameCanvas(canvas, context, img, text, holder){
    canvas.width  = 720;
    canvas.height = 450;
    canvas.style.width  = '720px';
    canvas.style.height = '450px';

    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    context.clearRect(255, 343, 210, 35);
    context.fillStyle = '#FFFFFF';
    context.fillRect(255, 343, 210, 35);

    //atur y height
    let x=canvas.width/2;
    let y=370;
    let xmax=280;

    context.font="23px Montserrat";
    context.textAlign="center";
    context.fillStyle='#000000';
    context.fillText(text, x, y, xmax);
    // printColorText(canvas, context, text, y, xmax, font_size);

    let dataURL=canvas.toDataURL('image/png');
    img.src=dataURL;
    img.setAttribute('crossOrigin', 'nonymous');

    holder.empty();
    holder.val(dataURL);
}

function setWithoutMockupFrameCanvas(canvas, context, img, text, holder){
    canvas.width  = 720;
    canvas.height = 450;
    canvas.style.width  = '720px';
    canvas.style.height = '450px';

    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    context.clearRect(255, 343, 210, 35);
    context.fillStyle = '#FFFFFF';
    context.fillRect(255, 343, 210, 35);

    //atur y height
    let x=canvas.width/2;
    let y=370;
    let xmax=280;

    context.font="23px Montserrat";
    context.textAlign="center";
    context.fillStyle='#000000';
    context.fillText(text, x, y, xmax);
    // printColorText(canvas, context, text, y, xmax, font_size);

    let dataURL=canvas.toDataURL('image/png');
    img.src=dataURL;
    img.setAttribute('crossOrigin', 'nonymous');

    $('#tumbler_plain').attr('src', dataURL);
    $('.unavailable-mockup-info').removeClass('hide');
    $('.unavailable-mockup-info').addClass('show');

    holder.empty();
    holder.val(dataURL);
}

//set character
function setColaCharacterCanvas(canvas, context, img, holder){
    // load ke canvas untuk db
    canvas.width  = 720;
    canvas.height = 310;
    canvas.style.width  = '720px';
    canvas.style.height = '310px';

    context.fillRect(0,0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    let dataURL2=canvas.toDataURL('image/png');
    img.src=dataURL2;
    img.setAttribute('crossOrigin', 'anonymous');

    holder.empty();
    holder.val(dataURL2);
}

function setSportCharacterCanvas(canvas, context, img, holder){
    // load ke canvas untuk db
    canvas.width  = 720;
    canvas.height = 450;
    canvas.style.width  = '720px';
    canvas.style.height = '450px';

    context.fillRect(0,0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    let dataURL2=canvas.toDataURL('image/png');
    img.src=dataURL2;
    img.setAttribute('crossOrigin', 'anonymous');

    holder.empty();
    holder.val(dataURL2);
}

//tumbler kiko, keiko, cala
function setWithoutMockupCharacterCanvas(canvas, context, img, holder){
    // load ke canvas untuk db
    canvas.width  = 720;
    canvas.height = 450;
    canvas.style.width  = '720px';
    canvas.style.height = '450px';

    context.fillRect(0,0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    let dataURL2=canvas.toDataURL('image/png');
    img.src=dataURL2;
    img.setAttribute('crossOrigin', 'anonymous');

    holder.empty();
    holder.val(dataURL2);

    $('#tumbler_plain').attr('src', dataURL2);
    $('.unavailable-mockup-info').removeClass('hide');
    $('.unavailable-mockup-info').addClass('show');
}

function clearTumblerCanvasText(canvas, holder){
    let context=canvas.getContext("2d");
    context.clearRect(0, 0 , canvas.width, canvas.height);

    holder.empty();
}

// Text on Canvas jangan dihapus 
// function printColorText(canvas, context, text, y, xmax, font_size){
//     let letters=text.split("");
//     var jml_jeda=0;

//     // hitung jumlah m dan w
//     for(n=0; n<letters.length; n++){
//         if(letters[n] == 'M' || letters[n]=='m' || letters[n]=='W' || letters[n]=='w'){
//             var jml=1;
//         }else{
//             var jml=0;
//         }
//         jml_jeda+=jml;
//     }

//     jml_jeda=jml_jeda;

//     // console.log("jeda"+jml_jeda);
//     setTimeout(
//         colorText(canvas, context, text, y, xmax, jml_jeda, font_size),
//         1000
//     )
// }

// function colorText(canvas, context, text, y, xmax, jml_jeda, font_size){
//     //let letters=text.split("");
//     // var xtamb=0;

//     let x=canvas.width/2;

//     context.font=font_size+"px Montserrat";
//     context.textAlign="center";
//     context.fillStyle='#000000';
//     context.fillText(text, x, y, xmax);

//     // // untuk warna warni per huruf
//     // for(var n=0; n<letters.length; n++){
//         // if(n == 0 || n==5 || n==10){
//         //     context.fillStyle='#FF0000';
//         //     //console.log("merah"+letters[n]);
//         // }else if(n ==1 || n==6){
//         //     context.fillStyle='#FFA500';
//         //     //console.log("jingga"+letters[n]);
//         // }else if(n==2 || n==7){
//         //     context.fillStyle='#FF00FF';
//         //     //console.log("fuchsia"+letters[n]);
//         // }else if(n==3 || n==8){
//         //     context.fillStyle='#00FF00';
//         //     //console.log("hijau"+letters[n]);
//         // }else if(n==4 || n==9){
//         //     context.fillStyle='#0000FF';
//         //     //console.log("biru"+letters[n]);
//         // }

//         // context.font=font_size+"px Montserrat";
//         // context.textAlign="center";

//         // if((letters[n-1] == 'M' || letters[n-1]=='m' || letters[n-1]=='W' || letters[n-1]=='w') && n!=0){
//         //     xtamb +=10;
//         // }else if((letters[n] == 'M' || letters[n]=='m' || letters[n]=='W' || letters[n]=='w') && n==0){
//         //     xtamb -=12/2;
//         // }else if((letters[n] == 'M' || letters[n]=='m' || letters[n]=='W' || letters[n]=='w') && n!=0){
//         //     xtamb +=10;
//         // }else{
//         //     xtamb +=0;
//         // }

//         // var text_width=(letters.length * 35) + (jml_jeda * 15);
//         // // var x=(canvas.width/2) - (letters.length * 35/2) +(n * 35) + xtamb;
//         // var x=(canvas.width/2) - (text_width/2) +(n * 35) + xtamb;

//     //     let x=canvas.width/2;
//     //     context.fillStyle='#000000';
//     //     context.fillText(letters[n], x, y, xmax);
//     // }
// }


// timeline_order.js

let order_status=$('input[name=order_status]').val();

// let order_status='ready';
let circle='../../assets/icon/circle.svg';
let n=1;

if(order_status=='ready'){
    n=2;
}else if(order_status=='packing'){
    n=3;
}else if(order_status=='delivering' || order_status=='waiting'){
    n=4;
}else{ //paid
    n=1;
}

for(i=1; i<=n; i++ ){
    $('.circle-'+i).attr('src', '../assets/icon/circle.svg');
    $('.line-'+i).removeClass('bg-line-secondary');
    $('.line-'+i).addClass('bg-line');
    $('.text-'+i).removeClass('text-lightgrey');
}



// untuk bagian tracking order
$('.track-order').addClass('hide');
$('.btn-track-order').each(function(i){
    $('.btn-track-order').eq(i).on('click', function(e){
        e.preventDefault();
    
        let waybill=$(this).attr('waybill');
        // console.log("btn track order ditekan");
        // console.log("waybill "+waybill);
        // $('.track-order').empty();
        trackOrder(waybill);
    });
})



function trackOrder(waybill){
    let courier='jnt';

    $.ajax({
        // url: '{{ url("api/waybill")}}',
        url: '../api/waybill',
        type: 'POST',
        dataType: 'json',
        data:{
            waybill: waybill,
            courier: courier
        },
        success: function(data){
            $('.order-track').empty();
            $.each(data.manifest, function(key,value){
                $('.order-track').append('<div class="card border-bottom mx-3 py-2 my-2">'+
                        '<p class="text-center">'+value.manifest_date+' '+value.manifest_time+'</p>'+
                        '<p class="text-center">'+value.manifest_description+' '+value.city_name+'</p>'+
                    '</div>'+
                    '<div class="row m-0 p-0"><div class="col-6 border-right m-0 p-0"></div></div>');
            });

            $('.track-order').toggle();
            $('html, body').animate({
                scrollTop: $(".track-order").offset().top },
            'slow');
        }
    });
}

// Order Received untuk multiple shipment
$('.btn_finish_item').each(function(i){
    $('.btn_finish_item').eq(i).on('click', function(e){
        e.preventDefault();

        let shipment_id=$(this).val();
        let detail_order_id=$(this).attr('order_id');

        $('.modalReceivedOrderMultiple #btn-sure-multiple').removeAttr('href');
        $('.modalReceivedOrderMultiple #btn-sure-multiple').attr('href', '../order/item_received/'+detail_order_id+'/'+shipment_id);
        // $('.modalReceivedOrderMultiple .modal-footer').append('<a href="../order/item_received/'+detail_order_id+'/'+shipment_id+'" class="btn btn-sm btn-primer">I\'m Sure</a>');
    })
});

// start of multiple shipment yang baru
$('.multiple-checkout-new .select-product-shipment').on('change', function(){
    let cart_id = $(this).val();
    let weight = $('.multiple-checkout-new .select-product-shipment option:selected').attr('total_weight');

    $('.multiple-checkout-new .input_cart_id').val(cart_id);
    $('.multiple-checkout-new .weight').val(weight);

});

// BILA DROPDOWN ALAMAT BERUBAH
//province
$('.multiple-checkout-new .province_id').on('change', function(){
    let province_id=$(this).val();
    let this_url='../api/province';

    getCity(this_url, province_id);
    $('.multiple-checkout-new .input_province_id').val(province_id);
});

//city
$('.multiple-checkout-new .city_id').on('change', function(){
    let city_id=$(this).val();
    let this_url='../api/city';

    getSubdistrict(this_url, city_id);
    $('.multiple-checkout-new .input_city_id').val(city_id);
});

//subdistrict
$('.multiple-checkout-new .subdistrict_id').on('change', function(){
    let subdistrict_id=$(this).val();

    $('.multiple-checkout-new .input_subdistrict_id').val(subdistrict_id);
});

// SETTING DROPDOWN ALAMAT
$('.btn-edit-shipment').each(function(i){
    $(this).on('click', function(){
        let province_id=$('.multiple-checkout-new .input_province_id').eq(i+1).val();
        let city_url='../api/province';
        let city_id=$('.input_city_id').eq(i+1).val();
        let subdistrict_url='../api/city';
        let subdistrict_id=$('.input_subdistrict_id').eq(i+1).val();

        getCity(city_url, province_id);
        setTimeout(function(){
            $('.city_id').eq(i+1).val(city_id);
        }, 3000);

        if(city_id !=null && city_id != ''){
            getSubdistrict(subdistrict_url, city_id);
            setTimeout(function(){
                $('.subdistrict_id').eq(i+1).val(subdistrict_id);
            }, 3000);
        } else{
            console.log('empty')
        }
    });
});

// choose address multiple shipment
// Jika button pilih alamat di klik
$('.multiple-checkout-new .btnChooseAddress').each(function(i){
    $(this).on('click', function(e){
        e.preventDefault();
        
        let address_id=$('.multiple-checkout-new .modalChooseAddress .address_id').eq(i).val();

        chooseMultipleAddress(address_id);

    });
});

//checkout
$('.multiple-checkout-new .single_form').on('submit', function(e){
    let order_id=$('.multiple_shipment_order_id').val();

    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type        : 'POST',
        url         : '../order/post/'+order_id,
        cache       : false,
        data        : $('.multiple-checkout-new .single_form').serialize(),
        dataType    : 'json',
        beforeSend  : function(){
                        $('#afterSubmit').show();
                        $('#afterSubmit').addClass('modal-backdrop');
                        $('#afterSubmit').addClass('fade');
                        $('#afterSubmit').addClass('show');
                      } 
    }).done(function(data) {
        // console.log(data);
        if(data['api_message']=='success'){
            window.location.href='../final_checkout/'+data.results.custom_id;
        }
        else{
            if(data.results.status == 'unpaid'){
                window.location.href='../final_checkout/'+data.results.custom_id;
            }
            else{
                window.location.href='../unavailable/order/'+data.custom_id;
            }
        }
    }).fail(function(data) {
        //Server failed to respond - Show an error message
        // console.log(data.responseText);
        window.alert('Could not reach server. Refresh the page or try again later.');
        // $('form').html('<div class="alert alert-danger">Could not reach server, please try again later.</div>');
    });

    e.preventDefault();
})
// //Global site tag (gtag.js) - Google Analytics 
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-EWXYYSL83C"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'G-EWXYYSL83C');
// </script>