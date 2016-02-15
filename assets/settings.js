/**
 * Created by Mato on 14. 2. 2016.
 */
$(document).ready(function () {

    //chrome.storage.sync.clear();

	var googleTranslateUrl = 'https://translate.google.com';

    var unitRatio = {
		
        'kgTopound': 2.20462,
        'poundTokg': 0.453592,
		
		'kmTomile': 0.621371,
        'mileTokm': 1.60934,
      
    }
	
	var currencyRatio = {	
		
		'euroTopound'	: 0.77,
		'poundToeuro'	: 1.29,
	
		'euroTockoruna'	: 27.04,
		'ckorunaToeuro'	: 0.04,
		
		'euroTozloty'	: 4.39,
		'zlotyToeuro'	: 0.23
	
	}
	
	/* Count ratio - Unit And Currency Conventor */
    $(document).on('keyup change', '.toolTextInput', function () {

		var type = $(this).closest('.tabBox').data('unittype');

        var nextTextInput = $(this)
            .closest('.toolBox')
            .siblings('.toolBox')
            .find('.toolTextInput');

        var exchangeName = $(this).attr('name') + 'To' + $(nextTextInput).attr('name');

		switch(type) {
			case 'unitRatio':
				$(nextTextInput).val(precise_round($(this).val() * unitRatio[exchangeName], 2));
				break;
				
			case 'currencyRatio':
				$(nextTextInput).val(precise_round($(this).val() * currencyRatio[exchangeName], 3));
				break;
		}

    });

	/* Exchange - Unit Convertor */
    $('.exchangeIcon').on('click', function () {

        var toolBox1 = $(this).prev('.toolBox').clone();
        var toolBox2 = $(this).next('.toolBox').clone();

        $(this).prev('.toolBox').replaceWith(toolBox2);
        $(this).next('.toolBox').replaceWith(toolBox1);

    });

	/* Load Active Tab Configuration */
    chrome.storage.sync.get('activeTab', function (items) {

		console.log(items);

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

	/* Active Tab Actions */
    $(".radioUiBtn").click(function () {

        $(this).closest('.radioBox').find('.radioUiBtn').removeClass('selected');
        $(this).addClass('selected');

        var activeTab = $(this).data('tabvalue');

        $('#' + activeTab + 'Box').show(100).siblings().hide(100);

        chrome.storage.sync.set({'activeTab': activeTab});

    });
	
	$('.toolTextArea').keydown(function (e) {

		if (e.ctrlKey && e.keyCode == 13) {
			$(this).closest('.toolBox').find('.translateRedirect').trigger('focus').trigger('click');
		}
		
	});
	
	$('.translateRedirect').on('click', function() {
		
		var textAreaEl = $(this).closest('.toolBox').find('.toolTextArea')
		
		var langObj = {
			textToTranslate : $(textAreaEl).val(),
			language		: '#' + $(textAreaEl).data('language')
		}
		
		openInNewTab(googleTranslateUrl + '/' + langObj.language + '/' + langObj.textToTranslate);
		
	});

});

function precise_round(num, decimals) {
    var t = Math.pow(10, decimals);
    return (Math.round((num * t) + (decimals > 0 ? 1 : 0) * (Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals);
}

function openInNewTab(url){
	
	$('.linkHelper').attr('href', url);
	$('.linkHelper')[0].click();

}

