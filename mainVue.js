var vm = new Vue({
	el: '#mainWrap',
	data:{
		changDel: false,
		delMl: '',
		delAllMl: '',
		alarmNumb: '',
		Numb: '',
		displayDelWar: false,
		imagesTo: '',
		listKongBg: '',
		KGbutTrBd: true,
		alarmRightdisplayJudge: false,
		TPHoursNumb: 72,
		TPMinutesNumb: 72,
		infalarmBgJudge: false,
		images:{
			oneimg:'url(images/111.jpg)',
			allimg:'url(images/222.jpg)',
			noimg:'url(images/333.jpg)'
		},
		warDel: {
			delType: '',
			delText: '',
			noData: 'true',
		},
		controlAlarm:{
			butMarginLeft:'24px',
			changbutbg: '#325bf1'
		},
		curIdx:0,
		alarmColor: '',
		spanIHours: '',
		spanIMinutes: '',
		referringData: {
			time: '',
			content: '',
			state: true,
			labelColor: '',
			loopPlay: true,
		},
		referringDataCopy: {},
		countNumb: 0,
		alarmList:[
//			{
//		        time: '06:00',
//				content: '吃泡面洗碗吃泡面洗碗洗碗',
//				state: true,
//				labelColor: '#ffcb16',
//				loopPlay: true,
//			},
		],
		STMtime: '',
		selectHoursNumb: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
		selectMinutesNumb: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
		dashedNumb: [0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1]
	},
	
	mounted () {
        this.$el.addEventListener('scroll', this.handleScroll);
        this.publicHandle(this.TPHoursNumb,this.$refs.eachHourSpan,24);
        this.publicHandle(this.TPMinutesNumb,this.$refs.eachminuteSpan,60);
        this.changListBg();
        setInterval(this.getSTMtime,1000);
    },
    
    watch: {
    	alarmList: function(){
    		this.changListBg();
    	},
    	TPHoursNumb: function(newTPHoursNumb,oldTPHoursNumb){
    		this.publicHandle(newTPHoursNumb,this.$refs.eachHourSpan,24);
    	},
    	TPMinutesNumb: function(newTPMinutesNumb,oldTPMinutesNumb){
    		this.publicHandle(newTPMinutesNumb,this.$refs.eachminuteSpan,60);
    	},
    	alarmColor: function(newAlarmColor){
    		console.log(newAlarmColor);
    		if(newAlarmColor == 'important'){
    			this.referringData.labelColor = '#ff0048'
    		};
    		if(newAlarmColor == 'commonly'){
    			this.referringData.labelColor = '#ffcb16'
    		};
    		if(newAlarmColor == 'secondary'){
    			this.referringData.labelColor = '#69e4b7'
    		};
    	},
    	STMtime: function(newStmTime){
    		this.alarmList.forEach(this.listTimeTableEach);
    	},
    },

	methods:{
		publicHandle: function(newTPTimeNumb,eachTimeSpan,TPNumb){
			var spanI = Math.abs(newTPTimeNumb-72)/36;
			if(TPNumb == 24 && spanI < 10){
				this.spanIHours = '0' + spanI;
			}else
			if(TPNumb == 24){
				this.spanIHours = spanI;
			};
			if(TPNumb == 60 && spanI < 10){
				this.spanIMinutes = '0' + spanI;
			}else
			if(TPNumb == 60){
				this.spanIMinutes = spanI;
			};
			this.referringData.time = this.spanIHours + ':' + this.spanIMinutes;
			
			for (var i = 0; i < TPNumb; i++) {
				eachTimeSpan[i].classList.add('defaultFont');
			};
			if(spanI == 0){
				eachTimeSpan[spanI].classList.remove('defaultFont');
			    eachTimeSpan[spanI].classList.remove('selectFontChangNext');
			    eachTimeSpan[spanI].classList.add('selectFont');
			    
			    eachTimeSpan[spanI].nextSibling.classList.remove('defaultFont');
			    eachTimeSpan[spanI].nextSibling.classList.remove('selectFont');
			    eachTimeSpan[spanI].nextSibling.classList.add('selectFontChangNext');
			}else
			if(spanI == TPNumb-1){
				eachTimeSpan[spanI].classList.remove('defaultFont');
				eachTimeSpan[spanI].classList.remove('selectFontChangNext');
				eachTimeSpan[spanI].classList.add('selectFont');
				
				eachTimeSpan[spanI].previousSibling.classList.remove('defaultFont');
				eachTimeSpan[spanI].previousSibling.classList.remove('selectFont');
				eachTimeSpan[spanI].previousSibling.classList.add('selectFontChangNext');
			}else{
				eachTimeSpan[spanI].classList.remove('defaultFont');
				eachTimeSpan[spanI].classList.remove('selectFontChangNext');
				eachTimeSpan[spanI].classList.add('selectFont');
				
				eachTimeSpan[spanI].nextSibling.classList.remove('defaultFont');
				eachTimeSpan[spanI].nextSibling.classList.remove('selectFont');
				eachTimeSpan[spanI].nextSibling.classList.add('selectFontChangNext');
				
				eachTimeSpan[spanI].previousSibling.classList.remove('defaultFont');
				eachTimeSpan[spanI].previousSibling.classList.remove('selectFont');
				eachTimeSpan[spanI].previousSibling.classList.add('selectFontChangNext');
			}
		},
//		实现左侧列表功能
		clickDel: function(){
			this.changDel = !this.changDel;
			if(this.changDel == true){
				this.delMl = '-80px';
				this.delAllMl = '0px';
			}else{
				this.delMl = '0px'
				this.delAllMl = '90px';
			}
		},
		controlAlarmFu: function(item){
			this.KGbutTrBd = true;
			item.state = !item.state;
		},
		selectDel: function(item,Num){
			this.warDel.noData = true;
			this.imagesTo = this.images.oneimg;
			this.warDel.delType = '立刻删除';
		    this.warDel.delText = '是否删除当前提醒';
			this.displayDelWar = true;
			this.alarmNumb = item;
			this.Numb = Num;
		},
		selectDelAll: function(Num){
			if(this.alarmList.length == 0){
				this.imagesTo = this.images.noimg;
				this.warDel.delType = '删除全部';
		        this.warDel.delText = '当前无数据可删除';
		        this.warDel.noData = false;
		        this.displayDelWar = true;
			}else{
				this.imagesTo = this.images.allimg;
				this.warDel.delType = '删除全部';
			    this.warDel.delText = '是否删除全部提醒';
			    this.warDel.noData = true;
				this.displayDelWar = true;
				this.Numb = Num;
			}
		},
		successDel: function(){
			var index = this.alarmList.indexOf(this.alarmNumb);
			this.alarmList.splice(index,1);
			this.displayDelWar = false;
		},
		successDelAll: function(){
			this.alarmList.splice(0,this.alarmList.length);
			this.displayDelWar = false;
			this.changDel = true;
			this.clickDel();
		},
		changListBg: function(){
    		if(this.alarmList.length == 0){
    			this.listKongBg = 'url(images/HHHh.jpg)'
    		}else{
    			this.listKongBg = 'white'
    		}
    	},
		judgeDel: function(){
			this.KGbutTrBd = false;
			if(this.Numb == 1){
				this.successDel();
				if(this.alarmList.length == 0){
					this.delAllMl = '90px';
					this.changDel = false;
				}
			}else{
				this.successDelAll();
			};
			this.changListBg();
		},
	    controlAlarmRightDisplay: function(){
	    	this.alarmRightdisplayJudge = true;
	    },
	    
//	        右侧功能实现
        changinfalarmBg: function(){
        	this.infalarmBgJudge = !this.infalarmBgJudge;
        },
//      选择时间的方法
        selectSpecificTime: function(e,bottomLimit,ii){
            var AudioBg = document.getElementsByClassName('musicPlayWarning')[0];
        	if(ii == 1){
        		if(e.wheelDelta == -120 && this.TPHoursNumb > bottomLimit){
        		    this.TPHoursNumb -= 36;
        		    var AudioBg = document.getElementsByClassName('musicPlayNormal')[0];
	        	};
	        	if(e.wheelDelta == 120 && this.TPHoursNumb < 72){
	        		this.TPHoursNumb += 36;
	        		var AudioBg = document.getElementsByClassName('musicPlayNormal')[0];
	        	};
        	    AudioBg.currentTime = 0;
                AudioBg.play();
        	}else{
        		if(e.wheelDelta == -120 && this.TPMinutesNumb > bottomLimit){
        		    this.TPMinutesNumb -= 36;
        		    var AudioBg = document.getElementsByClassName('musicPlayNormal')[0];
	        	};
	        	if(e.wheelDelta == 120 && this.TPMinutesNumb < 72){
	        		this.TPMinutesNumb += 36;
	        		var AudioBg = document.getElementsByClassName('musicPlayNormal')[0];
	        	};
        	    AudioBg.currentTime = 0;
                AudioBg.play();
        	};
        },
        
//      添加循环提醒
        controlLoopFu: function(){
        	this.KGbutTrBd = true;
			this.referringData.loopPlay = !this.referringData.loopPlay;
        },
        
//      提交数据的方法
        SubData: function(){
        	if(this.referringData.content == '' || this.referringData.labelColor == ''){
        		this.infalarmBgJudge = !this.infalarmBgJudge;
        	}else{
	        	if(this.changDel){
	        		this.clickDel();
	        	}else{
	        		this.changDel = true;
	        		this.clickDel();
	        	};
	        	this.referringDataCopy = {
	        		time: this.referringData.time,
					content: this.referringData.content,
					state: this.referringData.state,
					labelColor: this.referringData.labelColor,
					loopPlay: this.referringData.loopPlay,
	        	};
	        	this.alarmList.forEach(this.TimeDouble);
	        	if(this.alarmList.length == 0){
	        		this.alarmList.unshift(this.referringDataCopy);
	        		this.alarmRightdisplayJudge = false;
	        	}else if(this.countNumb == 0){
	        		this.alarmList.unshift(this.referringDataCopy);
	        		this.alarmRightdisplayJudge = false;
	        	}else{
	        		this.infalarmBgJudge = !this.infalarmBgJudge;
	        		this.countNumb = 0;
	        		this.alarmRightdisplayJudge = true;
	        	};
	        	this.referringData.content = '';
	        	this.referringData.loopPlay = true;
	        	this.KGbutTrBd = false;
	        	this.TPHoursNumb = 72;
                this.TPMinutesNumb = 72;
        	};
        },

//      判断输入时间是否冲突
        TimeDouble: function(itemTime){
        	if(this.referringData.time == itemTime.time){
        		this.countNumb ++;
        		console.log(this.countNumb);
        	};
        },
        
//      获取系统时间
        getSTMtime: function(){
        	var date = new Date();
        	var Hours = date.getHours();
        	var Mins = date.getMinutes();
        	if(Hours < 10){
        		Hours = '0' + Hours
        	};
        	if(Mins < 10){
        		Mins = '0' + Mins
        	};
        	var stmTimes = Hours + ":" + Mins;
        	this.STMtime = stmTimes;
        	console.log(this.STMtime);
        },
        
//      列出列表的所以时间
        listTimeTableEach: function(timeTableEach,index){
        	if(this.STMtime == timeTableEach.time){
        		this.alarmList[index].state =false;
        	}
        	console.log(timeTableEach.time)
        },
	},
})
