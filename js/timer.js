(function(w, d, undefined){

	var Timer = function(){

		this._this = 
		this.timer_node = d.getElementById('timer');
		this.header_node = d.getElementById('header');
		this.text_node = d.getElementById('text');
		this.end_date_str = 'Wed Jun 28 2017 14:43:00 GMT+0300 (Russia Standard Time)';
		this.START_TIME = Math.floor((new Date).getTime()/1000);
		this.END_TIME = Math.floor(new Date(this.end_date_str).getTime()/1000);

		Timer.prototype.add_listeners = function(){

			this.timer_node.addEventListener('animationend', function(e){
				const node = e.target;
				const animationName = e.animationName;
				if(animationName == 'fadeOut'){
					node.style.opacity = 0;
				}
			});

			this.header_node.addEventListener('animationend', function(e){
				const node = e.target;
				const animationName = e.animationName;
				if(animationName == 'fadeOut'){
					node.style.opacity = 0;
				}
			});

			this.text_node.addEventListener('animationend', function(e){
				const node = e.target;
				const animationName = e.animationName;
				if(animationName == 'fadeIn'){
					node.style.opacity = 1;
				}
			});

		};

		Timer.prototype.get_current_time = function() {
			var START_TIME = Math.floor((new Date).getTime()/1000),
				diff_sec = this.END_TIME - START_TIME,
				hours = Math.floor(diff_sec/3600).toString(),
				minutes = Math.floor((diff_sec%3600)/60).toString(),
				seconds = Math.floor(((diff_sec%3600)%60)).toString();

			if(hours.length<2){
				hours = '0' + hours;
			}
			if(minutes.length<2){
				minutes = '0' + minutes;
			}
			if(seconds.length<2){
				seconds = '0' + seconds;
			}

			if (hours == '-1'){
				return false;
			}

			return hours + ':' + minutes + ':' + seconds;
		};	

		Timer.prototype.interval = function(){
			var current_time = this.get_current_time();
			if(current_time){
				this.timer_node.innerText = this.get_current_time();
			}else{
				if(this.timer){
					clearInterval(this.timer);
				}
				this.toggle_texts();
				this.timer_node.innerText = '00:00:00';
			}
		};

		Timer.prototype.toggle_texts = function(){
			this.header_node.classList.add('fadeOut');
			this.timer_node.classList.add('fadeOut');
			this.text_node.classList.add('fadeIn');
		};

		Timer.prototype.init = function(){
			this.add_listeners();

			var current_time = this.get_current_time();
			if(current_time){
				this.interval();
				this.timer = setInterval(this.interval.bind(this), 1000);
			}else{
				this.header_node.style.opacity = 0;
				this.timer_node.style.opacity = 0;
				this.text_node.classList.add('fadeIn');
			}			
		};		

		this.init();

		return this;

	};

	var timer = new Timer();		

})(window, document);