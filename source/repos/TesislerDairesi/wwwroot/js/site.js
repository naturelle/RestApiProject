﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(function () {

    console.log("page is ready");

    $(".customerRadio").change(function () {
        console.log("Radio button changed");
        doCustomerUpdate();
    });

    function doCustomerUpdate() {
        $.ajax({
            type: "POST",
            url: 'Customer/ShowOnePerson',
            data: $("form").serialize(),
            success: function (data) {
                console.log(data);
                $("#customerInformationArea").html(data);
            }
        });
    };


    $("#selectCustomer").click(function () {
        event.preventDefault();
        console.log("select button was clicked");
    })

    $(document).on("click", ".edit-product-button", function () {
        console.log("You clicked button number" + $(this).val());

        var productID = $(this).val();

        $.ajax({
            type: 'json',
            data: {
                "id": productID
            },
            url: '/product/ShowDetailsJSON',
            success: function (data) {
                console.log(data)

                //fill the input
                $("#modal-input-id").val(data.id);
                $("#modal-input-name").val(data.name);
                $("#modal-input-price").val(data.price);
                $("#modal-input-description").val(data.description);

            }

        })
    });

    $("#save-button").click(function () {

        //get the values from input values and create a json object
        var Product = {
            "Id": $("#modal-input-id").val(),
            "Name": $("#modal-input-name").val(),
            "Price": $("#modal-input-price").val(),
            "Description": $("#modal-input-description").val(),
        };

        console.log("saved");

        $.ajax({
            type: 'json',
            data: Product,
            url: '/product/ProcessEditReturnPartial',
            success: function (data) {
                console.log(data);
                $("#card-number-" + Product.Id).html(data).hide().fadeIn(2000);
            }
        })
    })
});