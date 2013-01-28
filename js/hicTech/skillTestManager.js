	
	function startSkillTest(question_number){
		var current_question = question_number;
		var current_interval;
		
		if($(".single_question").size() == question_number){
			alert("test finito");
		}
		$(".single_question").hide();
		$(".single_question").each(function(index){
			var question;
			if(index == question_number){
				question = $(this);
				question.show();
				bindAnswersClick(question);
				bindConfirmClick(question);
				startCountdown(question);
				appML.scrollable($(".skillTest") ,"null", appML.getPageWidth(), appML.getPageHeight());
			}
				
		});	
		
		function bindConfirmClick($el){
			$el.find(".deny").click(function(){
				$el.find("li.question_li").each(function(){
					if($(this).is(":visible"))
						$(this).trigger("click")
				})
				
			});
			
			$el.find(".confirm").click(function(){
				clearInterval(current_interval);
				current_interval = null;
				startSkillTest(current_question+1);
			});
		}
		
		function bindAnswersClick($el){
			$el.find(".question").each(function(){
				var $toggles = $(this).find(".toggle");
				var $inputs = $toggles.find(".checked input");
				var $lis = $(this).find(".question_li");
				var $confirm_buttons = $(this).find(".confirm_buttons");
				
				$toggles.append("<div class='toggleSwitch'></div><div class='true_or_false'></div>")
				$inputs.attr("checked","checked");
				
				$lis.click(function(event){
					event.stopPropagation();
					toggleClicked($(this).find(".toggle"));
				})
				
				var in_esecution = false;
				function toggleClicked(el){
					if(el.find("input").attr("disabled"))
						return false;
					
					if(in_esecution)
						return false;	
					in_esecution = true;
					
					if(el.is(".checked")){
						uncheckIt(el);
						anbleTheOthers(el);
					}
					else{
						checkIt(el);
						disableTheOthers(el);
					}
					setTimeout(function(){in_esecution = false},500)
				}
				
				function disableTheOthers(el){
					/*
					$toggles.each(function(){
						if( $(this).find("input").val() != el.find("input").val() )
							disableIt($(this));
					});
					*/
					$confirm_buttons.show();
					$lis.each(function(){
						if( $(this).find("input").val() != el.find("input").val() )
							$(this).hide();
						
					});
					
				}
				
				function disableIt(el){
					el.css("opacity","0.6");
					el.find("input").attr("disabled", true);
				}
				
				function anableIt(el){
					el.css("opacity","1");
					el.find("input").removeAttr("disabled");
				}
				
				function anbleTheOthers(el){
					$confirm_buttons.hide();
					$toggles.each(function(){
						if(el.html() != $(this).html())
							$(this).parents(".question_li").show();
							//anableIt($(this));
					});
				}
				
				function disableAll(){
					$toggles.each(function(){
						disableIt($(this));
					});
				}
				
				function checkIt(el){
					var s = el.find(".toggleSwitch");
					var input = el.find("input");
					s.css({"left" : "41px"});
					el.addClass("checked");
					input.addClass("checked");
					el.parents("li.question_li").find(".toggle_text").css("color","#f8b606");
				}
				
				function uncheckIt(el){
					var s = el.find(".toggleSwitch");
					var input = el.find("input");
					s.css({"left" : "0px"});
					el.removeClass("checked");
					input.removeClass("checked");
					el.parents("li.question_li").find(".toggle_text").css("color","#fff")
				}
				
			});
		}
		
		
		function startCountdown(question){
			var $timer = question.find(".timer");
			var sec = question.find(".question").attr("data-time");
			var start_time = new Date().getTime();
			var end_time = start_time + 1000 * sec;
			var $el = $timer.find(".timer_bg");
			var timer_w = $el.width();
			var interval = setInterval(moveBar, 24);
			current_interval = interval;
			var shift = timer_w / sec;
			
			
			
			function moveBar(){
				var now = new Date().getTime();
				var passed_time = (now - start_time) / 1000;
				
				var current_shift = shift * passed_time;
				$el.html(parseInt(sec-passed_time));
				$el.css("background-position","-"+current_shift+"px 0px, 0px 0px");
				
				if(passed_time > sec){
					question.find(".confirm").trigger("click");
					clearInterval(interval);
					return false;
				}
			}
		}

		
	}
	

			
			
			