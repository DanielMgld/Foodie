import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scrollup',
  templateUrl: './scrollup.component.html',
  styleUrls: ['./scrollup.component.scss']
})
export class ScrollupComponent {

  isShown: boolean = false;
  topPosToStartShowing = 100;

  @HostListener('window:scroll')
  checkScroll() {
    this.isShown = (window.pageYOffset || document.documentElement.scrollTop)  > this.topPosToStartShowing;
  }
  scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
