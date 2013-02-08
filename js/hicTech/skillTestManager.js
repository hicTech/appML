	
	function startSkillTest(question_number,page_id){
		var $page = $("#"+page_id);
		var current_question = question_number;
		var current_interval;
		
		lockBars(page_id);
		
		
		if($page.find(".single_question").size() == question_number){
			alert("test finito");
		}
		
		$page.find(".single_question").hide();
		$page.find(".single_question").each(function(index){
			var question;
			if(index == question_number){
				question = $(this);
				question.show();
				bindAnswersClick(question,page_id);
				bindConfirmClick(question);
				startCountdown(question);
				appML.scrollable($page.find(".skillTest") ,"null", appML.getPageWidth(), appML.getPageHeight());
			}
				
		});	
		
		function bindConfirmClick($el){
			$el.find(".confirm").click(function(){
				clearInterval(current_interval);
				current_interval = null;
				startSkillTest(current_question+1,page_id);
			});
		}
		
		function bindAnswersClick($el){
			$el.find(".question").each(function(){
				if($(this).is(".processed"))
					return false;
				else{
					$(this).addClass("processed");
					thisClicked($el);	
				}
				
				
			});
			
			function thisClicked($el){

					
					$el.find(".question_li").click(function(event){
						if($(this).is(".selected")){
							resetAll();
						}
						else{
							uncheckAll();
							$(this).addClass("selected").removeClass("unselected");
						}
					});
				
			}
			
			function uncheckAll(){
				$el.find(".question_li").each(function(){
					$(this).removeClass("selected").addClass("unselected");
					
				});
			}
			
			function resetAll(){
				$el.find(".question_li").each(function(){
					$(this).removeClass("selected").removeClass("unselected");
					
				});
			}
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
	
	
	
	
	
	

	
	function lockBars(page_id){
		$("#appML_navigation_bar").append('<div class="lockBG navBarLock" onClick="blockThisSkillTest('+page_id+')"><div class="layer layer1"></div><div class="layer layer2"></div><div class="layer layer3"></div><div class="lockBG_text">Il test è partito, sfiora questa barra per interromperlo</div></div>');
		       $("#appML_toolbar").append('<div class="lockBG toolBarLock" onClick="blockThisSkillTest('+page_id+')"><div class="layer layer1"></div><div class="layer layer2"></div><div class="layer layer3"></div><div class="lockBG_text">Il test è partito, sfiora questa barra per interromperlo</div></div>');
		
	}
	
	function unlockBars(){
		$("#appML_navigation_bar").find(".lockBG").remove();
		$("#appML_toolbar").find(".lockBG").remove();
	}
	
	function blockThisSkillTest(page_id){
		var opt = {
				type                   : "confirm", 
  				confirmCallback		   : function(){return true},
  				denyCallback		   : function(){leaveThisSkillTest(page_id)},
  				title				   : "Attenzione",
  				message				   : "Abbandonando il test verranno confermate le sole domande a cui hai risposto fino qui. Le altre domande verranno sottomesse senza alcune risposta",
  				select_options	       : "no options in this select"
		};
		
		appML.appManagerShowDialog(opt);
		
		function leaveThisSkillTest(page_id){
			unlockBars();
			appML.goTo("#skillTestHomePage","flip");
		}
	}
	

			
			
			