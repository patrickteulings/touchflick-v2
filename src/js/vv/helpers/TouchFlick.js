import Hammer from 'hammerjs'

export default class TouchFlick {
  constructor (_el) {
    this.el = document.querySelector('.js-hammer');
    this.wrapper = document.querySelector('.touchflick__inner--wrap');
    this.mc = new Hammer(this.el);
    this.start = 0;
    this.isPanning = false;
    this.index = 0;
    this.distanceX = 0;
    this.currentX = 0;
    this.distanceX = 0;
    this.nrSlides = this.el.querySelectorAll('.touchflick__item').length;
    this.thumbs = this.el.querySelectorAll('.js-touch-thumb__item')
    
    this.wrapper.style.transform = 'translateX(0px)';
    this.animationFrame = 0;
    this.config = {
      buttonPrev: this.el.querySelector('.js-prev'),
      buttonNext: this.el.querySelector('.js-next'),
      activeClass: 'is-active',
      disabledClass: 'is-disabled'
    }
    this.setNavigation();
    this.addEvents();
  }

  addEvents () {
    this.mc.on('panstart', (ev) => {
      this.onPanStart(ev);
    });

    this.mc.on('pan', (ev) => {
      this.onPan(ev);
    });

    this.mc.on('panend', (ev) => {
      this.onPanEnd(ev);
    });

    this.config.buttonPrev.addEventListener('click', () => {
      this.index -= 1;
      this.onIndexClick();
    });

    this.config.buttonNext.addEventListener('click', () => {
      this.index += 1;
      this.onIndexClick();
    });
    
    for(let thumb of this.thumbs){      
      thumb.addEventListener('click', (e) => {
        this.onThumbClick(e);
      })
    }
  }

  // Calculate the current position the slider contents have
  onPanStart () {
    this.currentX = 0;
    let transformStyle = this.wrapper.style.transform;
    var regex = /[+-]?\d+(?:\.\d+)?/g;
    let test = regex.exec(transformStyle)
    this.start = test[0];
    this.isPanning = true;
  }

  onPan (ev) {
    let percentage = (ev.deltaX / this.wrapper.clientWidth) * 100;
    let position = Number(this.start) + Number(percentage);
    this.wrapper.style.transform = `translateX(${position}%)`;
    this.currentX = position;
  }

  onPanEnd (ev) {
    this.isPanning = false;
    let percentage = (ev.deltaX / this.wrapper.clientWidth) * 100;

    if (percentage > 25 && ev.deltaX > 0) {      
      this.index = (this.index === 0) ? 0 : this.index - 1;
    }
    if (percentage < -25 && ev.deltaX < 0) {
      this.index = (this.index === this.nrSlides - 1) ? (this.nrSlides - 1) : this.index + 1;
    }
    this.animate();
    this.setNavigation();
  }

  animate () {
    this.distanceX = (-(this.index * 100)) - (this.currentX);

    let translateX = (this.distanceX === 0) ? this.currentX : ((this.currentX + (this.distanceX / 9)));

    if (Math.abs(this.distanceX) < 0.2) {
      this.animationFrame = null;
      this.wrapper.style.transform = `translateX(-${this.index * 100}%)`;      
    } else {
      this.animationFrame = window.requestAnimationFrame(() => { this.animate() });
      this.wrapper.style.transform = `translateX(${translateX}%)`;
      this.wrapper.dataset.test = translateX;
      this.currentX = translateX;
    }
  }

  onIndexClick (_index) {
    this.index = (this.index <= 0) ? 0 : this.index - 1;
    this.index = (this.index >= this.nrSlides - 1) ? (this.nrSlides - 1) : this.index + 1;
    this.animate();
    this.setNavigation();
  }

  onThumbClick (e) {
    for(let [index, thumb] of this.thumbs.entries()){
      if(thumb === e.target){
        this.index = index;
        //thumb.style.opacity = "0.2";    
      }
      else{
        //thumb.style.opacity = "1";    
      } 
    }
    this.animate();
    this.setNavigation();
  }

  setNavigation () {
    // set active thumb
    if(this.thumbs){
      for(let [index, thumb] of this.thumbs.entries()){
        if(this.index === index){          
          thumb.classList.add(this.config.activeClass);    
        }
        else{
          thumb.classList.remove(this.config.activeClass);
        } 
      }
    }

    // set active prev/next
    (this.index === 0) ? this.config.buttonPrev.classList.add(this.config.disabledClass) : this.config.buttonPrev.classList.remove(this.config.disabledClass);
    (this.index === this.nrSlides - 1) ? this.config.buttonNext.classList.add(this.config.disabledClass) : this.config.buttonNext.classList.remove(this.config.disabledClass);
    
  }
}
