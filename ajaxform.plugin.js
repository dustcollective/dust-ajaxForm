(function($){

	var AjaxForm = function(element, options) {
		var self = $(element);
		var _this = this;

		var settings = $.extend({
			'successClass' : 'ajax-form--success',
			'failureClass' : 'ajax-form--failure',
			'workingClass' : 'ajax-form--working',
			'onSuccess' : function(response) {
				self.addClass(settings.successClass).removeClass(settings.workingClass).removeClass(settings.failureClass);
			},
			'onFailure' : function(response) {
				self.addClass(settings.failureClass).removeClass(settings.workingClass).removeClass(settings.successClass);
			},
			'onWorking' : function() {
				self.addClass(settings.workingClass).removeClass(settings.successClass).removeClass(settings.failureClass);
			},
			'timeout' : 10000
		}, options || {});

		this.init = function() {
			var _this = this;

			self.submit(function(e) {
				e.preventDefault();

				_submit();
			});

			return _this;
		}

		var _submit = function() {
			var _this = this;

			var formData = self.serialize();

			$.ajax({
				type : self.attr('method'),
				url : self.attr('action'),
				data : formData,
				success : function(thisResponse) {

					if ( (typeof thisResponse != undefined) && (thisResponse != '') ) {
						response = JSON.parse(thisResponse);
						settings.onSuccess(response);
					} else {
						settings.onSuccess(null);
					}

				},
				error : function(thisResponse, errorType) {

					if (errorType == 'error') {
						settings.onFailure(null);
					} else if (errorType == 'timeout') {
						settings.onFailure(null);
					} else {
						console.log(errorType);

						if ( (typeof thisResponse != undefined) && (thisResponse != '') && (thisResponse.responseText != undefined) ) {
							response = JSON.parse(thisResponse.responseText);
							settings.onFailure(response);
						} else {
							settings.onFailure(null);
						}
					}


				},
				beforeSend : function() {
					settings.onWorking();
				},
				timeout : settings.timeout
			})

			return _this;
		}

	};

	$.fn.ajaxform = function(options) {
		return this.each(function() {
			var element = $(this);

			// Return early if this element already has a plugin instance
			if (element.data('ajaxform')) return;

			// pass options to plugin constructor
			var ajaxform = new AjaxForm(this, options);

			ajaxform.init();

			// Store plugin object in this element's data
			element.data('ajaxform', ajaxform);
		});
	};
})(jQuery);
