# dust-ajaxForm
a jQuery plugin to add ajax-ify a form.

## What it does
You've got a form. When the form is submitted you've got some PHP processing to do, but you don't want to navigate away from the page. This plugin submits the form using ajax, returns the response, and calls success, failed and working methods accordingly. So it doesn't do a lot, really.

## How to use it
1) Create your HTML form as you normally would.

	<form method="POST" action="dothis.php" class="ajax-form">
		<input type="email" name="email" />
		<button type="submit" name="submit" />
	</form>

Your action must be POST.
Your method is the link to your PHP file.

2) Ajaxify the form by calling the plugin on it. You can call it with defaults...

	$('.ajax-form').ajaxForm();
	
or with custom options...

	$('.ajax-form').ajaxForm({
		'onSuccess' : function(response) {
			console.log(response);
		}
	});
	
which are detailed below.

### Options
**onSuccess** the function to call when the form is sent successfully. Takes a parameter of the response from the PHP. By default this adds successClass and removes workingClass and failureClass (below).

**onFailure** the function to call when the form is not sent successfully. Takes a parameter of the response from the PHP. By default this adds failureClass and removes workingClass and successClass (below).

**onWorking** the function to call when the form is submitted. By default this adds workingClass and removes successClass and failureClass (below).

**successClass** the class to add to the form if it is sent successfully. Default: 'ajax-form--success'.

**failureClass** the class to add to the form if it is not sent successfully. Default: 'ajax-form--failure'.

**workingClass** the class to add to the form after submitting, but before succeeding or failing. Default: 'ajax-form--working'.

3) Write the PHP.

As long as you echo a response and use appropriate http response codes you can do whatever you want. Whatever you echo will be your response to use with onSuccess() and onFailure().