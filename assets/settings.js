/**
 * Created by Mato on 14. 2. 2016.
 */
$(document).ready(function () {

    //chrome.storage.sync.clear();

    var unitRatio = {
        'kgTopound': 2.20462,
        'poundTokg': 0.453592,
        'mileTokm': 1.60934,
        'kmTomile': 0.621371
    }


    $(document).on('keyup change', '.toolTextInput', function () {

        var nextTextInput = $(this)
            .closest('.unitBox')
            .siblings('.unitBox')
            .find('.toolTextInput');

        var exchangeName = $(this).attr('name') + 'To' + $(nextTextInput).attr('name');

        $(nextTextInput).val(precise_round($(this).val() * unitRatio[exchangeName], 3));

    });

    $('.exchangeIcon').on('click', function () {

        var unitBox1 = $(this).prev('.unitBox').clone();
        var unitBox2 = $(this).next('.unitBox').clone();

        $(this).prev('.unitBox').replaceWith(unitBox2);
        $(this).next('.unitBox').replaceWith(unitBox1);

    });


    chrome.storage.sync.get('activeTab', function (items) {

        $('#' + items.activeTab).prop('checked', true);

        $('.radioBox label[for="' + items.activeTab + '"]')
            .addClass('selected')
            .siblings()
            .removeClass('selected');

        $('#' + items.activeTab + 'Box')
            .show()
            .siblings()
            .hide();
    });

    $(".radioUiBtn").click(function () {

        $(this).closest('.radioBox').find('.radioUiBtn').removeClass('selected');
        $(this).addClass('selected');

        var activeTab = $(this).data('tabvalue');

        $('#' + activeTab + 'Box').show(100).siblings().hide(100);

        chrome.storage.sync.set({'activeTab': activeTab});

    });

});

function precise_round(num, decimals) {
    var t = Math.pow(10, decimals);
    return (Math.round((num * t) + (decimals > 0 ? 1 : 0) * (Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals);
}

