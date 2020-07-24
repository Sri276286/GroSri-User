import { Directive, HostBinding, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
    selector: '[dashboardHeading]'
})
export class DashboardHeadingDirective implements OnInit {

    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        this.renderer.setStyle(this.elementRef.nativeElement, 'font-weight', '600');
        this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', '20px');
        this.renderer.setStyle(this.elementRef.nativeElement, 'padding', '10px');
    }
}