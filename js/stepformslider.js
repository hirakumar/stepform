const StepSlider = function(selector){
	StepSlider.el=document.querySelector(selector);
	StepSlider.slides=StepSlider.el.querySelectorAll("fieldset");
	StepSlider.init(StepSlider.el);
	StepSlider.goSlide();
	StepSlider.initPagination();
}

StepSlider.currentIndex=0;
StepSlider.prototype.el;
StepSlider.prototype.slides;
StepSlider.initPagination=function(){
	var allPageLi= StepSlider.el.querySelectorAll('.pagination li');
	let i=0;
	
	console.log("Current Index :" + StepSlider.currentIndex);
	while(i<allPageLi.length){
		
		allPageLi[i].firstChild.className="disable";
		if(allPageLi[i].firstChild.dataset.index == StepSlider.currentIndex){
			allPageLi[i].firstChild.className="active";
		}
		
		i++;
	}
	StepSlider.checkTotalValidate();
	
	
}
StepSlider.done=[];
StepSlider.init=function(el){
	
	this.slides=StepSlider.slides;
	
	let i=0;
	this.currentIndex;
	let continue_btn= document.querySelector('.continue_btn');
	continue_btn.addEventListener("click",this.goNext);
	while(i<this.slides.length){
		if(this.slides[i].dataset.active!="true"){
			this.slides[i].dataset.active="false";
		}else{
			this.currentIndex=i;
		}
		i++;
	}
	StepSlider.setEvent();
	
}
StepSlider.fieldsetValid=[];
StepSlider.goSlide=function(){
	let paginationLink = StepSlider.el.querySelectorAll('.pagination li a');
	let i=0;
	console.log("Total Links "+paginationLink.length);
	while(i<paginationLink.length){
		paginationLink[i].addEventListener("click",this.showMySlide);
		i++;
	}
	
}
StepSlider.setEvent=function(){
	console.log("Method : setEvent");
	
	let i=0;
	let allFieldSet= StepSlider.slides;
	let myfieldset= StepSlider.slides[StepSlider.currentIndex];
	let inputs = myfieldset.elements;
	
	
	while(i<inputs.length){
		
		inputs[i].addEventListener("keyup",function(){
			StepSlider.checkTotalValidate();
		})
		i++;
	}
	
	// Last Slide
	if(allFieldSet.length==StepSlider.currentIndex+1){
		StepSlider.showData();
	}
	
	
}
StepSlider.checkTotalValidate=function(){
	let totalValidate=0;
	
	let formEle=[];
	let fieldset=StepSlider.slides;
	let allFormEle=fieldset[StepSlider.currentIndex].elements;
	console.log("Total Element " + fieldset[StepSlider.currentIndex].elements.length);
	let i=0;

	while(i<allFormEle.length){
		
		if(allFormEle[i].checkValidity()){
			let eleObj={};
			eleObj.ele=allFormEle[i];
			eleObj.valid=true;
			formEle[i]=eleObj;
			totalValidate++;
			
		}else{
			let eleObj={};
			eleObj.ele=allFormEle[i];
			eleObj.valid=false;
			formEle[i]=eleObj;
		}
		i++;
	}
	
	if(totalValidate==allFormEle.length){
		StepSlider.el.querySelector('button.continue_btn').removeAttribute("disabled");
		
		// Check to matchc password and confirmpassword on first fieldset 
		if(StepSlider.currentIndex=0){
			let pp=StepSlider.el.querySelector('input#password').value;
			let cc=StepSlider.el.querySelector('input#confirmPassword').value;
			if(pp!=cc){
				StepSlider.el.querySelector('button.continue_btn').disabled="disabled";
			}
		}
		
	}else{
		StepSlider.el.querySelector('button.continue_btn').disabled="disabled";
	}
	
}
StepSlider.showMySlide=function(event){
	let el =StepSlider.el;
	this.slides=StepSlider.slides;
	console.log("My Index :" + event.currentTarget.dataset.index);
	console.log("Current Index " + StepSlider.currentIndex);
	this.slides[StepSlider.currentIndex].dataset.active=false;
	this.slides[event.currentTarget.dataset.index].dataset.active=true;
	StepSlider.currentIndex=event.currentTarget.dataset.index;
	/*
	this.slides[StepSlider.currentIndex].dataset.active=false;
	StepSlider.currentIndex++;
	this.slides[event.target.dataset.index].dataset.active=true;*/
	
}
StepSlider.goNext=function(){
	
	let el =StepSlider.el;
	this.slides=StepSlider.slides;
	console.log("Method : goNext");
	console.log(StepSlider.currentIndex);
	
	if(this.slides.length==StepSlider.currentIndex+1){
		document.getElementById('form_wizard').submit();
		return false;
	}
	
	
	if(StepSlider.currentIndex<this.slides.length-1){
		this.slides[StepSlider.currentIndex].dataset.active=false;
		StepSlider.done.push(StepSlider.currentIndex);
		StepSlider.setDone(StepSlider.currentIndex);
		StepSlider.currentIndex++;
		this.slides[StepSlider.currentIndex].dataset.active=true;
	}
	
	//setActive();
	
	StepSlider.checkTotalValidate();
	StepSlider.setActive();
	StepSlider.setEvent();
	
	
	
}
StepSlider.setDone=function(id){
	console.log("Set Done :" + id);
		console.log(id);
		let selectEle = StepSlider.el.querySelectorAll("a[data-index='"+id+"']");
		
		let i=0;
		while(i<selectEle.length){
			//selectEle[i].classList.add('done');
			selectEle[i].classList.add("done");
			i++;
		}
}
StepSlider.setActive=function(){
		var allPageLi= StepSlider.el.querySelectorAll('.pagination li a');
	let i=0;
	while(i<allPageLi.length){
		
		if(allPageLi[i].dataset.index==StepSlider.currentIndex){
			allPageLi[i].classList.add("active");
			allPageLi[i].classList.remove("disable");
		}else{
			allPageLi[i].classList.add("disable");
			allPageLi[i].classList.remove("active");
		}
		i++;
	}
}
StepSlider.showData=function(){
	console.log("Methohd : showData");
	console.log("Current Index "+StepSlider.currentIndex);
	let personalData=document.querySelector('#personalData');
	personalData.innerHTML=`<h4>Your Details</h4>
				<ul class="list-unstyled commoon-list">
					<li>First Name ${document.querySelector('#form_wizard #fname').value}</li>
					<li>Last Name ${document.querySelector('#form_wizard #lname').value}</li>
					<li class="primary_color">username ${document.querySelector('#form_wizard #username').value}</li>
					<li class="primary_color">Email Address ${document.querySelector('#form_wizard #email').value}</li>
					<li class="primary_color">Phone Number ${document.querySelector('#form_wizard #pnumber').value}</li>
				</ul>

				<h4>Billing Address</h4>
				<ul class="list-unstyled commoon-list">
					<li> Address </li>
					<li>${document.querySelector('#form_wizard #street').value} </li>
					
					<li>County/State : ${document.querySelector('#form_wizard #state').value}</li>
					<li class="primary_color">City ${document.querySelector('#form_wizard #city').value}</li>
					<li class="primary_color">Postal Code  ${document.querySelector('#form_wizard #postalCode').value}</li>
				</ul>


				<h4>Payment Information</h4>
				<ul class="list-unstyled commoon-list">
					<li>Card Holder Name ${document.querySelector('#form_wizard #chname').value}</li>
					<li>Card Number ${document.querySelector('#form_wizard #cardNumber').value}</li>
					<li>County/State ${document.querySelector('#form_wizard #state').value}</li>
					<li class="primary_color">Expiry Date Expiry Date ${document.querySelector('#form_wizard #month').value} ${document.querySelector('#form_wizard #year').value}</li>
					<li class="primary_color">CVV Number   ${document.querySelector('#form_wizard #cvvNumber').value}</li>
				</ul>`;
}

