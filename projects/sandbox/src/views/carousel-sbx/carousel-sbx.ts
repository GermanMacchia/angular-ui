import { Component, signal } from '@angular/core';
import { Carousel, CarouselImage } from '@ui-kit';

@Component({
  selector: 'app-carousel-sbx',
  imports: [Carousel],
  template: `
    <div class="flex flex-col gap-2 h-[25rem]">
      <div class="flex gap-2">
        <div class="flex justify-between items-center gap-2 w-full">
          <div>
            <p>Manual Switch</p>
          </div>
          <button class="btn w-[10rem]" (click)="showBottomNums.set(!showBottomNums())">
            Bottom Numbers
          </button>
        </div>
      </div>
      <lib-carousel [images]="images" [showBottomNums]="showBottomNums()"></lib-carousel>
    </div>
    <div class="flex flex-col gap-2">
      <p>AutoPlay ON</p>
      <lib-carousel [images]="images" [autoPlay]="true"></lib-carousel>
    </div>
  `,
  host: {
    style: 'display: flex; flex-direction: column; gap: 4rem',
  },
})
export class CarouselSbx {
  showBottomNums = signal<boolean>(false);
  autoPlay = signal<boolean>(false);
  images: CarouselImage[] = [
    {
      src: 'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp',
      alt: 'Image 1',
    },
    {
      src: 'https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp',
      alt: 'Image 2',
    },
    {
      src: 'https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp',
      alt: 'Image 3',
    },
    {
      src: 'https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp',
      alt: 'Image 4',
    },
  ];
}
