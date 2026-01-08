import { Component, Input, input, OnDestroy, OnInit, signal } from '@angular/core';

export type CarouselImage = {
  src: string;
  alt: string;
};

@Component({
  selector: 'lib-carousel',
  templateUrl: './carousel.html',
})
export class Carousel implements OnInit, OnDestroy {
  images = input.required<CarouselImage[]>();
  hash!: number;

  showBottomNums = input<boolean>(false);
  activeIndex = signal(0);

  //autoPlay
  @Input()
  autoPlay = false;

  @Input()
  interval = 3000;

  intervalId?: ReturnType<typeof setInterval>;

  constructor() {
    this.hash = Math.floor(Math.random() * (1000000 - 1 + 1) + 1);
  }

  ngOnInit() {
    if (this.autoPlay) {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  public goToSlide(index: number) {
    this.activeIndex.set(index);
    this.navigateToSlide(index);
    this.resetTimer();
  }

  public resetTimer() {
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  private startAutoPlay() {
    this.stopAutoPlay();

    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, this.interval);
  }

  private stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private nextSlide() {
    if (this.images().length === 0) return;
    const nextIndex = (this.activeIndex() + 1) % this.images().length;
    this.activeIndex.set(nextIndex);
    this.navigateToSlide(nextIndex);
  }

  private navigateToSlide(index: number) {
    const element = document.getElementById(`slide${this.hash}-${index}`);
    const container = element?.parentElement;
    if (element && container) {
      container.scrollTo({
        left: element.offsetLeft,
        behavior: 'smooth',
      });
    }
  }
}
