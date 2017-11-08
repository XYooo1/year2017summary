(function(){
	$('#uname').blur(function(){
			var temp = $(this);
				// var regExp = reg;
				var val = temp.val();
				var note = temp.next();
			    var unameReg = /^(\w){12,30}$/g;
				if(unameReg.test(val)){
                  note.html('用户名可用').addClass('right').removeClass('error');
				  temp.addClass('borderRight').removeClass('borderError')
				}else{
					note.text('12—30之间的字长').addClass('error').removeClass('right');
					temp.addClass('borderError').removeClass('borderRight');
				}
		})
})();